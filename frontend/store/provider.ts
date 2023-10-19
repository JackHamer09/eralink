import { Provider } from "zksync-web3";

export const useProviderStore = defineStore("provider", () => {
  const { selectedChain } = storeToRefs(useNetworkStore());

  const providers: { [rpcUrl: string]: Provider } = {};
  const getProvider = () => {
    const rpcUrl = selectedChain.value.rpcUrl;
    if (!providers[rpcUrl]) {
      providers[rpcUrl] = new Provider(rpcUrl);
    }
    return providers[rpcUrl];
  };

  return {
    getProvider,
  };
});
