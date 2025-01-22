<template>
  <div>
    <h1>Item List</h1>
    <ChildCom :items="items">
      <template #item="{ item }">
        <strong>{{ item.name }}</strong>
      </template>
    </ChildCom>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { Item } from './ChildCom.vue';
import ChildCom from './ChildCom.vue';
const items = ref<Item[]>([
  { id: 1, name: 'item 1' },
  { id: 2, name: 'item 2' },
  { id: 3, name: 'item 3' },
  { id: 4, name: 'item 4' },
  { id: 5, name: 'item 5' },
]);
</script>
