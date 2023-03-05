<template>
  <router-view/>
</template>

<style lang="scss">
@import "~@/assets/styles/helper.scss";
@import "~@/assets/styles/reset.scss";

:root {
  --color: #ffce57;
  --color-selected: #d9576f;
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
