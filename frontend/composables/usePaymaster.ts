import { Contract, Provider, Wallet, utils } from "zksync-web3";
import { BigNumber, Signer } from "ethers";
import { TransactionReceipt } from "zksync-web3/build/src/types";
import { useProviderStore } from "@/store/provider";
import TEXT_STORAGE_ABI from "@/data/abi/TextStorage.json";

const getProvider = () => {
  const { getProvider } = useProviderStore();
  return getProvider();
};

const getContractsAddresses = () => {
  const { selectedChain } = useNetworkStore();
  return selectedChain.contracts;
};

const getTextStorageContract = (signer?: Signer) => {
  let signerOrProvider: Signer | Provider | undefined = signer;
  if (!signerOrProvider) {
    signerOrProvider = getProvider();
  }
  const { textStorageAddress } = getContractsAddresses();
  return new Contract(textStorageAddress, TEXT_STORAGE_ABI, signerOrProvider);
};

const getPaymasterTextStoreParams = async (data: { signer: Signer; slug: string; text: string }) => {
  const { paymasterAddress } = getContractsAddresses();
  const paymasterParams = utils.getPaymasterParams(paymasterAddress, {
    type: "General",
    // empty bytes as testnet paymaster does not use innerInput
    innerInput: new Uint8Array(),
  });

  const [gasLimit, gasPrice] = await Promise.all([
    // estimate gasLimit via paymaster
    getTextStorageContract(data.signer).estimateGas.storeText(data.text, data.slug, {
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        paymasterParams,
      },
    }),
    getProvider().getGasPrice(),
  ]);

  return {
    maxFeePerGas: gasPrice,
    maxPriorityFeePerGas: BigNumber.from(0),
    gasLimit,
    customData: {
      gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
      paymasterParams,
    },
  };
};

const getRandomWallet = () => {
  return Wallet.createRandom();
};

export const executePaymasterTextStore = async (slug: string, text: string) => {
  const wallet = getRandomWallet().connect(getProvider());
  const params = await getPaymasterTextStoreParams({
    signer: wallet,
    slug,
    text,
  });

  const textStorageContract = getTextStorageContract(wallet);
  const txHandle = await textStorageContract.storeText(text, slug, params);
  const receipt = await txHandle.wait();
  return receipt as TransactionReceipt;
};

export const getEntryBySlug = async (slug: string) => {
  const textStorageContract = getTextStorageContract();
  const [creator, timestamp, text]: [string, BigNumber, string] = await textStorageContract.getEntry(slug);
  if (creator === "0x0000000000000000000000000000000000000000") {
    return undefined;
  }
  return {
    creator,
    timestamp: new Date(timestamp.toNumber() * 1000).toISOString(),
    text,
  };
};
