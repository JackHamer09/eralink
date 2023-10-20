import { useRouteQuery } from "@vueuse/router";
import chains from "@/data/chains";

export const useNetworkStore = defineStore("network", () => {
  const defaultChain = chains[0];
  const routeNetwork = useRouteQuery("network", undefined, { mode: "replace" });
  const selectedChain = computed(() => {
    if (routeNetwork.value) {
      return chains.find((e) => e.key === routeNetwork.value) ?? defaultChain;
    }
    return defaultChain;
  });

  const changeChain = (chain: string) => {
    if (chain === defaultChain.key) {
      routeNetwork.value = null;
    } else {
      routeNetwork.value = chain;
    }
  };

  return {
    selectedChain,
    changeChain,
  };
});
