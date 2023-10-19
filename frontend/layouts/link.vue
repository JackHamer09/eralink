<template>
  <div class="link-layout">
    <NuxtLink :to="{ name: 'index' }" aria-label="Home" class="flex w-full items-center justify-center">
      <img class="logo-image" src="/logo.svg" alt="EraLink" />
    </NuxtLink>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.link-layout {
  @apply mx-auto grid max-w-lg grid-rows-[max-content_1fr] px-6 py-12 pt-[calc(30vh-40px)] lg:px-8;
  min-height: 100vh;
  min-height: 100dvh;

  .logo-image {
    @apply mb-10 h-10 w-auto;
  }
}
</style>
