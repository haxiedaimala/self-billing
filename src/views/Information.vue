<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import {reactive} from 'vue';

const routeInfos = reactive([
  {name: 'details', text: '明细', iconName: 'details'},
  {name: 'statistics', text: '统计', iconName: 'details'}
]);
</script>

<template>
  <Layout :routes="routeInfos">
    <router-view/>
  </Layout>
</template>

<style lang="scss" scoped>
</style>