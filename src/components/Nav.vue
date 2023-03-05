<script setup lang="ts">
defineProps<{
  routes: { name: string, text: string }[]
}>();
</script>

<template>
  <div class="nav">
    <template v-for="route in routes" :key="route.name">
      <router-link :to="{name:`${route.name}`}">{{ route.text }}</router-link>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  border: 1px solid red;
}
</style>