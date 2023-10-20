import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract, getWallet } from "./utils";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  const textStorage = await deployContract(hre, "TextStorage");

  const wallet = getWallet(hre);
  const proxy = await deployContract(
    hre,
    "UpgradableProxy",
    [
      textStorage.address, // implementation
      wallet.address // owner - who can upgrade the contract
    ]
  );
}
