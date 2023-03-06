<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import {computed, inject, ref, Ref} from 'vue';

const type = ref('+');
const categoryList = inject<Ref<Category[]>>('categoryList')!;
const isShowCategory = computed(() => {
  return categoryList.value.filter(item => item.isShow && item.type === type.value);
});
const unShowCategory = computed(() => {
  return categoryList.value.filter(item => !item.isShow && item.type === type.value);
});
const toggle = (value: string) => type.value = value;
</script>

<template>
  <Teleport to="body">
    <div class="nav top">
      <span class="title">目前共{{ isShowCategory.length }}个类别</span>
      <div class="type">
        <span :class="{selected:type==='-'}" @click="toggle('-')">支出</span>
        <span>/</span>
        <span :class="{selected:type==='+'}" @click="toggle('+')">收入</span>
      </div>
    </div>
  </Teleport>

  <ul class="item item-first">
    <li v-for="item in isShowCategory" :key="item.category">
      <span class="category">
        <Icon :name="item.iconName"/>
        <Icon name="delete" class="delete"/>
      </span>
      <span>{{ item.category }}</span>
      <Icon name="menu" class="menu"/>
    </li>
  </ul>
  <template v-if="unShowCategory.length>0">
    <div class="nav">
      <span class="title">更多类别</span>
    </div>
    <ul class="item">
      <li v-for="item in unShowCategory" :key="item.category">
      <span class="category">
        <Icon :name="item.iconName"/>
        <Icon name="add" class="add"/>
      </span>
        <span>{{ item.category }}</span>
      </li>
    </ul>
  </template>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  font-size: 18px;
  align-items: center;
  justify-content: space-between;
  padding: 0.8em 1.2em;

  .title {
    font-weight: bold;
    font-size: 20px;
  }

  &.top {
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    padding-top: 2em;

    .title {
      font-size: 24px;
    }
  }

  .type {
    color: #878785;

    span:not(:first-child) {
      margin-left: 5px;
    }

    .selected {
      font-weight: bold;
      color: #333;
    }
  }
}

.item {
  li {
    display: flex;
    align-items: center;
    padding: 0.8em 1.2em;
    width: 100%;

    .category {
      border: 1px solid var(--color-border);
      border-radius: 50%;
      background-color: var(--color-category-bg);
      width: 3em;
      height: 3em;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 1em;
      position: relative;

      .icon.add,
      .icon.delete {
        position: absolute;
        width: 1.5em;
        height: 1.5em;
        top: 0;
        right: 0;
        transform: translate(40%, -50%);
      }

      .icon {
        width: 2em;
        height: 2em;
      }

    }

    .menu {
      margin-left: auto;
    }
  }

  &.item-first {
    margin-top: 100px;
  }
}
</style>