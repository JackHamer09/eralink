<template>
  <div class="isolate">
    <div ref="circlesEl" class="viewport-height"></div>
    <div class="circles-container">
      <div class="relative isolate">
        <div
          class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400/70 to-purple-500/70 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style="
              clip-path: polygon(
                74.1% 44.1%,
                100% 61.6%,
                97.5% 26.9%,
                85.5% 0.1%,
                80.7% 2%,
                72.5% 32.5%,
                60.2% 62.4%,
                52.4% 68.1%,
                47.5% 58.3%,
                45.2% 34.5%,
                27.5% 76.7%,
                0.1% 64.9%,
                17.9% 100%,
                27.6% 76.8%,
                76.1% 97.7%,
                74.1% 44.1%
              );
            "
          />
        </div>
        <div
          class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-600/70 to-blue-600/80 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style="
              clip-path: polygon(
                74.1% 44.1%,
                100% 61.6%,
                97.5% 26.9%,
                85.5% 0.1%,
                80.7% 2%,
                72.5% 32.5%,
                60.2% 62.4%,
                52.4% 68.1%,
                47.5% 58.3%,
                45.2% 34.5%,
                27.5% 76.7%,
                0.1% 64.9%,
                17.9% 100%,
                27.6% 76.8%,
                76.1% 97.7%,
                74.1% 44.1%
              );
            "
          />
        </div>
      </div>
    </div>
    <div ref="heroEl" class="hero-container" :style="{ opacity, transform: `scale(${scale})` }">
      <div class="w-full text-center">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Link to Eternity</h1>
        <p class="mx-auto mt-6 max-w-xl text-lg text-gray-600 sm:leading-8">
          Shorten and immortalize your links, text, and files on-chain with
          <a href="https://zksync.io" target="_blank" class="font-medium text-blue-700 hover:underline">zkSync Era</a>,
          making them accessible forever
        </p>
        <form class="search-form" role="search" @submit.prevent="emit('submit')">
          <label class="input-container" :class="{ disabled }" for="search-input">
            <span class="relative block h-max w-full">
              <textarea
                id="search-input"
                ref="textarea"
                v-model.trim="input"
                autofocus
                placeholder="Enter URL or text to save"
                rows="2"
                minlength="3"
                maxlength="1000"
                required
                :disabled="disabled"
                class="search-textarea"
              />
            </span>
          </label>
          <CommonButtonRound :icon="PlusIcon" :loading="disabled" title="Create link" type="submit" />
        </form>
        <div class="filters-container">
          <div class="py-4 text-sm text-gray-400">or</div>
          <CommonInputFile :disabled="disabled" @change="fileUpload">
            Upload a file
            <DocumentPlusIcon class="-mr-1 ml-1.5 h-5 w-5" aria-hidden="true" />
          </CommonInputFile>
        </div>
      </div>
      <a href="#links-history" class="history-button">
        <span>Your links history</span>
        <ArrowDownIcon class="history-button-icon" />
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDownIcon, DocumentPlusIcon, PlusIcon } from "@heroicons/vue/24/outline";
import { useTextareaAutosize, useWindowScroll, useElementSize } from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (eventName: "update:modelValue", value: string): void;
  (eventName: "upload", file: File): void;
  (eventName: "submit"): void;
}>();

const circlesEl = ref<HTMLElement | null>(null);
const { height: viewportHeight } = useElementSize(circlesEl);
const heroEl = ref<HTMLElement | null>(null);
const { height: heroHeight } = useElementSize(heroEl);
const { y: windowScrollY } = useWindowScroll();

const effectiveScroll = computed(() => {
  if (windowScrollY.value <= 0) return 0;
  return Math.max(0, windowScrollY.value + viewportHeight.value - Math.max(heroHeight.value, viewportHeight.value));
});

const scrollMultiplier = computed(() => (heroHeight.value * 100) / 80);

const opacity = computed(() => {
  if (effectiveScroll.value === 0) return 1;
  if (scrollMultiplier.value === 0) return 1;
  return 1 - Math.max(0, Math.min(1, effectiveScroll.value / scrollMultiplier.value));
});

const scale = computed(() => {
  if (effectiveScroll.value === 0) return 1;
  if (scrollMultiplier.value === 0) return 1;
  return 1 - Math.max(0, Math.min(1, effectiveScroll.value / scrollMultiplier.value)) * 0.1;
});

const { textarea, input } = useTextareaAutosize({ input: props.modelValue });
watch(
  () => props.modelValue,
  (value) => {
    input.value = value;
  }
);
watch(input, (value) => {
  emit("update:modelValue", value);
});

const fileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;
  emit("upload", input.files[0]);
};
</script>

<style lang="scss" scoped>
.circles-container,
.hero-container {
  @apply relative w-full;
  min-height: calc(100vh - var(--header-height));
  min-height: calc(100dvh - var(--header-height));
}
.circles-container {
  @apply pointer-events-none absolute left-0 top-[var(--header-height)];
}
.viewport-height {
  @apply pointer-events-none absolute top-0 h-screen;
  height: 100dvh;
}
.hero-container {
  @apply sticky top-0 mx-auto flex w-full max-w-2xl pb-20 pt-[calc(30vh_-_var(--header-height))];

  .search-form {
    @apply mt-8 flex items-center gap-2 sm:gap-4;

    .input-container {
      @apply h-max w-full cursor-text overflow-hidden rounded-3xl border-2 border-gray-300 bg-white/50 px-3 py-4 transition-colors sm:px-6;
      &:focus-within {
        @apply border-blue-700;
      }
      &:not(.disabled) {
        @apply hover:border-gray-400;
      }
      &.disabled {
        @apply cursor-not-allowed bg-gray-100;
      }

      .search-textarea {
        @apply block w-full resize-none border-none bg-transparent outline-none;
        @apply text-left text-base font-medium text-black disabled:cursor-not-allowed sm:text-xl;
      }
    }
    .search-submit-button {
      @apply flex aspect-square h-10 rounded-full bg-blue-700 p-2.5 text-white transition-colors hover:bg-blue-800 sm:h-12 sm:p-3;

      .search-label {
        @apply sr-only;
      }
      .search-label-icon {
        @apply -mr-1 aspect-square h-full;
      }
    }
  }
  .history-button {
    @apply absolute bottom-0 left-0 right-0 mx-auto flex w-max items-center p-4 pb-7 text-sm font-medium text-gray-400 transition hover:text-gray-500;

    .history-button-icon {
      @apply ml-1.5 h-4 w-4;
    }
  }
}
</style>
