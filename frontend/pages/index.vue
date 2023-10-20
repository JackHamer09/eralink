<template>
  <div class="container">
    <LinkErrorModal v-model:error="error" />
    <Hero id="hero" v-model="input" :disabled="inProgress" @submit="createLink" @upload="fileUpload" />
    <div id="links-history">
      <div class="py-10">
        <h2 class="h2">Your Links</h2>
      </div>
      <LinkList />
    </div>
    <div class="mt-40">
      <div class="py-10">
        <h2 class="h2">Embracing Decentralization</h2>
        <p class="mx-auto mt-4 text-center text-lg text-gray-500 sm:leading-8">
          Unlocking the potential of on-chain storage and account abstraction
        </p>
      </div>
      <Features />
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "EraLink - shorten and immortalize your links, text, and files with zkSync",
  meta: [
    {
      name: "description",
      content: "Shorten and immortalize your links, text, and files anonymously on-chain with zkSync Era",
    },
    { name: "og:title", content: "EraLink - shorten and immortalize your links, text, and files with zkSync" },
    {
      name: "og:description",
      content: "Shorten and immortalize your links, text, and files anonymously on-chain with zkSync Era",
    },
  ],
});

const { addLink } = useLinksStore();
const { inProgress, error, input, fileInput } = storeToRefs(useLinksStore());

const fileUpload = (file: File) => {
  fileInput.value = file;
  createLink();
};

const createLink = async () => {
  await addLink();
  scrollIntoView("#links-history");
};
</script>

<style lang="scss" scoped>
.h2 {
  @apply w-full text-center text-4xl font-bold tracking-tight text-gray-900;
}
</style>
