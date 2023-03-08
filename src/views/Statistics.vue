<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import DetailList from '@/components/Detail-List.vue';
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import dayjs from 'dayjs';
import {detailInput} from '@/lib/detailInput';

const router = useRouter();
const year = ref(dayjs().year());
const month = ref(dayjs().month() + 1);
const type = ref('-');
const {monthGroupList, toggleMonth, toggleYear, monthSum, monthExpend, monthIncome} = detailInput(year, month);
const goBack = () => router.push({name: 'billing'});
const toggleType = (value: string) => type.value = value;
console.log(monthGroupList.value);
</script>

<template>
  <Teleport to="body">
    <div class="nav">
      <Icon name="left" @click="goBack"/>
      <button>
        <span class="year" @click="toggleYear">{{ year }}</span>年
        <span class="month" @click="toggleMonth">{{ month }}</span>月的收支概况
      </button>
    </div>
  </Teleport>
  <template v-if="monthGroupList.length>0">
    <DetailList class="list-top"
                :top-title="`${year}年${month}月账本`"
                type="月" :sum="monthSum"
                :expend="monthExpend"
                :income="monthIncome">
      <ul class="detail-list">
        <li :class="{selected:type==='-'}" @click="toggleType('-')">支出</li>
        <li class="middle">/</li>
        <li :class="{selected:type==='+'}" @click="toggleType('+')">收入</li>
      </ul>
    </DetailList>
    <div class="statistics">
      <div class="item">
        <div class="title">支出趋势概况</div>
        <div class="chart">1</div>
      </div>
      <div class="item">
        <div class="title">支出占比概况</div>
        <div class="chart">1</div>
      </div>

      <div class="item">
        <div class="title">支出类目排行</div>
        <div class="content">
          <div class="content-item">
            <div class="iconItem">
              <Icon name="food"/>
            </div>
            <div class="info">
              <div class="info-item">
                <span class="category-title">运动</span>
                <span>共消费2笔</span>
              </div>
              <div class="info-item">本月共支出：￥2222</div>
            </div>
          </div>
          <div class="content-item">
            <div class="iconItem">
              <Icon name="food"/>
            </div>
            <div class="info">
              <div class="info-item">
                <span class="category-title">运动</span>
                <span>共消费2笔</span>
              </div>
              <div class="info-item">本月共支出：￥2222</div>
            </div>
          </div>
        </div>
      </div>

      <div class="item">
        <div class="title">支出明细排行</div>
        <div class="content">
          <div class="content-item">
            <div class="iconItem">
              <Icon name="food"/>
            </div>
            <div class="info">
              <div class="info-item">
                <span class="category-title">运动</span>
                <span class="detailAccount">-￥2255</span>
              </div>
              <div class="info-item">03.07</div>
            </div>
          </div>
          <div class="content-item">
            <div class="iconItem">
              <Icon name="food"/>
            </div>
            <div class="info">
              <div class="info-item">
                <span class="category-title">运动</span>
                <span class="detailAccount">-￥2255</span>
              </div>
              <div class="info-item">03.07</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </template>
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

  button {
    font-size: 20px;
    margin-left: auto;
    border: none;
    background-color: transparent;
    white-space: nowrap;

    .year, .month {
      padding: 0 4px;
      color: var(--color-selected);
    }
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

.statistics {
  padding: 0.5em 1.5em;

  .item {
    padding: 0.5em;
    border: 2px solid var(--color-border);
    border-radius: 5px;
    margin-bottom: 0.8em;

    .title {
      font-size: 18px;
      font-weight: bold;
      padding: 0.4em 0;
      border-bottom: 2px solid var(--color-border);
    }

    .chart {
      padding: 0.4em 0;
      min-height: 10em;
    }

    .content {
      padding-top: 0.4em;

      .content-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 1em 0;

        .iconItem {
          padding: 0.4em;
          margin-right: 0.8em;
          border-radius: 50%;
          border: 1px solid var(--color-border);
          background-color: var(--color-category-bg);

          .icon {
            width: 1.5em;
            height: 1.5em;
          }
        }

        .info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .info-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: var(--color-unselected);

            .category-title, .detailAccount {
              font-size: 16px;
              color: #333;
            }
          }
        }

        &:first-child {
          margin-top: 0.8em;
        }
      }
    }
  }
}
</style>


