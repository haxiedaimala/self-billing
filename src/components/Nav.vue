<script setup lang="ts">
import Icon from '@/components/Icon.vue';

defineProps<{
  routes: { name: string, text: string, iconName: string }[]
}>();
</script>

<template>
  <div class="nav">
    <template v-for="route in routes" :key="route.name">
      <router-link :to="{name:`${route.name}`}">
        <Icon :name="route.name"/>
        {{ route.text }}
      </router-link>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  border: 1px solid red;
}


</style>