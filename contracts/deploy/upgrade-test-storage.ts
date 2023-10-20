import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getWallet } from "./utils";

// load contract artifact. Make sure to compile first!
import * as ProxyContractArtifact from "../artifacts-zk/contracts/UpgradableProxy.sol/UpgradableProxy.json";

// Address of the contract on zksync testnet
const PROXY_CONTRACT_ADDRESS = "";
const NEW_TEXT_STORAGE_CONTRACT_ADDRESS = "";

if (!PROXY_CONTRACT_ADDRESS) throw "⛔️ Proxy contract address not provided";
if (!NEW_TEXT_STORAGE_CONTRACT_ADDRESS) throw "⛔️ Text Storage contract address not provided";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  const signer = getWallet(hre);

  // Initialize contract instance
  const contract = new ethers.Contract(
    PROXY_CONTRACT_ADDRESS,
    ProxyContractArtifact.abi,
    signer
  );

  console.log(`Upgrading contract to ${NEW_TEXT_STORAGE_CONTRACT_ADDRESS}`)

  const tx = await contract.upgrade(NEW_TEXT_STORAGE_CONTRACT_ADDRESS);

  console.log(`Upgrade contract transaction: ${tx.hash}`);

  await tx.wait();
}
