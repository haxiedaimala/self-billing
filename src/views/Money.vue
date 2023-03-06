<script setup lang="ts">
import Types from '@/components/Types.vue';
import CategoryItem from '@/components/CategoryItem.vue';
import NumberPanel from '@/components/NumberPanel.vue';
import {ref} from 'vue';

const type = ref('-');
</script>

<template>
  <div class="wrapper">
    <Types v-model="type"/>
    <CategoryItem/>
    <NumberPanel/>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>