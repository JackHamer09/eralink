<template>
  <header id="header" class="header-container">
    <div class="header-grid">
      <NuxtLink :to="{ name: 'index', query: $route.query }" aria-label="Home" class="flex items-center">
        <img class="logo-image" src="/logo.svg" alt="EraLink" />
      </NuxtLink>

      <div class="right-section">
        <button
          v-if="explorerContractLinks"
          title="View contracts on Block Explorer"
          class="flex h-9 w-full items-center gap-1.5 gap-x-1.5 whitespace-nowrap rounded-3xl bg-white/50 p-1 px-3 py-2 text-sm shadow-md shadow-blue-800/5 ring-1 ring-gray-600/[.15] transition hover:bg-white hover:shadow-xl hover:shadow-blue-800/5 hover:ring-gray-300"
          @click="contractsModalOpened = true"
        >
          <span class="hidden sm:inline">View contracts</span>
          <IconsEra class="h-8 w-8" />
        </button>
        <HeaderNetworkSwitcher />
        <!-- <HeaderUserButton /> -->
      </div>
    </div>

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
  </header>
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

<style lang="scss" scoped>
.header-container {
  @apply relative z-10 h-[var(--header-height)] py-5 transition-all;
  &.scrolled-down {
    @apply bg-white/[0.85] shadow-xl shadow-black/5 backdrop-blur duration-300;
  }

  .header-grid {
    @apply container flex justify-between;

    .logo-image {
      @apply h-5 w-auto sm:h-6;
    }

    .right-section {
      @apply flex items-center justify-end gap-3 md:gap-6;
    }
  }
}
</style>
