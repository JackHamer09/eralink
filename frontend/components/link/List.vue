<template>
  <div class="mx-auto max-w-lg">
    <div v-if="links.length" class="relative overflow-hidden p-0.5" :class="{ 'max-h-[430px]': !isFullVisible }">
      <div ref="listContainer" class="w-full space-y-4">
        <template v-for="item in links" :key="item.transactionHash">
          <LinkListItem v-bind="item" />
        </template>
      </div>
      <div
        v-if="!moreVisible && !isFullVisible"
        class="pointer-events-none absolute bottom-0 left-0 flex h-32 w-full flex-shrink-0 items-end justify-center bg-gradient-to-t from-white to-transparent"
      >
        <button
          class="pointer-events-auto block rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 transition hover:bg-gray-50"
          @click="moreVisible = true"
        >
          Show all
        </button>
      </div>
    </div>
    <a
      v-else
      href="#header"
      class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <LinkIcon class="mx-auto h-12 w-12 text-gray-400" />
      <span class="mt-2 block text-sm font-semibold text-gray-900">Create a new link</span>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { LinkIcon } from "@heroicons/vue/24/outline";
import { useElementSize } from "@vueuse/core";

const { links } = storeToRefs(useLinksStore());

const listContainer = ref<HTMLElement | null>(null);
const moreVisible = ref(false);
const { height } = useElementSize(listContainer);
const isFullVisible = computed(() => {
  return moreVisible.value || height.value < 450;
});
</script>

<style lang="scss" scoped></style>
