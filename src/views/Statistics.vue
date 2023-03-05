<script setup lang="ts">
import Layout from '@/components/Layout.vue';
</script>

<template>
  <Layout>
    <template #content>
      Statistics vue
    </template>
    <template #nav>
      <router-link :to="{name:'details'}">明细</router-link>
      |
      <router-link :to="{name:'statistics'}">统计</router-link>
    </template>
  </Layout>
</template>

<style lang="scss" scoped>
</style>