<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import {reactive} from 'vue';

const routeInfos = reactive([
  {name: 'details', text: '明细'},
  {name: 'statistics', text: '统计'}
]);
</script>

<template>
  <Layout :routes="routeInfos">
    Details vue
  </Layout>
</template>

<style lang="scss" scoped>
</style>