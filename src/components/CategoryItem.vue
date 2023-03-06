<script setup lang="ts">
import Icon from '@/components/Icon.vue';

defineProps<{
  modelValue?: Category[],
  selected: Category
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
    <li class="setting">
      <div class="category-item">
        <Icon name="food"/>
        <span>设置</span>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.category {
  height: 290px;
  padding: 0 1.5em;
  font-size: 14px;
  overflow: auto;

  li {
    width: 25%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 8px;

    .category-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 56px;
      height: 56px;
      border: 1px solid var(--color-border);
      border-radius: 50%;
      padding: 5px;
      cursor: pointer;

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