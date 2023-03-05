<script setup lang="ts">
import Layout from '@/components/Layout.vue';
</script>

<template>
  <Layout>
    <template #content>
      Billing vue
    </template>
    <template #nav>
      <router-link :to="{name:'details'}">明细</router-link>
      |
      <router-link :to="{name:'billing'}">账单</router-link>
      |
      <router-link :to="{name:'money'}">记账</router-link>
      |
      <router-link :to="{name:'category'}">类别</router-link>
    </template>
  </Layout>
</template>

<style lang="scss" scoped>
</style>