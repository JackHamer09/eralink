export type Chain = {
  id: number;
  key: string;
  name: string;
  rpcUrl: string;
  blockExplorerUrl?: string;
  contracts: {
    paymasterAddress: string;
    textStorageAddress: string;
  };
  // If set to true, the network will not be shown in the network selector
  hidden?: boolean;
};

const chains: Chain[] = [
  /* {
    id: 324,
    key: "mainnet",
    name: "zkSync Era Mainnet",
    rpcUrl: "https://mainnet.era.zksync.io",
    blockExplorerUrl: "https://explorer.zksync.io",
  }, */
  {
    id: 280,
    key: "testnet",
    name: "zkSync Era Testnet",
    rpcUrl: "https://testnet.era.zksync.dev",
    blockExplorerUrl: "https://goerli.explorer.zksync.io",
    contracts: {
      textStorageAddress: "0xe2cd0C657a4f95fB81a79562DB19D460AA95b1d5",
      paymasterAddress: "0x72Cb42552Bc9b3B4809E394fc441A5289A5f6a9F",
    },
  },
  /* {
    id: 270,
    key: "stage",
    name: "zkSync Era Stage",
    rpcUrl: "https://z2-dev-api.zksync.dev",
    blockExplorerUrl: "https://goerli-beta.staging-scan-v2.zksync.dev",
    hidden: true,
  },
  {
    id: 300,
    key: "boojnet",
    name: "zkSync Era Boojnet",
    rpcUrl: "https://sepolia.era.zksync.dev",
    hidden: true,
  },
  {
    id: 260,
    key: "local-memory",
    name: "In-memory Node",
    rpcUrl: "http://localhost:8011",
    hidden: true,
  }, */
  {
    id: 270,
    key: "local-dockerized",
    name: "Dockerized Node",
    rpcUrl: "http://localhost:3050",
    contracts: {
      textStorageAddress: "0x22F4D93be0E8C0C081e74c0d5e697B64eEA007FF",
      paymasterAddress: "0xe4C7fBB0a626ed208021ccabA6Be1566905E2dFc",
    },
  },
];

export default chains;
