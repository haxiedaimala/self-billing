<script setup lang="ts">
import Icon from '@/components/Icon.vue';
</script>

<template>
  <div class="wrapper">
    <ul class="type">
      <li class="selected">支出</li>
      <li>收入</li>
    </ul>
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
    <div class="panel">
      <div class="panel-info">
        <input class="notes" type="text" placeholder="点击输入备注">
        <div class="output">￥0.00</div>
      </div>
      <div class="numberPad">
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>03.15</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>-</button>
        <button>.</button>
        <button>0</button>
        <button>删除</button>
        <button>完成</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 0 1.5em;

  .type {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin: 1em 0;

    li {
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5em 0;
      position: relative;
      color: #878785;

      &.selected {
        color: #1f2324;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 0);
          width: 60%;
          height: 4px;
          background-color: var(--color-selected);
        }
      }
    }
  }

  .category {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 14px;

    li {
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;

      .category-item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 64px;
        height: 64px;
        border: 1px solid var(--border-color);
        border-radius: 50%;
        padding: 5px;

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
}


</style>