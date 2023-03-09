<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import TopNav from '@/components/TopNav.vue';
import {ref} from 'vue';
import store from '@/store';
import {useRoute, useRouter} from 'vue-router';
import getIconName from '@/lib/getIconName';

const route = useRoute();
const router = useRouter();
const svgIcon = getIconName;
const type = ref(route.query.type || '-');
const inputItem = ref<HTMLInputElement>();
const selectedIcon = ref(svgIcon[0]);
const toggle = (value: string) => {
  selectedIcon.value = value;
};
const save = () => {
  const category = inputItem.value?.value;
  if (category?.length === 0) return window.alert('类别名称不为空');
  let obj = {category: category, iconName: selectedIcon.value, type: type.value};
  store.commit('createCategory', obj);
  router.push({
    name: 'category',
    query: {
      type: type.value
    }
  });
};
</script>

<template>
  <TopNav v-model="type">设置自定义分类</TopNav>
  <div class="content">
    <span>新建分类名称</span>
    <div class="edit">
      <input type="text" placeholder="限5个汉字,不为空或重复..." maxlength="5" ref="inputItem">
      <Icon name="pen"/>
    </div>
  </div>
  <div class="nav">
    <span class="title">更多类别</span>
  </div>
  <ul class="category">
    <li v-for="item in svgIcon" :key="item">
      <div class="category-item" :class="{selected:item===selectedIcon}" @click="toggle(item)">
        <Icon :name="item"/>
      </div>
    </li>
  </ul>
  <router-link :to="{name:'setCategory'}" class="setCategory" @click="save">
    <span>保存</span>
  </router-link>
</template>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

.nav {
  display: flex;
  font-size: 18px;
  align-items: center;
  padding: 0.8em 2em;

  .title {
    font-weight: bold;
    font-size: 20px;
  }
}

.content {
  margin: 90px 2em 0.8em;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 1em;

  span {
    font-weight: bold;
    font-size: 18px;
  }

  .edit {
    margin-top: 0.5em;
    display: flex;
    align-items: center;

    input {
      flex: 1;
      border: none;
      background-color: transparent;
    }

    .icon {
      width: 2em;
      height: 2em;
      margin-left: auto;
    }
  }
}

.category {
  @extend %category;
  padding: 0.5em 2em;
  height: 260px;

  li {
    width: 20%;

    .category-item {
      width: 3em;
      height: 3em;
      background-color: var(--color-category-bg);

      &.selected {
        border-color: var(--color-selected);
      }
    }
  }
}

.setCategory {
  @extend %setCategory;
}
</style>