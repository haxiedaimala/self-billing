<script setup lang="ts">
import Icon from '@/components/Icon.vue';

defineProps<{
  modelValue: Category[],
  selected: Category | [],
  type: '-' | '+'
}>();
const emits = defineEmits<{
  (e: 'update:selected', value: Category): void
}>();
const toggle = (value: Category) => {
  emits('update:selected', value);
};
</script>

<template>
  <ul class="category">
    <template v-if="modelValue">
      <li v-for="item in modelValue" :key="item.category">
        <div class="category-item"
             :class="{selected:selected.category===item.category}"
             @click="toggle(item)"
        >
          <Icon :name="item.iconName"/>
          <span>{{ item.category }}</span>
        </div>
      </li>
    </template>
    <li>
      <router-link :to="{name:'category',query:{type:type}}" class="category-item">
        <Icon name="setting"/>
        <span>设置</span>
      </router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

.category {
  @extend %category;
  height: 290px;
  padding: 0 1.5em;
  font-size: 14px;

  li {
    width: 25%;

    .category-item {
      width: 56px;
      height: 56px;

      &.selected {
        border-color: var(--color-selected);
      }

      .icon {
        width: 3em;
        height: 3em;
      }
    }
  }
}
</style>