<script setup lang="ts">
import Icon from '@/components/Icon.vue';
</script>

<template>
  <ul class="category">
    <li>
      <div class="category-item selected">
        <Icon name="food"/>
        <span>餐饮</span>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="shopping"/>
        <span>购物</span>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="car"/>
        <span>交通</span>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="cloth"/>
        <span>服饰</span>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="phone"/>
        <span>通讯</span>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="food"/>
        <span>餐饮</span>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="shopping"/>
        <span>购物</span>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="car"/>
        <span>交通</span>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="cloth"/>
        <span>服饰</span>
      </div>
    </li>
    <li>
      <div class="category-item">
        <Icon name="phone"/>
        <span>通讯</span>
      </div>
    </li>
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