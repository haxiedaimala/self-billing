<script setup lang="ts">
</script>

<template>
  <div class="numberPanel">
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
@import "~@/assets/styles/helper.scss";

.numberPanel {
  @extend %innerShadow;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1em;
  margin-top: 1em;
  background-color: var(--color-bg);
  border-top: 1px solid var(--color-border);

  .panel-info {
    background-color: #fff;
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: 1px solid var(--color-border);

    .notes {
      display: flex;
      flex: 1;
      align-items: center;
      padding: 0.6em 1em;
      border: none;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background-color: transparent;
    }

    .output {
      padding-right: 0.8em;
      font-size: 24px;
      font-family: Consolas, monospace;
    }
  }

  .numberPad {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
    margin-top: 5px;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.2em;
      font-size: 18px;
      margin: 5px 0;
      width: 21%;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      background-color: #fff;
      cursor: pointer;
      box-shadow: inset 0 -3px 5px rgba(194, 194, 194, 1);
    }
  }
}
</style>