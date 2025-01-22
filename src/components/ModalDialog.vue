<script lang="ts" setup>
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { nextTick, ref, watch } from 'vue';
const props = defineProps<{
  isOpen: boolean;
}>();
const emit = defineEmits<{
  (e: 'close'): void;
}>();
const titleInput = ref<HTMLInputElement | undefined>(undefined);

const modalElement = ref<HTMLDivElement | null>(null);
const { activate, deactivate } = useFocusTrap(modalElement);
watch(
  () => props.isOpen,

  async (isOpen: boolean) => {
    await nextTick();
    if (isOpen) {
      activate();
      titleInput.value?.focus();
    } else {
      deactivate();
    }
  },
  { immediate: true },
);
</script>
<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-15 flex justify-center items-center"
    role="dialog"
    aria-modal="true"
    @keydown.esc="emit('close')"
    ref="modalElement"
  >
    <div class="bg-white p-5 rounded max-w-md w-full z-50">
      <h2 class="text-xl font-bold mb-3">Add New Card</h2>
      <input
        type="text"
        placeholder="Card Title"
        aria-label="Card Title"
        class="w-full p-2 mb-4 border rounded"
        ref="titleInput"
      />
      <textarea
        class="w-full p-2 mb-4 border rounded"
        placeholder="Description"
        aria-label="Card Description"
      ></textarea>
      <div class="flex justify-end gap-2">
        <button
          @click="emit('close')"
          class="bg-gray-300 hover:bg-gray-200 text-black px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          @click="emit('close')"
          class="bg-blue-300 hover:bg-blue-200 text-black px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
