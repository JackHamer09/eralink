<template>
  <div
    class="flex w-full flex-col items-start justify-between rounded-3xl bg-white px-4 py-5 ring-2 ring-gray-100 sm:px-6"
  >
    <div class="flex w-full items-center gap-x-4 text-xs">
      <time :datetime="timestamp" class="text-gray-500">
        <span v-if="timestamp">{{ dateString }}</span>
        <span v-else>
          <CommonContentLoader :length="30" />
        </span>
      </time>
      <CommonContentLoader v-if="!type" :length="13" class="py-0.5" />
      <CommonBadge v-else-if="type === 'text'" variant="gray">Text</CommonBadge>
      <CommonBadge v-else-if="type === 'url'" variant="yellow">Link</CommonBadge>
      <CommonBadge v-else-if="type === 'file'" variant="green">File</CommonBadge>

      <CommonContentLoader v-if="!type" :length="16" class="ml-auto px-3 py-1.5 text-sm" />
      <button
        v-else
        class="ml-auto rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition hover:bg-gray-50"
        :class="{ 'ring-blue-600': copied }"
        @click="copy"
      >
        {{ copied ? "Copied!" : "Copy link" }}
      </button>
    </div>
    <div class="group relative w-full">
      <NuxtLink
        :to="link"
        class="mt-3 block break-all text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
      >
        <span v-if="clamp" class="absolute inset-0" />
        <CommonContentLoader v-if="!type" :length="slug.length * 2" class="py-0.5" />
        <span v-else>{{ slug }}</span>
      </NuxtLink>
      <p
        v-if="type === 'text' || type === 'url' || !type"
        class="mt-5 overflow-hidden break-all text-sm leading-6 text-gray-600"
        :class="{ 'line-clamp-3': clamp }"
      >
        <span v-if="text">{{ text }}</span>
        <span v-else>
          <span class="block overflow-ellipsis"><CommonContentLoader :length="100" /></span>
          <span class="block"><CommonContentLoader :length="70" /></span>
          <span class="block"><CommonContentLoader :length="40" /></span>
        </span>
      </p>
      <a
        v-else-if="type === 'file'"
        :href="`https://ipfs.io/ipfs/${text}`"
        target="_blank"
        class="mt-5 grid grid-cols-[max-content_1fr] items-center gap-3"
      >
        <span class="flex items-center justify-center rounded-lg border p-4">
          <DocumentIcon class="h-4 w-4" aria-hidden="true" />
        </span>
        <span class="block w-full overflow-hidden text-ellipsis text-sm">
          {{ text }}
        </span>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DocumentIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  type: {
    type: String as PropType<"text" | "file" | "url">,
  },
  slug: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  timestamp: {
    type: String,
  },
  clamp: {
    type: Boolean,
    default: true,
  },
});

const dateString = computed(() => {
  if (!props.timestamp) {
    return;
  }
  const transactionDate = new Date(props.timestamp);
  const today = new Date();

  const time = transactionDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (transactionDate.toDateString() === today.toDateString()) {
    // If the transaction happened today
    return `Today at ${time}`;
  } else {
    // If the transaction happened on another day
    const month = transactionDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
    if (transactionDate.getFullYear() !== today.getFullYear()) {
      // If the transaction happened on another year
      return `${month} ${transactionDate.getFullYear()} at ${time}`;
    } else {
      return `${month} at ${time}`;
    }
  }
});

const route = useRoute();
const link = computed(() => ({
  path: props.slug,
  query: route.query.network ? { network: route.query.network } : undefined,
}));

const { copied, copy } = useCopy(
  computed(() => {
    let routeFull = `${window.location.origin}/${link.value.path}`;
    if (route.query.network) {
      routeFull += `?network=${route.query.network}`;
    }
    return routeFull;
  })
);
</script>
