import { useRouteQuery } from "@vueuse/router";
import chains from "@/data/chains";

export const useNetworkStore = defineStore("network", () => {
  const defaultChain = chains[0];
  const routeNetwork = useRouteQuery<string | null>("network", null, { mode: "replace" });
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

  watch(selectedChain, (network) => {
    trackEvent(useGtag().gtag, "Network change", { network: network.name });
  });

  return {
    selectedChain,
    changeChain,
  };
});
