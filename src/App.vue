<script setup lang="ts">
//标签类别
import {provide, ref} from 'vue';

const categoryList = ref<Category[]>([
  {category: '餐饮', iconName: 'food', isShow: true, type: '-'},
  {category: '购物', iconName: 'shopping', isShow: true, type: '-'},
  {category: '交通', iconName: 'car', isShow: true, type: '-'},
  {category: '服饰', iconName: 'cloth', isShow: true, type: '+'},
  {category: '通讯', iconName: 'phone', isShow: false, type: '-'},
  {category: '交通', iconName: 'car', isShow: true, type: '+'},
  {category: '服饰', iconName: 'cloth', isShow: true, type: '-'},
  {category: '通讯', iconName: 'phone', isShow: false, type: '+'}
]);
provide('categoryList', categoryList);
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
