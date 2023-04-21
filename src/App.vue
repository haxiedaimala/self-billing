<script setup lang="ts">
import {onBeforeMount, ref} from 'vue';

const width = ref(document.documentElement.clientWidth || document.body.clientWidth);
const isShow = ref(width.value > 500);
onBeforeMount(() => {
  window.onresize = () => {
    width.value = document.documentElement.clientWidth || document.body.clientWidth;
    isShow.value = width.value > 500;
  };
});

function onClose() {
  isShow.value = !isShow.value;
}
</script>

<template>
  <router-view/>
  <div class="preview" v-show="isShow">
    <img src="./assets/ercode.png" alt="手机预览" title="扫描二维码">
    <span class="close" @click="onClose"/>
  </div>
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
  -webkit-tap-highlight-color: transparent;
}

.preview {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;

  img {
    position: relative;
    width: 100%;
  }

  .close {
    position: absolute;
    top: -0.8em;
    right: -0.8em;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, .1);
    cursor: pointer;

    &::after,
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      background-color: grey;
      width: 1em;
      height: 1px;
    }

    &::before {
      transform: translate(-50%, -50%) rotate(135deg);
    }
  }
}
</style>
