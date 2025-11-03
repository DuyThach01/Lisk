# Deployment Guide

This guide will walk you through deploying the Lisk Token & NFT DApp to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com/))
2. A GitHub, GitLab, or Bitbucket account connected to Vercel
3. The repository cloned locally

## Environment Variables

Before deploying, you'll need to set up the following environment variables in Vercel:

1. `NEXT_PUBLIC_ALCHEMY_API_KEY` - Your Alchemy API key (get one at [alchemy.com](https://www.alchemy.com/))
2. `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - Your WalletConnect project ID (get one at [cloud.walletconnect.com](https://cloud.walletconnect.com/))
3. `NEXT_PUBLIC_MY_TOKEN_ADDRESS` - Your deployed MyToken contract address
4. `NEXT_PUBLIC_MY_NFT_ADDRESS` - Your deployed MyNFT contract address

## Deployment Steps

### Option 1: Deploy using Vercel CLI (Recommended)

1. Install the Vercel CLI if you haven't already:
   ```bash
   npm install -g vercel
   ```

2. Navigate to the Next.js project directory:
   ```bash
   cd packages/nextjs
   ```

3. Create a `.env.local` file with your environment variables:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your actual values
   ```

4. Deploy to Vercel:
   ```bash
   vercel
   ```

5. Follow the prompts to complete the deployment.

### Option 2: Deploy using Vercel Web Interface

1. Push your code to a GitHub, GitLab, or Bitbucket repository.

2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click "Add New" > "Project".

3. Import your repository.

4. In the project settings, go to "Environment Variables" and add all the required environment variables.

5. Click "Deploy" and wait for the deployment to complete.

## Verifying the Deployment

After deployment, you should be able to:

1. Connect your wallet to the Lisk Sepolia network
2. View your token balance in the TokenBalance component
3. Transfer tokens using the TokenTransfer component
4. View and mint NFTs using the NFTCollection component

## Troubleshooting

- If you encounter any issues, check the deployment logs in the Vercel dashboard
- Make sure your wallet is connected to the Lisk Sepolia network
- Verify that the contract addresses in your environment variables are correct
- Ensure you have test ETH in your wallet for gas fees

## Next Steps

- Set up a custom domain in Vercel
- Enable preview deployments for pull requests
- Set up monitoring and analytics

## Support

For any issues or questions, please open an issue in the repository.
