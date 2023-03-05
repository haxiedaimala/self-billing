<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import {reactive} from 'vue';

const routeInfos = reactive([
  {name: 'details', text: '明细'},
  {name: 'billing', text: '账单'},
  {name: 'money', text: '记账'},
  {name: 'category', text: '类别'},
]);
</script>

<template>
  <Layout :routes="routeInfos">
    Billing vue
  </Layout>
</template>

<style lang="scss" scoped>
</style>