<script setup lang="ts">
import a from '@/assets/icons/billing.svg';
import b from '@/assets/icons/category.svg';
import c from '@/assets/icons/details.svg';
import d from '@/assets/icons/money.svg';

console.log(a, b, c, d);
defineProps<{
  routes: { name: string, text: string, iconName: string }[]
}>();
</script>

<template>
  <div class="nav">
    <template v-for="route in routes" :key="route.name">
      <router-link :to="{name:`${route.name}`}">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="`#${route.iconName}`"></use>
        </svg>
        {{ route.text }}
      </router-link>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  border: 1px solid red;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>