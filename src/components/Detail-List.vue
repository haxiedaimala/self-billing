<script setup lang="ts">
defineProps<{
  topTitle: string,
  type: '年' | '月' | '日',
  sum: number,
  expend: number | string,
  income: number | string
}>();
</script>

<template>
  <div class="item-list">
    <div class="title">
      <span>{{ topTitle }}</span>
      <span><slot/></span>
    </div>
    <div class="table">
      <div class="table-title">
        <span class="left">本{{ type }}结余</span>
        <span class="right">￥{{ sum }}</span>
      </div>
      <div class="table-content">
        <div class="item">
          <span>本{{ type }}支出</span>
          <span class="right">- ￥{{ expend }}</span>
        </div>
        <div class="item">
          <span>本{{ type }}收入</span>
          <span class="right">+ ￥{{ income }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
%detail-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-list {
  padding: 0.5em 1.5em;

  .title {
    @extend %detail-flex;
    font-size: 20px;
    padding: 0.8em 0;
  }

  .table {
    border: 2px solid var(--color-border);
    border-radius: 5px;

    .table-title {
      @extend %detail-flex;
      padding: 0.5em;

      .left {
        font-weight: bold;
        font-size: 18px;
      }

      .right {
        font-size: 28px;
        color: var(--color-selected);
      }

    }

    .table-content {
      .item {
        padding: 0.5em;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f2f2f2;

        .right {
          font-weight: bold;
          margin-left: auto;
        }
      }
    }
  }
}
</style>