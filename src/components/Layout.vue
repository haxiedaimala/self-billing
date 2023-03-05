<script setup lang="ts">
import Nav from '@/components/Nav.vue';

defineProps<{
  routes: { name: string, text: string, iconName: string }[]
}>();
</script>

<template>
  <div class="layout-wrapper">
    <div class="content">
      <slot/>
    </div>
    <Nav :routes="routes"/>
  </div>
</template>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .content {
    flex: 1;
    overflow: auto;
  }
}
</style>