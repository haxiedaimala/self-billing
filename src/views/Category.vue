<script setup lang="ts">
import Icon from '@/components/Icon.vue';
</script>

<template>
  <div class="nav top">
    <span class="title">目前共xxx个类别</span>
    <div class="type">
      <span class="selected">支出</span>
      <span>/</span>
      <span>收入</span>
    </div>
  </div>
  <ul class="item">
    <li>
      <span class="category">
        <Icon name="food"/>
      </span>
      <span>餐饮</span>
      <Icon name="menu" class="menu"/>
    </li>
    <li>
      <span class="category">
        <Icon name="food"/>
      </span>
      <span>餐饮</span>
      <Icon name="menu" class="menu"/>
    </li>
    <li>
      <span class="category">
        <Icon name="food"/>
      </span>
      <span>餐饮</span>
      <Icon name="menu" class="menu"/>
    </li>
    <li>
      <span class="category">
        <Icon name="food"/>
      </span>
      <span>餐饮</span>
      <Icon name="menu" class="menu"/>
    </li>
    <li>
      <span class="category">
        <Icon name="food"/>
      </span>
      <span>餐饮</span>
      <Icon name="menu" class="menu"/>
    </li>
    <li>
      <span class="category">
        <Icon name="food"/>
      </span>
      <span>餐饮</span>
      <Icon name="menu" class="menu"/>
    </li>
    <li>
      <span class="category">
        <Icon name="food"/>
      </span>
      <span>餐饮</span>
      <Icon name="menu" class="menu"/>
    </li>
    <li>
      <span class="category">
        <Icon name="food"/>
      </span>
      <span>餐饮</span>
      <Icon name="menu" class="menu"/>
    </li>
    <li>
      <span class="category">
        <Icon name="food"/>
      </span>
      <span>餐饮</span>
      <Icon name="menu" class="menu"/>
    </li>
    <li>
      <span class="category">
        <Icon name="food"/>
      </span>
      <span>餐饮</span>
      <Icon name="menu" class="menu"/>
    </li>
  </ul>
  <div class="nav">
    <span class="title">更多类别</span>
  </div>
  <ul class="item">
    <li>
      <span class="category">
        <Icon name="food"/>
      </span>
      <span>餐饮</span>
      <Icon name="menu" class="menu"/>
    </li>
    <li>
      <span class="category">
        <Icon name="food"/>
      </span>
      <span>餐饮</span>
      <Icon name="menu" class="menu"/>
    </li>
  </ul>
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

      .icon {
        width: 2em;
        height: 2em;
      }
    }

    .menu {
      margin-left: auto;
    }
  }
}
</style>