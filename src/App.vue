<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import Draggable from 'vuedraggable';
import ModalDialog from './components/ModalDialog.vue';
import type { Card, List } from './types/types';

const isModalOpen = ref<boolean>(false);
const editingCard = ref<Card | null>(null);
const editingListIndex = ref<number | null>(null);
const modalMode = computed<'add' | 'edit'>(() => (editingCard.value === null ? 'add' : 'edit'));
const openModal = (listIndex: number, card?: Card) => {
  editingListIndex.value = listIndex;
  editingCard.value = card ?? null;
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
  editingListIndex.value = null;
  editingCard.value = null;
};
const saveCard = (card: Card) => {
  if (editingListIndex.value == null) return;
  if (modalMode.value === 'add') {
    const newId: number =
      Math.max(...lists.flatMap((list) => list.cards.map((card) => card.id))) + 1;
    lists[editingListIndex.value].cards.push({ ...card, id: newId });
  } else {
    const cardIndex = lists[editingListIndex.value].cards.findIndex((c: Card) => c.id === card.id);
    if (cardIndex !== -1) {
      lists[editingListIndex.value].cards[cardIndex] = card;
    }
  }
  closeModal();
};
const lists = reactive<List[]>([
  {
    id: 1,
    title: 'To Do',
    cards: [
      { id: 1, title: 'Task 1', description: 'Description for Task 1' },
      { id: 2, title: 'Task 2', description: 'Description for Task 2' },
    ],
  },
  {
    id: 2,
    title: 'In Progress',
    cards: [
      { id: 3, title: 'Task 3', description: 'Description for Task 3' },
      { id: 4, title: 'Task 4', description: 'Description for Task 4' },
    ],
  },
  {
    id: 3,
    title: 'Done',
    cards: [{ id: 5, title: 'Task 5', description: 'Description for Task 5' }],
  },
]);
</script>

<template>
  <main class="p-5 font-sans">
    <div class="flex gap-5 py-5 overflow-x-auto">
      <div
        class="flex flex-col bg-gray-100 p-3 rounded-lg min-w-[250px]"
        v-for="list in lists"
        :key="list.id"
      >
        <h2 class="font-medium mb-2">{{ list.title }}</h2>
        <Draggable v-model="list.cards" group="cards" :item-key="list.id.toString()">
          <template #item="{ element }">
            <div class="bg-white p-2 my-2 rounded shadow cursor-pointer">
              <span class="text-sm font-medium">{{ element.title }}</span>
              <p class="text-xs text-gray-400">{{ element.description }}</p>
            </div>
          </template>
        </Draggable>

        <button
          @click="openModal(list.id)"
          class="w-full bg-transparent hover:bg-white text-gray-500 p-2 text-left mt-2 text-sm font-medium rounded"
        >
          +Add Card
        </button>
      </div>
    </div>
    <ModalDialog :is-open="isModalOpen" @close="closeModal"></ModalDialog>
  </main>
</template>

<script lang="ts" setup></script>
