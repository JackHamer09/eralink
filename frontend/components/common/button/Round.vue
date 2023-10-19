<template>
  <component
    :is="as"
    type="button"
    class="common-button-round"
    :class="[`variant-${variant}`, { loading }]"
    :disabled="loading"
    :aria-disabled="loading"
  >
    <component :is="icon" class="button-icon" aria-hidden="true" />
    <span class="loader-container">
      <CommonSpinner class="loader-spinner" />
    </span>
  </component>
</template>

<script lang="ts" setup>
defineProps({
  as: {
    type: [String, Object] as PropType<string | Component>,
    default: "button",
  },
  icon: {
    type: [String, Function, Object] as PropType<string | Component>,
    required: true,
  },
  variant: {
    type: String as PropType<"primary">,
    default: "primary",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.common-button-round {
  @apply relative flex aspect-square h-10 w-auto items-center justify-center rounded-full p-2.5 text-white transition sm:h-12 sm:p-3;

  &.variant-primary {
    @apply bg-blue-700 text-white enabled:hover:bg-blue-800 disabled:bg-blue-700/70;
  }
  &.loading {
    .button-icon {
      @apply scale-0;
    }
    .loader-container {
      @apply opacity-100;
    }
  }

  .button-icon {
    @apply h-5 w-5 transform transition duration-500;
  }
  .loader-container {
    @apply absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-full text-white opacity-0 transition-opacity;

    .loader-spinner {
      @apply h-6 w-6;
    }
  }
}
</style>
