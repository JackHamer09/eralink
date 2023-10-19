<template>
  <span
    class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset"
    :class="badgeClasses"
  >
    <slot />
  </span>
</template>

<script lang="ts" setup>
const props = defineProps({
  variant: {
    type: String as PropType<"gray" | "red" | "yellow" | "green" | "blue" | "indigo" | "purple" | "pink">,
    default: "gray",
  },
});

const badgeClasses = computed(() => {
  switch (props.variant) {
    case "pink":
      return "bg-pink-50 text-pink-700 ring-pink-700/10";
    case "purple":
      return "bg-purple-50 text-purple-700 ring-purple-700/10";
    case "indigo":
      return "bg-indigo-50 text-indigo-700 ring-indigo-700/10";
    case "blue":
      return "bg-blue-50 text-blue-700 ring-blue-700/10";
    case "green":
      return "bg-green-50 text-green-700 ring-green-600/20";
    case "yellow":
      return "bg-yellow-50 text-yellow-800 ring-yellow-600/20";
    case "red":
      return "bg-red-50 text-red-700 ring-red-600/10";
    case "gray":
    default:
      return "bg-gray-50 text-gray-600 ring-gray-500/10";
  }
});
</script>
