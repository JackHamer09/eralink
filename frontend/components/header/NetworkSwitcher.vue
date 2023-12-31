<template>
  <Menu v-slot="{ open }" as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="flex h-9 w-full items-center gap-1.5 gap-x-1.5 whitespace-nowrap rounded-3xl p-1 px-3 py-2 text-sm shadow-md shadow-blue-800/5 ring-1 ring-gray-600/[.15] transition hover:bg-white hover:shadow-xl hover:shadow-blue-800/5 hover:ring-gray-300"
        :class="open ? 'bg-white' : 'bg-white/50'"
      >
        <span>{{ selectedChain.name }}</span>
        <!-- <IconsEra class="-mx-1 h-8 w-8 sm:hidden" aria-hidden="true" /> -->
        <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="p-1">
          <template v-for="item in chains" :key="item.key">
            <MenuItem v-if="!item.hidden || isChainSelected(item.key)" v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'flex w-full items-center justify-between rounded-xl px-4 py-2 text-left text-sm',
                ]"
                @click="changeChain(item.key)"
              >
                <span :class="{ 'font-medium': isChainSelected(item.key) }">{{ item.name }}</span>
                <CheckIcon v-if="isChainSelected(item.key)" class="h-4 w-4" />
              </button>
            </MenuItem>
          </template>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon, CheckIcon } from "@heroicons/vue/20/solid";

import chains from "@/data/chains";

const { changeChain } = useNetworkStore();
const { selectedChain } = storeToRefs(useNetworkStore());

const isChainSelected = (chainKey: string) => chainKey === selectedChain.value.key;
</script>
