<script setup lang="ts">
import Icon from '@/components/Icon.vue';

defineProps<{
  routes: { name: string, text: string, iconName: string }[]
}>();
</script>

<template>
  <div class="nav">
    <template v-for="route in routes" :key="route.name">
      <router-link :to="{name:`${route.name}`}" class="item">
        <Icon :name="route.iconName"/>
        {{ route.text }}
      </router-link>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, .2);
  font-size: 16px;

  > .item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: .25em 0;

    > .icon {
      width: 1.5em;
      height: 1.5em;
    }
  }
}
</style>