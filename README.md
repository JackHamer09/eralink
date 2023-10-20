# Link to Eternity

Shorten and immortalize your links, text, and files anonymously on-chain with zkSync Era, making them accessible forever.

## Use Cases

1. **Document Verification**: Ensure the authenticity of critical documents by storing them on-chain, making it easy to prove they haven't been altered.
2. **Proof of Concept or Idea**: Timestamp your unique ideas or concepts, providing evidence of originality at a specified time.
3. **Permanent Content Sharing**: Share important links, texts, or files that remain accessible indefinitely, bypassing traditional web hosting limitations.
4. **Trustless Data Storage**: Store data in a transparent manner where anyone can verify its authenticity without relying on intermediaries.
5. **Decentralized Archiving**: Archive critical information ensuring it's safeguarded against central points of failure or censorship.

## 🚀 Quick Start
![EraLink Preview](./public/preview.jpg)

Use EraLink directly via [eralink.netlify.app](https://eralink.netlify.app).

---

## Structure
The project is organized into two main directories:

- **contracts**: This folder houses the Hardhat environment and Solidity contracts which include Paymaster, Text Storage, and Upgradable Contract.
- **frontend**: Developed using Nuxt 3 and Vue, this directory contains all the frontend components of the application.

## Development

### Prerequisites:
- Node v18.x+
- Yarn

### Contracts:
- Compile contracts: `yarn hardhat compile`
- Contracts deployment:
  1. Set the `defaultNetwork` in `hardhat.config.ts` to choose the deployment network.
  2. Rename `.env.example` to `.env` and enter the private key for the wallet that will handle contract deployment fees. Ensure this account has sufficient ETH.
  3. Deploy Text Storage and Upgradable Proxy: `yarn deploy:text-storage`
  4. For Paymaster deployment, update `TEXT_STORAGE_PROXY_ADDRESS` in `/deploy/deploy-paymaster.ts`, then run `yarn deploy:paymaster`.

### Frontend:
1. Rename `.env.example` to `.env` and fill in `WALLET_CONNECT_PROJECT_ID` (create one [here](https://cloud.walletconnect.com/)) and `WEB3_STORAGE_KEY` (generate one [here](https://web3.storage/tokens/)).
2. Start in development mode with `npm run dev`
3. Build for production using `npm run generate`

## Tests
No tests available at the moment :(

## Resources Used in Development
- [zksync-cli](https://github.com/matter-labs/zksync-cli/): Quick development environment setup including contract templates and a zkSync node.
- [zkSync Era Tutorials](https://era.zksync.io/docs/dev/tutorials/): Extensive guidance on developing with zkSync Era.
- [misfits and magic project](https://github.com/MexicanAce/misfits-and-magic/): A reference for contracts and paymaster usage.
- [My zkExport project](https://zkexport.netlify.app/): A source of design inspiration.

## 📜 License

This project is licensed under [MIT](./LICENSE).