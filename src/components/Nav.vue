<script setup lang="ts">
let importAll = (requireContent: __WebpackModuleApi.RequireContext) => requireContent.keys().forEach(requireContent);
try {
  importAll(require.context('../assets/icons', true, /\.svg$/));
} catch (error) {
  console.log(error);
}
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