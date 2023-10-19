import { HardhatUserConfig } from "hardhat/config";

import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";

import "@matterlabs/hardhat-zksync-verify";

const config: HardhatUserConfig = {
  zksolc: {
    version: "latest",
    settings: {},
  },
  defaultNetwork: "zkSyncEraTestnet",
  networks: {
    hardhat: {
      zksync: false,
    },
    dockerizedNode: {
      url: "http://localhost:3050",
      ethNetwork: "localhost",
      zksync: true,
    },
    zkSyncEraTestnet: {
      url: "https://testnet.era.zksync.dev",
      ethNetwork: "goerli",
      zksync: true,
      verifyURL: "https://zksync2-testnet-explorer.zksync.dev/contract_verification",
    }
  },
  solidity: {
    version: "0.8.17",
  },
};

export default config;
