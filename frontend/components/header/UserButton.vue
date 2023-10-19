<template>
  <button v-if="!account.isConnected" class="user-button" @click="openModal">
    <span>Connect wallet</span>
    <WalletIcon class="user-button-icon" aria-hidden="true" />
  </button>
  <button v-else class="user-button" title="Open wallet settings" @click="openModal">
    <AddressAvatar class="user-icon" :address="account.address!" />
    <span class="font-medium">{{ shortenAddress(account.address!) }}</span>
  </button>
</template>

<script lang="ts" setup>
import { WalletIcon } from "@heroicons/vue/24/outline";

const { openModal } = useOnboardStore();
const { account } = storeToRefs(useOnboardStore());
</script>

<style scoped lang="scss">
.user-button {
  @apply flex h-10 items-center gap-1.5 whitespace-nowrap rounded-3xl bg-white p-1 px-3 py-2 shadow-md shadow-blue-800/5 ring-1 ring-gray-600/[.15] transition-shadow hover:shadow-xl hover:shadow-blue-800/5 hover:ring-gray-300;
  &.active,
  &:hover {
    @apply shadow-md shadow-blue-800/5 ring-1 ring-gray-300;
  }

  .user-button-icon {
    @apply p-0.5 text-gray-600;
  }
  .user-button-icon,
  .user-icon {
    @apply aspect-square h-full w-auto;
  }
}
.user-popup {
  @apply absolute left-full isolate mt-2 flex w-64 -translate-x-full flex-col overflow-hidden rounded-3xl bg-white p-1 shadow-md;
  &.logged-out {
    .user-bg {
      @apply -left-[8%] -top-12 w-[180%] overflow-hidden rounded-[90%];
    }
  }
  .user-bg {
    @apply absolute inset-0 -left-[40%] -top-28 -z-[1] h-48 w-[140%] rounded-full rounded-t bg-gradient-to-r from-blue-600 to-blue-700;
  }
  .create-announcement-button {
    @apply mx-auto mb-2 mt-5 flex w-56 items-center justify-center rounded-3xl bg-white/10 py-3 text-white ring-1 ring-white/50 transition;
    &:hover,
    &.active {
      @apply bg-white/20 ring-white/60;
    }
    &.active:not(:hover) {
      @apply ring-blue-200;
    }
  }
  .user-avatar {
    @apply mx-auto mt-4 h-20 w-20 rounded-full bg-white shadow-lg shadow-black/20;
  }
  .user-name {
    @apply mb-4 mt-2 text-center text-xl font-semibold;
  }
  .round-buttons-container {
    @apply mb-2 flex items-center justify-around rounded-3xl px-6;

    .popup-round-button {
      @apply h-12 w-12 whitespace-nowrap rounded-full p-3 text-gray-600 ring-1 ring-gray-200 transition-shadow;
      &.active,
      &:hover {
        @apply shadow-lg shadow-blue-800/5 ring-1 ring-gray-300;
      }
      &.active:not(:hover) {
        @apply ring-blue-600;
      }
    }
  }
  .popup-menu-item {
    @apply flex items-center whitespace-nowrap rounded-3xl px-5 py-3 text-left text-sm text-gray-600;
    &.active:hover {
      @apply bg-gray-50;
    }
    &.active:not(:hover) {
      @apply ring-1 ring-blue-500;
    }

    .menu-item-icon {
      @apply mr-2 h-4 w-4;
    }
  }
}
</style>
