<script setup lang="ts">
import Nav from '@/components/Nav.vue';
import {onMounted, ref} from 'vue';

defineProps<{
  routes: { name: string, text: string, iconName: string }[]
}>();
const layout = ref<HTMLDivElement>();
onMounted(() => {
  layout.value!.style.height = (document.documentElement.clientHeight || document.body.clientHeight) + 'px';
});
</script>

<template>
  <div class="layout-wrapper" ref="layout">
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

  .content {
    flex: 1;
    overflow: auto;
  }
}
</style>