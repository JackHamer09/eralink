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
      textStorageAddress: "0x69Ae307d70256E9b101FDafEb830AF8A8327bB0c",
      paymasterAddress: "0x6C68a2501Bd2818916337dB3D66027fe38657EEE",
    },
  },
  /* {
    id: 300,
    key: "boojnet",
    name: "zkSync Era Boojnet",
    rpcUrl: "https://sepolia.era.zksync.dev",
    hidden: true,
  }, */
  {
    id: 260,
    key: "local-memory",
    name: "In-memory Node",
    rpcUrl: "http://localhost:8011",
    hidden: true,
    contracts: {
      textStorageAddress: "0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021",
      paymasterAddress: "0x26b368C3Ed16313eBd6660b72d8e4439a697Cb0B",
    },
  },
  {
    id: 270,
    key: "local-dockerized",
    name: "Dockerized Node",
    rpcUrl: "http://localhost:3050",
    hidden: true,
    contracts: {
      textStorageAddress: "0xD49036D56f474152891D9eced770D6b90B2cEAE9",
      paymasterAddress: "0xb1Ca5B44ef3627A3E5Ed7a6EE877D9D997A7c7ED",
    },
  },
];

export default chains;
