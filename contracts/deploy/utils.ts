import { Provider, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import dotenv from "dotenv";

// load env file
dotenv.config();

export const getWallet = (hre: HardhatRuntimeEnvironment) => {
  // load wallet private key from env file
  const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";
  
  if (!PRIVATE_KEY) throw "⛔️ Private key not detected! Add it to the .env file!";

  // @ts-ignore
  const provider = new Provider(hre.network.config.url);
  
  // Initialize the wallet.
  const wallet = new Wallet(PRIVATE_KEY, provider);

  return wallet;
}

export const deployContract = async (hre: HardhatRuntimeEnvironment, contractArtifactName: string, args?: any[]) => {
  const wallet = getWallet(hre);
  
  console.log(`\nRunning deployment script for ${contractArtifactName}...`);
  // Create deployer object and load the artifact of the contract you want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact(contractArtifactName);

  // Estimate contract deployment fee
  const deploymentFee = await deployer.estimateDeployFee(artifact, args || []);

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.
  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

  const textStorageContract = await deployer.deploy(artifact, args);

  //obtain the Constructor Arguments
  const constructorArgs = textStorageContract.interface.encodeDeploy(args);
  console.log(`Constructor args: ${constructorArgs}`);

  // Show the contract info.
  console.log(`${artifact.contractName} was deployed to ${textStorageContract.address}`);

  // @ts-ignore
  if (hre.network.config.verifyURL) {
    console.log("Starting contract verification process...");
    // Verify contract programmatically
    const verificationId = await hre.run("verify:verify", {
      address: textStorageContract.address,
      contract: `${artifact.sourceName}:${artifact.contractName}`,
      constructorArguments: constructorArgs,
      bytecode: artifact.bytecode,
    });
  }

  return textStorageContract;
}