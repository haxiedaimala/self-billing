<script setup lang="ts">
import Types from '@/components/Types.vue';
import CategoryItem from '@/components/CategoryItem.vue';
import NumberPanel from '@/components/NumberPanel.vue';
</script>

<template>
  <div class="wrapper">
    <Types/>
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