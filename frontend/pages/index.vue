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
const { addLink } = useLinksStore();
const { inProgress, error, input, fileInput } = storeToRefs(useLinksStore());

const fileUpload = (file: File) => {
  fileInput.value = file;
  createLink();
};

const createLink = async () => {
  await addLink();
  document.getElementById("links-history")?.scrollIntoView({ behavior: "smooth" });
};
</script>

<style lang="scss" scoped>
.h2 {
  @apply w-full text-center text-4xl font-bold tracking-tight text-gray-900;
}
</style>
