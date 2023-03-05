<script setup lang="ts">
</script>

<template>
  <ul class="category">
    <li class="selected">支出</li>
    <li>收入</li>
  </ul>
  <div class="tags">
    <ul class="current">
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
    </ul>
    <div class="new">
      <button>新增标签</button>
    </div>
  </div>

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
</template>

<style lang="scss" scoped>
.category {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 18px;

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

.tags {

}
</style>