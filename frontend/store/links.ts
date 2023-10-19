import { useStorage } from "@vueuse/core";
import { generateSlug } from "random-word-slugs";

export type LinkType = "text" | "file" | "url";
type StorageLinkItem = {
  slug: string;
  text: string;
  timestamp: string;
  transactionHash?: string;
};
type LinkItem = StorageLinkItem & { type: LinkType };

const DEFAULT_SLUG_WORD_COUNT = 4;

export const useLinksStore = defineStore("links", () => {
  const { selectedChain } = storeToRefs(useNetworkStore());

  const fileInput = ref<File | null>(null);
  const input = useStorage("era-link-input", "");
  const linksStorageByNetwork = useStorage<{ [chainKey: string]: StorageLinkItem[] }>("era-links", {});
  const linksStorage = computed({
    get: (): StorageLinkItem[] => {
      return linksStorageByNetwork.value[selectedChain.value.key] || [];
    },
    set: (value: StorageLinkItem[]) => {
      linksStorageByNetwork.value[selectedChain.value.key] = value;
    },
  });
  const links = computed<LinkItem[]>(() => {
    // sort by timestamp, newest goes first
    return [...linksStorage.value]
      .sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      })
      .map((link) => {
        return {
          ...link,
          type: textToType(link.text),
        };
      });
  });

  const slugExists = async (slug: string) => {
    const result = await getEntryBySlug(slug);
    return !!result;
  };
  const getUniqueSlug = async () => {
    let slug = generateSlug(DEFAULT_SLUG_WORD_COUNT);
    while (await slugExists(slug)) {
      slug = generateSlug(DEFAULT_SLUG_WORD_COUNT);
    }
    return slug;
  };

  const {
    inProgress,
    error,
    execute: addLink,
  } = usePromise(
    async () => {
      const text = input.value;
      const file = fileInput.value;
      const slug = await getUniqueSlug();

      let transactionHash: string | undefined;
      let textToStore: string | undefined;
      if (file) {
        const cid = await storeFile(file);
        const receipt = await executePaymasterTextStore(slug, cid);
        textToStore = cid;
        transactionHash = receipt.transactionHash;
      } else {
        const receipt = await executePaymasterTextStore(slug, text);
        textToStore = text;
        transactionHash = receipt.transactionHash;
      }
      input.value = "";
      fileInput.value = null;
      linksStorage.value = [
        ...linksStorage.value,
        {
          slug,
          text: textToStore,
          timestamp: new Date().toISOString(),
          transactionHash,
        },
      ];
    },
    { cache: false }
  );

  return {
    input,
    fileInput,
    links,

    inProgress,
    error,
    addLink,
  };
});
