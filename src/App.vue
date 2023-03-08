<script setup lang="ts">
</script>

<template>
  <router-view/>
</template>

<style lang="scss">
@import "~@/assets/styles/helper.scss";
@import "~@/assets/styles/reset.scss";

:root {
  --color-bg: #ffce57;
  --color-selected: #d9576f;
  --color-border: #0d0d0d;
  --color-category-bg: #fae3eb;
  --color-unselected: #878785;
}

#app {
  font-size: 16px;
  line-height: 1.5;
  font-family: $font-hei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}

</style>
