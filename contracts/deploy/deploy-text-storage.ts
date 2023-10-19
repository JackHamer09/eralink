import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract, getWallet } from "./utils";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy Text Storage script`);

  const textStorage = await deployContract(hre, "TextStorage");

  const wallet = getWallet();
  const proxy = await deployContract(hre, "UpgradableProxy", [textStorage.address, "0xa1cf087DB965Ab02Fb3CFaCe1f5c63935815f044"]);
}
