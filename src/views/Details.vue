<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import DetailList from '@/components/Detail-List.vue';

const toggleMonth = () => {
return;
};
</script>

<template>
  <Teleport to="body">
    <div class="nav">
      <Icon name="left"/>
      <button class="year" @click="toggleMonth">{{ 2023 }}年{{ 3 }}月的账单</button>
    </div>
  </Teleport>
  <DetailList class="list-top" top-title="2023年5月账本" type="月" sum="0" expend="暂无" income="暂无">
    <ul class="detail-list">
      <li class="selected">收入</li>
      <li class="middle">/</li>
      <li>支出</li>
    </ul>
  </DetailList>
  <div class="details">
    <div class="top">
      <span class="title">收支记录</span>
      <span class="add">+新建</span>
    </div>
    <div class="content">
      <div class="item">
        <div class="title">
          <span>03.07 </span>
          <span>星期二</span>
          <span class="sum">总结：￥333</span>
        </div>
        <div class="detail">
          <div class="icon-wrapper">
            <Icon name="food"/>
          </div>
          <div class="details-info">
            <div class="category-sum">
              <span>餐饮</span>
              <span>￥55</span>
            </div>
            <div class="note">255</div>
          </div>
        </div>
        <div class="detail">
          <div class="icon-wrapper">
            <Icon name="food"/>
          </div>
          <div class="details-info">
            <div class="category-sum">
              <span>餐饮</span>
              <span>￥55</span>
            </div>
            <div class="note">255</div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="title">
          <span>03.07 </span>
          <span>星期二</span>
          <span class="sum">总结：￥333</span>
        </div>
        <div class="detail">
          <div class="icon-wrapper">
            <Icon name="food"/>
          </div>
          <div class="details-info">
            <div class="category-sum">
              <span>餐饮</span>
              <span>￥55</span>
            </div>
            <div class="note">255</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  padding: 2em 0.8em 0.8em;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;

  .year {
    font-size: 20px;
    margin-left: auto;
    border: none;
    background-color: transparent;
  }

  .left {
    width: 1.5em;
    height: 1.5em;
  }
}

.list-top {
  margin-top: 75px;

  .detail-list {
    display: flex;
    flex-direction: row;
    align-items: center;

    li {
      font-size: 16px;
      color: var(--color-unselected);

      &.selected {
        color: #333;
      }

      &.middle {
        margin: 0 3px;
      }
    }
  }
}

.details {
  padding: 0.5em 1.5em;

  .top {
    padding: 1em 0;
    display: flex;
    align-items: center;

    .title {
      font-size: 20px;
    }

    .add {
      margin-left: auto;
      color: var(--color-selected);
    }
  }

  .content {
    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px dashed var(--color-unselected);

      &:last-child {
        border-bottom: none;
      }

      .title {
        padding: 0.5em;
        display: flex;
        align-items: center;

        span {
          margin-right: 0.8em;
        }

        .sum {
          margin: 0 0 0 auto;
          font-size: 14px;
          color: var(--color-unselected);
        }
      }

      .detail {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0.5em;

        .icon-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.4em;
          border-radius: 50%;
          background-color: var(--color-category-bg);
          border: 1px solid var(--color-border);
          margin-right: 0.6em;

          .icon {
            width: 2em;
            height: 2em;
          }
        }

        .details-info {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;

          .category-sum {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .note {
            font-size: 14px;
            color: var(--color-unselected)
          }
        }
      }
    }
  }
}
</style>