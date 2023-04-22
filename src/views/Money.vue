<script setup lang="ts">
import Types from '@/components/Types.vue';
import CategoryItem from '@/components/CategoryItem.vue';
import NumberPanel from '@/components/NumberPanel.vue';
import {computed, onMounted, ref, watchPostEffect} from 'vue';
import {useStore} from 'vuex';
import {createRecordError} from '@/lib/storeErrorInfo';
import openMessage from '@/lib/openMessage';

const type = ref('-');
const store = useStore();
const categoryList = computed<Category[]>(() => store.state.categoryList);
const dateSource = computed<Category[]>(() => {
  return categoryList.value.filter(item => item.isShow && item.type === type.value);
});
const selectCategory = ref<Category>(dateSource.value[0] || []);
watchPostEffect(() => {
  selectCategory.value = dateSource.value[0];
});
const note = ref('');
const account = ref('0.00');
const date = ref(new Date().toISOString());

const submitRecord = (value: { note: string, account: number, createAt: string }) => {
  if (selectCategory.value === undefined) return openMessage({message: '请选择标签', type: 'error'});
  Object.assign(value, {category: selectCategory.value.category, type: type.value});
  store.commit('createRecord', value);
  openMessage({message: createRecordError[store.state.createRecordError]});
};

const wrapper = ref<HTMLDivElement>();
onMounted(() => {
  wrapper.value!.style.height = (document.documentElement.clientHeight || document.body.clientHeight) + 'px';
});
</script>

<template>
  <div class="wrapper" ref="wrapper">
    <Types v-model="type"/>
    <CategoryItem :type="type" v-model="dateSource" v-model:selected="selectCategory"/>
    <NumberPanel :note="note" :account="account" :date="date" @submit="submitRecord"/>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
</style>