<script setup lang="ts">
import Types from '@/components/Types.vue';
import CategoryItem from '@/components/CategoryItem.vue';
import NumberPanel from '@/components/NumberPanel.vue';
import {ref} from 'vue';

//支付类型
const type = ref('-');
//标签类别
const dateSource = ref([
  {category: '餐饮', iconName: 'food'},
  {category: '购物', iconName: 'shopping'},
  {category: '交通', iconName: 'car'},
  {category: '服饰', iconName: 'cloth'},
  {category: '通讯', iconName: 'phone'}
]);
const selectCategory = ref({category: '餐饮', iconName: 'food'});
</script>

<template>
  <div class="wrapper">
    {{ selectCategory }}
    <Types v-model="type"/>
    <CategoryItem v-model="dateSource" v-model:selected="selectCategory"/>
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