<template>
  <div class="default-layout">
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.default-layout {
  --header-height: 8.5rem;
  @media (min-width: 640px) {
    --header-height: 5rem;
  }
}
</style>
