<script setup lang="ts">
import Types from '@/components/Types.vue';
import CategoryItem from '@/components/CategoryItem.vue';
import NumberPanel from '@/components/NumberPanel.vue';
import {computed, ref} from 'vue';

//支付类型
const type = ref('-');
//标签类别
const CategoryList = ref([
  {category: '餐饮', iconName: 'food', isShow: true},
  {category: '购物', iconName: 'shopping', isShow: true},
  {category: '交通', iconName: 'car', isShow: true},
  {category: '服饰', iconName: 'cloth', isShow: true},
  {category: '通讯', iconName: 'phone', isShow: true},
  {category: '交通', iconName: 'car', isShow: true},
  {category: '服饰', iconName: 'cloth', isShow: true},
  {category: '通讯', iconName: 'phone', isShow: true}
]);
const dateSource = computed<Category[]>(() => {
  return CategoryList.value.filter(item => item.isShow);
});
const selectCategory = ref<Category>({category: '餐饮', iconName: 'food', isShow: true});
</script>

<template>
  <div class="wrapper">
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