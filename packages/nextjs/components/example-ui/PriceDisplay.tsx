"use client";

import { useEffect, useState } from "react";
import { WrapperBuilder } from "@redstone-finance/evm-connector";
import { getSignersForDataServiceId } from "@redstone-finance/sdk";
import { ethers } from "ethers";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

interface PriceDisplayProps {
  symbol: "ETH" | "BTC";
}

export const PriceDisplay = ({ symbol }: PriceDisplayProps) => {
  const [price, setPrice] = useState<string>("0.00");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Cast as any to avoid type error before running `yarn generate` that adds PriceFeed to deployedContracts typing
  const { data: deployedContractData } = useDeployedContractInfo("PriceFeed" as any);

  const fetchPrice = async () => {
    if (!deployedContractData) {
      setError("PriceFeed contract not deployed. Run: yarn deploy");
      setIsLoading(false);
      return;
    }

    if (typeof window === "undefined" || !(window as any).ethereum) {
      setError("Please connect your wallet to view prices");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const contract = new ethers.Contract(deployedContractData.address, deployedContractData.abi, provider);

      const wrappedContract = (WrapperBuilder as any)
        .wrap(contract)
        .usingDataService({
          dataPackagesIds: [symbol],
          authorizedSigners: getSignersForDataServiceId("redstone-main-demo"),
        });

      const priceData = symbol === "ETH" ? await wrappedContract.getEthPrice() : await wrappedContract.getBtcPrice();

      if (!priceData) {
        throw new Error("No price data returned from oracle");
      }

      const formattedPrice = (Number(priceData) / 1e8).toFixed(2);
      setPrice(formattedPrice);
      setLastUpdate(new Date());
    } catch (err: any) {
      console.error("Error fetching price:", err);
      setError(err?.message || "Failed to fetch price");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deployedContractData?.address, symbol]);

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-center">{symbol}/USD</h2>

        {error ? (
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="stats">
            <div className="stat">
              <div className="stat-title">Current Price</div>
              <div className="stat-value text-white">${price}</div>
              <div className="stat-desc">Updated: {lastUpdate.toLocaleTimeString()}</div>
            </div>
          </div>
        )}

        <div className="card-actions justify-end">
          <button className="btn btn-sm btn-outline" onClick={fetchPrice} disabled={isLoading}>
            {isLoading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>
    </div>
  );
};
