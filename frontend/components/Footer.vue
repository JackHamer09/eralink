<template>
  <div>
    <footer class="container flex items-center gap-4 pb-4 pt-12 sm:gap-6">
      <div class="text-left text-sm text-gray-400">
        Made with ❤️ by
        <a
          class="font-medium text-blue-700 transition hover:text-blue-800"
          href="https://github.com/JackHamer09"
          target="_blank"
        >
          JackHamer
        </a>
      </div>
      <button
        v-if="explorerContractLinks"
        title="View contracts on Block Explorer"
        class="ml-auto block w-max text-gray-500 transition hover:text-gray-900"
        @click="contractsModalOpened = true"
      >
        <IconsEra class="h-8 w-8" />
      </button>
      <a
        href="https://github.com/JackHamer09/eralink"
        title="zkSync Plus GitHub page"
        target="_blank"
        rel="noopener"
        class="block w-max text-gray-500 transition hover:text-gray-900"
      >
        <IconsGitHub class="h-7 w-7" />
      </a>
    </footer>
    <CommonModalGeneric v-model:open="contractsModalOpened">
      <template #default>
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <IconsEra class="h-8 w-8 text-black" aria-hidden="true" />
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
            View contracts on Block Explorer
          </DialogTitle>
          <div class="mt-2">
            <ul>
              <li
                v-for="({ link, address }, label) in explorerContractLinks"
                :key="label"
                class="flex items-center justify-between gap-x-6 py-3"
              >
                <div class="min-w-0 text-left">
                  <p class="text-sm font-semibold leading-6 text-gray-900">{{ label }}</p>
                  <p class="mt-1 truncate text-xs leading-5 text-gray-500" :title="address">
                    {{ address }}
                  </p>
                </div>
                <div class="flex flex-none items-center gap-x-4">
                  <a
                    :href="link"
                    target="_blank"
                    class="flex items-center rounded-3xl bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    View <span class="sr-only">, {{ label }}</span>
                    <ArrowUpRightIcon class="ml-1 h-5 w-5" aria-hidden="true" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </CommonModalGeneric>
  </div>
</template>

<script lang="ts" setup>
import { DialogTitle } from "@headlessui/vue";
import { ArrowUpRightIcon } from "@heroicons/vue/20/solid";

const { selectedChain } = storeToRefs(useNetworkStore());
const explorerContractLinks = computed(() => {
  if (!selectedChain.value.blockExplorerUrl) {
    return;
  }
  return {
    "Text Storage": {
      link: `${selectedChain.value.blockExplorerUrl}/address/${selectedChain.value.contracts.textStorageAddress}`,
      address: selectedChain.value.contracts.textStorageAddress,
    },
    Paymaster: {
      link: `${selectedChain.value.blockExplorerUrl}/address/${selectedChain.value.contracts.paymasterAddress}`,
      address: selectedChain.value.contracts.paymasterAddress,
    },
  };
});

const contractsModalOpened = ref(false);
</script>
