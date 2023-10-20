<template>
  <label
    class="mx-auto flex w-max items-center rounded-full px-4 py-2.5 text-sm font-medium shadow-sm ring-1 ring-inset ring-gray-300 transition"
    :class="
      disabled
        ? 'cursor-not-allowed bg-gray-100 opacity-60'
        : 'cursor-pointer bg-white focus-within:outline focus-within:outline-2 focus-within:outline-blue-700 hover:bg-gray-50'
    "
  >
    <input class="sr-only" type="file" name="File" :disabled="disabled" @change="emit('change', $event)" />
    <slot />
  </label>
</template>

<script lang="ts" setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (eventName: "change", value: Event): void;
}>();
</script>
