import {
  configureChains,
  createConfig,
  getAccount,
  getNetwork,
  getPublicClient,
  getWalletClient,
  InjectedConnector,
  switchNetwork as switchWalletNetwork,
  disconnect as walletDisconnect,
  watchAccount,
  watchNetwork,
} from "@wagmi/core";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { publicProvider } from "@wagmi/core/providers/public";
import { createWeb3Modal } from "@web3modal/wagmi";
import { defineStore, storeToRefs } from "pinia";

import type { Chain as WagmiChain } from "@wagmi/core";
import chains from "@/data/chains";
import { useRuntimeConfig } from "#imports";

export const useOnboardStore = defineStore("onboard", () => {
  const wagmiChains = chains.map(
    (e): WagmiChain => ({
      id: e.id,
      name: e.name,
      network: e.key,
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: {
        default: { http: [e.rpcUrl] },
        public: { http: [e.rpcUrl] },
      },
    })
  );
  const { public: env } = useRuntimeConfig();
  const { selectedChain } = storeToRefs(useNetworkStore());

  const { publicClient } = configureChains(wagmiChains, [publicProvider()]);
  const metadata = {
    name: "Era Link",
    description:
      "Shorten and immortalize your links, text, and files on-chain with zkSync Era, making them accessible forever",
    url: "https://eralink.netlify.app",
    icons: ["https://eralink.netlify.app/icon.png"],
  };
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
      new WalletConnectConnector({
        chains: wagmiChains,
        options: { projectId: env.walletConnectProjectID as string, showQrModal: false, metadata },
      }),
      new InjectedConnector({ chains: wagmiChains, options: { shimDisconnect: true } }),
    ],
    publicClient,
  });

  const account = ref(getAccount());
  const network = ref(getNetwork());
  const connectingWalletError = ref<string | undefined>();
  const connectorName = ref(wagmiConfig.connector?.name);

  const web3modal = createWeb3Modal({
    wagmiConfig,
    projectId: env.walletConnectProjectID,
    chains: wagmiChains,
    themeMode: "light",
  });

  watchAccount((updatedAccount) => {
    if (updatedAccount.status === "connecting" && !updatedAccount.connector) {
      return;
    }
    try {
      account.value = updatedAccount;
      connectorName.value = wagmiConfig.connector?.name;
    } catch (err) {
      disconnect();
      const error = formatError(err as Error);
      if (error) {
        connectingWalletError.value = error.message;
      }
    }
  });
  watchNetwork((updatedNetwork) => {
    network.value = updatedNetwork;
  });

  const openModal = () => web3modal.open();
  const disconnect = () => {
    walletDisconnect();
  };

  const isCorrectNetworkSet = computed(() => {
    const walletNetworkId = network.value.chain?.id;
    return walletNetworkId === selectedChain.value?.id;
  });
  const switchNetworkById = async (chainId: number, networkName?: string) => {
    try {
      await switchWalletNetwork({ chainId });
    } catch (err) {
      if (err instanceof Error && err.message.includes("does not support programmatic chain switching")) {
        throw new Error(`Please switch network manually to "${networkName}" in your wallet`);
      }
      throw err;
    }
  };
  const {
    inProgress: switchingNetworkInProgress,
    error: switchingNetworkError,
    execute: switchNetwork,
  } = usePromise(
    async () => {
      await switchNetworkById(selectedChain.value.id);
    },
    { cache: false }
  );
  const setCorrectNetwork = async () => {
    await switchNetwork().catch(() => undefined);
  };

  const { subscribe: subscribeOnAccountChange, notify: notifyOnAccountChange } = useObservable<string | undefined>();
  watch(
    () => account.value.address,
    () => {
      notifyOnAccountChange(account.value.address);
    }
  );

  return {
    account: computed(() => account.value),
    network: computed(() => network.value),
    isConnectingWallet: computed(() => account.value.isReconnecting || account.value.isConnecting),
    connectingWalletError,
    connectorName,
    openModal,
    disconnect,

    isCorrectNetworkSet,
    switchingNetworkInProgress,
    switchingNetworkError,
    setCorrectNetwork,
    switchNetworkById,

    getWalletClient: async (chainId = selectedChain.value.id) => {
      const client = await getWalletClient({ chainId });
      if (!client) throw new Error("Wallet is not available");

      return client;
    },
    getPublicClient: () => {
      return getPublicClient({ chainId: selectedChain.value.id });
    },

    subscribeOnAccountChange,
  };
});
