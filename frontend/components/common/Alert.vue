<template>
  <div class="alert-container" :class="[`variant-${variant}`, { 'has-icon': !!icon }]">
    <div v-if="icon" class="alert-icon-container">
      <component :is="icon" class="alert-icon" aria-hidden="true" />
    </div>
    <div class="alert-body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  variant: {
    type: String as PropType<"info" | "neutral" | "success" | "warning" | "error">,
    default: "info",
  },
  icon: {
    type: [Object, Function] as PropType<Component>,
  },
});
</script>

<style lang="scss">
.alert-container {
  @apply w-full rounded-3xl p-4;
  &.has-icon {
    @apply grid grid-cols-[1.25rem_1fr] gap-3;
  }
  &.variant- {
    &info {
      @apply border bg-blue-100 text-blue-700;

      .alert-body {
        .alert-link {
          @apply hover:text-blue-600;
        }
      }
    }
    &neutral {
      @apply border border-gray-200 bg-gray-200 bg-opacity-70 text-gray-700 backdrop-blur-sm;

      .alert-body {
        .alert-link {
          @apply hover:text-gray-500;
        }
      }
    }
    &success {
      @apply border border-green-200 bg-green-200 text-green-700;

      .alert-body {
        .alert-link {
          @apply hover:text-green-600;
        }
      }
    }
    &warning {
      @apply border border-yellow-400 bg-yellow-50 text-yellow-700;

      .alert-icon {
        @apply text-yellow-400;
      }
    }
    &error {
      @apply border border-red-400 bg-red-50 text-red-700;

      .alert-icon {
        @apply text-red-400;
      }
    }
  }

  .alert-icon-container {
    @apply flex items-center;

    .alert-icon {
      @apply h-5 w-5;
    }
  }
  .alert-body {
    @apply flex-1 items-center text-sm sm:flex sm:justify-between;

    .alert-link {
      @apply mt-2 flex items-center whitespace-nowrap font-medium underline underline-offset-2 transition-colors sm:ml-6 sm:mt-0;
    }
  }
}
</style>
