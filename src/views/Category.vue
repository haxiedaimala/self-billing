<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import {computed, ref} from 'vue';
import TopNav from '@/components/TopNav.vue';
import {useStore} from 'vuex';
import {useRoute} from 'vue-router';

const store = useStore();
const route = useRoute();
const type = ref(route.query.type || '-');
const categoryList = computed<Category[]>(() => store.state.categoryList);
const isShowCategory = computed(() => categoryList.value.filter(item => item.isShow && item.type === type.value));
const unShowCategory = computed(() => categoryList.value.filter(item => !item.isShow && item.type === type.value));
const toggleIsShow = (value: Category) => {
  value.isShow = !value.isShow;
  store.commit('updateCategory', value);
};
</script>

<template>
  <TopNav to-page="money" v-model="type">目前共{{ isShowCategory.length }}个类别</TopNav>

  <ul class="item item-first">
    <li v-for="item in isShowCategory" :key="item.category">
      <span class="category" @click="toggleIsShow(item)">
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
      <li v-for="item in unShowCategory" :key="item.category" @click="toggleIsShow(item)">
      <span class="category">
        <Icon :name="item.iconName"/>
        <Icon name="add" class="add"/>
      </span>
        <span>{{ item.category }}</span>
      </li>
    </ul>
  </template>

  <router-link :to="{name:'setCategory',query:{type:type}}" class="setCategory">
    <span>+ 自定义分类</span>
  </router-link>
</template>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

.nav {
  display: flex;
  font-size: 18px;
  align-items: center;
  padding: 1.5em 2em 0.8em;

  .title {
    font-weight: bold;
    font-size: 20px;
  }
}

.item {
  li {
    display: flex;
    align-items: center;
    padding: 0.8em 2em;
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
    margin-top: 90px;
  }
}

.setCategory {
  @extend %setCategory;
}
</style>