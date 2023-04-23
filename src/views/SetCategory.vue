<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import TopNav from '@/components/TopNav.vue';
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import getIconName from '@/lib/getIconName';
import {createCategoryError} from '@/lib/storeErrorInfo';
import {useStore} from 'vuex';
import openMessage from '@/lib/openMessage';

const store = useStore();
const route = useRoute();
const router = useRouter();
const svgIcon = getIconName;
const type = ref(route.query.type || '-');
const inputItem = ref<HTMLInputElement>();
const selectedIcon = ref(svgIcon[0]);
const toggle = (value: string) => selectedIcon.value = value;
const save = () => {
  const category = inputItem.value?.value;
  if (category?.length === 0) return openMessage({message: '类别名称不为空', type: 'error'});
  let obj = {category: category, iconName: selectedIcon.value, type: type.value};
  store.commit('createCategory', obj);
  const msg = store.state.createCategoryError;
  if (msg !== null) openMessage({message: createCategoryError[msg.message], type: 'error'});
  if (msg === null) {
    openMessage({message: createCategoryError[msg], autoCloseDelay: 1});
    router.push({
      name: 'category',
      query: {
        type: type.value
      }
    });
  }
};

const wrapper = ref<HTMLDivElement>();
onMounted(() => {
  wrapper.value!.style.height = (document.documentElement.clientHeight || document.body.clientHeight) + 'px';
});
</script>

<template>
  <div class="wrapper" ref="wrapper">
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
  </div>
</template>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

.wrapper {
  display: flex;
  flex-direction: column;

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
    margin: 0.8em 2em;
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
    flex: 1;

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
}
</style>