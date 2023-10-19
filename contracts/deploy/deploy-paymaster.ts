import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract } from "./utils";

const TEXT_STORAGE_PROXY_ADDRESS = "0xe2cd0C657a4f95fB81a79562DB19D460AA95b1d5";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy Text Storage script`);

  if (!TEXT_STORAGE_PROXY_ADDRESS) {
    throw new Error("TEXT_STORAGE_PROXY_ADDRESS is not set");
  }

  const paymaster = await deployContract(hre, "GeneralPaymaster", [TEXT_STORAGE_PROXY_ADDRESS]);
}
