"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { NFTCollection } from "~~/components/example-ui/NFTCollection";
import { TokenBalance } from "~~/components/example-ui/TokenBalance";
import { TokenTransfer } from "~~/components/example-ui/TokenTransfer";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  if (!connectedAddress) {
    return (
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="text-4xl font-bold">Lisk Token & NFT DApp</span>
          </h1>
          <p className="text-center text-lg">Please connect your wallet to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center flex-grow pt-10">
      <div className="px-5 w-full max-w-7xl">
        <h1 className="text-center mb-8">
          <span className="block text-2xl mb-2">Welcome to</span>
          <span className="text-4xl font-bold">Lisk Token & NFT DApp</span>
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch">
          <div className="flex-1">
            <TokenBalance />
          </div>
          <div className="flex-1">
            <TokenTransfer />
          </div>
        </div>
        
        <div className="mt-8 w-full max-w-2xl mx-auto">
          <NFTCollection />
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Connected with: <Address address={connectedAddress} /></p>
        </div>
      </div>
    </div>
  );
};

export default Home;
