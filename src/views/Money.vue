<script setup lang="ts">
import Types from '@/components/Types.vue';
import CategoryItem from '@/components/CategoryItem.vue';
import NumberPanel from '@/components/NumberPanel.vue';
import {computed, inject, Ref, ref} from 'vue';

//支付类型
const type = ref('-');
//标签类别
const categoryList = inject<Ref<Category[]>>('categoryList')!;
const dateSource = computed<Category[]>(() => {
  return categoryList.value.filter(item => item.isShow);
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