<template>
  <CommonModalGeneric :open="modalShow" @close="close" @after-leave="emit('update:error', undefined)">
    <template #default>
      <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <ExclamationCircleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
      </div>
      <div class="mt-3 text-center sm:mt-5">
        <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
          Error creating new link
        </DialogTitle>
        <div class="mt-2">
          <p class="px-3 text-sm text-gray-500">
            {{ error?.message }}
          </p>
        </div>
      </div>
    </template>
  </CommonModalGeneric>
</template>

<script lang="ts" setup>
import { DialogTitle } from "@headlessui/vue";
import { ExclamationCircleIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  error: {
    type: Error,
  },
});

const emit = defineEmits<{
  (eventName: "update:error", value: string | undefined): void;
}>();

const modalShow = ref(!!props.error);
watch(
  () => props.error,
  (error) => {
    modalShow.value = !!error;
  }
);
const close = () => {
  modalShow.value = false;
};
</script>
