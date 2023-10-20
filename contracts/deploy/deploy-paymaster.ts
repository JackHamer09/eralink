import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract } from "./utils";

const TEXT_STORAGE_PROXY_ADDRESS = "";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  if (!TEXT_STORAGE_PROXY_ADDRESS) {
    throw new Error("TEXT_STORAGE_PROXY_ADDRESS is not set");
  }

  const paymaster = await deployContract(hre, "GeneralPaymaster", [TEXT_STORAGE_PROXY_ADDRESS]);
}
