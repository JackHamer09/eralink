<template>
  <div class="flex flex-col">
    <LinkListItem v-if="inProgress" :slug="slug" />
    <template v-else-if="linkItem">
      <LinkListItem v-bind="linkItem" :clamp="false" />
      <div class="sticky bottom-5 mt-5">
        <CommonAlert :icon="ExclamationTriangleIcon" variant="warning">
          <p>
            Content is not moderated. Proceed with caution as this may contain harmful text, files, links, or other
            malicious content.
          </p>
        </CommonAlert>
        <CommonButton
          v-if="linkItem?.type === 'url'"
          class="mt-5"
          :icon="ArrowUpRightIcon"
          icon-position="right"
          @click="openLink"
        >
          Open link
        </CommonButton>
        <CommonButton
          v-else-if="linkItem?.type === 'file'"
          class="mt-5"
          :icon="ArrowUpRightIcon"
          icon-position="right"
          @click="openFile"
        >
          Open file
        </CommonButton>
      </div>
    </template>
    <template v-else-if="error">
      <CommonAlert :icon="ExclamationCircleIcon" variant="error">
        <p>
          {{ error }}
        </p>
      </CommonAlert>
      <CommonButton class="mt-5" :icon="ArrowPathIcon" icon-position="right" @click="fetchBySlug">
        Try again
      </CommonButton>
    </template>
    <template v-else-if="linkItem === null">
      <CommonAlert :icon="QuestionMarkCircleIcon" variant="warning">
        <p>
          Nothing found for <span class="font-medium">{{ slug }}</span>
        </p>
      </CommonAlert>
      <CommonButton
        as="RouterLink"
        :to="{ name: 'index', query: $route.query }"
        class="mt-5"
        :icon="PlusIcon"
        icon-position="right"
      >
        Create link
      </CommonButton>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  ArrowPathIcon,
  ArrowUpRightIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/20/solid";

definePageMeta({
  layout: "link",
});

const route = useRoute();

const slug = computed(() => (Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug));

const {
  inProgress,
  error,
  result,
  execute: fetchBySlug,
} = usePromise(
  async () => {
    const resolved = await getEntryBySlug(slug.value);
    if (!resolved) {
      return null;
    }
    return resolved;
  },
  { cache: false }
);

const linkItem = computed(() => {
  if (!result.value) {
    return result.value as undefined | null; // If null we show "Nothing found"
  }

  return {
    slug: slug.value,
    text: result.value.text,
    timestamp: result.value.timestamp,
    type: textToType(result.value.text),
  };
});

watch(
  slug,
  () => {
    fetchBySlug();
    trackEvent(useGtag().gtag, "Link visited");
  },
  { immediate: true }
);

const openLink = () => {
  if (linkItem.value?.type === "url") {
    window.open(linkItem.value.text, "_blank");
  }
};
const openFile = () => {
  if (linkItem.value?.type === "file") {
    window.open(`https://ipfs.io/ipfs/${linkItem.value.text}`, "_blank");
  }
};
</script>
