<template>
  <header id="header" class="header-container">
    <div class="header-grid">
      <NuxtLink :to="{ name: 'index' }" aria-label="Home" class="flex items-center">
        <img class="logo-image" src="/logo.svg" alt="EraLink" />
      </NuxtLink>

      <div class="right-section">
        <HeaderNetworkSwitcher />
        <HeaderUserButton />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup></script>

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
