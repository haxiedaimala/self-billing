<script setup lang="ts">
</script>

<template>
  <div class="layout-wrapper">
    <div class="content">
      <slot name="content"/>
    </div>
    <nav class="nav">
      <slot name="nav"/>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  border: 2px solid red;
  height: 100vh;

  .content {
    flex: 1;
    overflow: auto;
  }

  .nav {
    border: 1px solid blue;
  }
}
</style>