<template>
  <label class="checkbox-input" :class="{ checked }">
    <span class="checkbox-container">
      <input
        class="sr-only"
        type="checkbox"
        :checked="checked"
        @change="toggleChecked()"
        @keyup.enter="toggleChecked()"
      />
      <CheckIcon aria-hidden="true" class="checkbox-icon" />
    </span>
    <span class="checkbox-input-label">
      <slot />
    </span>
  </label>
</template>

<script lang="ts" setup>
import { CheckIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<{
  (eventName: "update:modelValue", value: boolean): void;
}>();

const checked = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});

const toggleChecked = () => {
  checked.value = !checked.value;
};
</script>

<style lang="scss">
.checkbox-input {
  @apply flex cursor-pointer text-left;
  &.checked {
    &:hover {
      .checkbox-container {
        @apply bg-gray-50 ring-indigo-700;
      }
    }
    .checkbox-container {
      @apply ring-2 ring-indigo-600;

      .checkbox-icon {
        @apply opacity-100;
      }
    }
  }
  &:not(.checked) {
    &:hover {
      .checkbox-container {
        @apply bg-gray-50 ring-gray-500;
      }
    }
  }
  &:has(:focus-visible) {
    @apply rounded-lg ring-2 ring-indigo-500 ring-offset-2;
  }

  .checkbox-container {
    @apply flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg p-1 ring-1 ring-gray-300 transition;

    .checkbox-icon {
      @apply h-full w-full text-indigo-600 opacity-0 transition;
    }
  }
  .checkbox-input-label {
    @apply ml-4 break-words;
  }
}
</style>
