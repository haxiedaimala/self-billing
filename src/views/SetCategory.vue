<script setup lang="ts">
import {useRouter} from 'vue-router';
import Icon from '@/components/Icon.vue';
import {ref} from 'vue';

const type = ref('-');
const router = useRouter();
const goBack = () => router.back();
const toggle = (value: string) => type.value = value;
</script>

<template>
  <Teleport to="body">
    <div class="nav top">
      <Icon name="left" class="left" @click="goBack"/>
      <span class="title">设置自定义分类</span>
      <div class="type">
        <span :class="{selected:type==='-'}" @click="toggle('-')">支出</span>
        <span>/</span>
        <span :class="{selected:type==='+'}" @click="toggle('+')">收入</span>
      </div>
    </div>
  </Teleport>
  <div class="content">
    <span>新建分类名称</span>
    <div class="edit">
      <input type="text" placeholder="限5个汉字,不为空或重复..." maxlength="5">
      <Icon name="pen"/>
    </div>
  </div>
  <div class="nav">
    <span class="title">更多类别</span>
  </div>
  <ul class="category">
    <li>
      <div class="category-item">
        <Icon name="food"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="shopping"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="car"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="food"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="shopping"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="car"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="food"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="shopping"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="car"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="food"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="shopping"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="car"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="shopping"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="car"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="food"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="shopping"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="car"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="food"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="shopping"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="car"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="food"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="shopping"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="car"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="food"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="shopping"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="car"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="food"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="shopping"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="car"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="food"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="shopping"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="car"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="food"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="shopping"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="car"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="food"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="shopping"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="car"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="food"/>
      </div>
    </li>


    <li>
      <div class="category-item">
        <Icon name="food"/>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="car"/>
      </div>
    </li>
  </ul>
  <router-link :to="{name:'setCategory'}" class="setCategory">
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

  .left {
    width: 1.5em;
    height: 1.5em;
    margin-left: -1.5em;
    margin-right: 0.3em;
  }

  .title {
    font-weight: bold;
    font-size: 20px;
  }

  .type {
    color: #878785;
    margin-left: auto;

    span:not(:first-child) {
      margin-left: 5px;
    }

    .selected {
      font-weight: bold;
      color: #333;
    }
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
  padding: 0.5em 2em;
  overflow: auto;
  height: 260px;

  li {
    width: 20%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 8px;

    .category-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 3em;
      height: 3em;
      border: 1px solid var(--color-border);
      border-radius: 50%;
      padding: 5px;
      cursor: pointer;
      background-color: var(--color-category-bg);

      &.selected {
        border-color: var(--color-selected);
      }

      .icon {
        width: 2em;
        height: 2em;
      }
    }
  }
}

.setCategory {
  @extend %setCategory;
}
</style>