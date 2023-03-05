<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import {reactive} from 'vue';

const routeInfos = reactive([
  {name: 'information', text: '明细', iconName: 'details'},
  {name: 'billing', text: '账单', iconName: 'billing'},
  {name: 'money', text: '记账', iconName: 'money'},
  {name: 'category', text: '类别', iconName: 'category'},
]);
</script>

<template>
  <Layout :routes="routeInfos">
    Billing vue
  </Layout>
</template>

<style lang="scss" scoped>
</style>