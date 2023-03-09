<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import DetailList from '@/components/Detail-List.vue';
import {useRouter} from 'vue-router';
import {computed, onMounted, ref} from 'vue';
import dayjs from 'dayjs';
import {detailInput} from '@/lib/detailInput';
import {useStore} from 'vuex';
import ChartPie from '@/components/ChartPie.vue';
import ChartLine from '@/components/ChartLine.vue';

const store = useStore();
const router = useRouter();
const year = ref(dayjs().year());
const month = ref(dayjs().month() + 1);
const type = ref('-');
const {monthGroupList, toggleMonth, toggleYear, monthSum, monthExpend, monthIncome} = detailInput(year, month);
const goBack = () => router.push({name: 'billing'});
const toggleType = (value: string) => type.value = value;
const accountSortList = computed(() => {
  let arr: RecordItem[] = [];
  monthGroupList.value.forEach(group => {
    arr.push(...group.inItems);
    arr.push(...group.exItems);
  });
  arr = arr.sort((b, a) => a.account - b.account);
  return arr.filter(item => item.type === type.value);
});
const selectIcon = computed(() => (value: string) => {
  const categoryList = computed<Category[]>(() => store.state.categoryList);
  return categoryList.value.filter(item => item.category === value)[0].iconName;
});
const categorySortList = computed(() => {
  let arr: RecordItem[] = [];
  let obj: { category: string, sum: number, items: RecordItem[] }[] = [];
  monthGroupList.value.forEach(group => {
    Object.assign(arr, group.exItems, group.inItems);
  });
  arr = arr.filter(item => item.type === type.value);
  if (arr.length === 0) return [];
  obj[0] = {category: arr[0].category, sum: 0, items: [arr[0]]};
  for (let i = 1; i < arr.length; i++) {
    const last = obj[obj.length - 1];
    const current = arr[i];
    if (current.category === last.category) {
      last.items.push(current);
    } else {
      obj.push({category: current.category, sum: 0, items: [current]});
    }
  }
  obj.forEach(group => {
    group.sum = group.items.reduce((sum, item) => sum + item.account, 0);
  });
  return obj.sort((b, a) => a.sum - b.sum);
});
const typeTitle = computed(() => type.value === '-' ? '支出' : '收入');
const dataListPie = computed(() => {
  const newList: { value: number, name: string }[] = [];
  categorySortList.value.forEach(item => {
    newList.push({value: item.sum, name: item.category});
  });
  return newList;
});
const dataListLine = computed(() => {
  const newData: { key: string, value: number }[] = [];
  const list = type.value === '-' ? monthGroupList.value[0].exItems : monthGroupList.value[0].inItems;
  const lastDay = dayjs().endOf('month').format('YYYY-MM-DD');
  const daysInMonth = dayjs().daysInMonth();
  for (let i = 0; i < daysInMonth; i++) {
    const key = dayjs(lastDay).subtract(i, 'day').format('YYYY-MM-DD');
    const value = list.filter(item => dayjs(item.createAt).isSame(key, 'day'))[0]?.account || 0.00;
    newData.push({key: key, value: value});
  }
  return newData.sort((a, b) => dayjs(a.key).valueOf() - dayjs(b.key).valueOf());
});
const chartWrapper = ref<HTMLDivElement>();
onMounted(() => {
  const index = parseInt(dayjs().format('D'));
  if (index <= 7) {
    chartWrapper.value!.scrollLeft = chartWrapper.value!.scrollWidth / 31 * (index - 2);
  } else {
    chartWrapper.value!.scrollLeft = chartWrapper.value!.scrollWidth / 31 * (index - 4);
  }
});
const maxAccountInfo = computed(() => {
  let days = parseInt(dayjs().endOf('month').format('D'));
  let maxAccount = accountSortList.value[0].account;
  let maxDate = dayjs(accountSortList.value[0].createAt).format('MM.DD');
  let sum = accountSortList.value.reduce((sum, item) => sum + item.account, 0);
  let length = accountSortList.value.length;
  return {
    maxAccount: maxAccount,
    maxDate: maxDate,
    mean: Math.floor(sum / days * 100) / 100,
    length: length
  };
});
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
    <template v-if="accountSortList.length>0">
      <div class="statistics">
        <div class="item">
          <div class="title">{{ typeTitle }}趋势概况</div>
          <div class="chart-details">
            <div>
              <span class="chart-title">本月内单日最高{{ typeTitle }}</span>
              <span>
                在 <span class="chart-data">{{ maxAccountInfo.maxDate }}</span> 这一天中，你{{ typeTitle }}了
                <span class="chart-data">￥{{ maxAccountInfo.maxAccount }}</span>
              </span>
            </div>
            <div class="chart-statistic">
              <div>
                <span class="chart-title">本月内平均每日{{ typeTitle }}</span>
                <span>￥{{ maxAccountInfo.mean }}</span>
              </div>
              <div>
                <span class="chart-title">本月内累计支出笔数</span>
                <span>{{ maxAccountInfo.length }}</span>
              </div>
            </div>
          </div>
          <div class="chart-wrapper" ref="chartWrapper">
            <ChartLine class="chart chart-line" :data="dataListLine"/>
          </div>
        </div>
        <div class="item">
          <div class="title">{{ typeTitle }}占比概况</div>
          <ChartPie class="chart" :data="dataListPie"/>
        </div>
        <div class="item">
          <div class="title">{{ typeTitle }}类目排行</div>
          <div class="content">
            <div class="content-item"
                 v-for="group in categorySortList" :key="group.category">
              <div class="iconItem">
                <Icon :name="selectIcon(group.category)"/>
              </div>
              <div class="info">
                <div class="info-item">
                  <span class="category-title">{{ group.category }}</span>
                  <span>共消费{{ group.items.length }}笔</span>
                </div>
                <div class="info-item">
                  本月共{{ typeTitle }}：￥{{ group.sum }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="title">{{ typeTitle }}明细排行</div>
          <div class="content">
            <div class="content-item"
                 v-for="item in accountSortList"
                 :key="item.category"
            >
              <div class="iconItem">
                <Icon :name="selectIcon(item.category)"/>
              </div>
              <div class="info">
                <div class="info-item">
                  <span class="category-title">{{ item.category }}</span>
                  <span class="detailAccount">
                  <span v-if="type==='-'">-</span>
                  ￥{{ item.account }}
                </span>
                </div>
                <div class="info-item">{{ dayjs(item.createAt).format('MM.DD') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
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

    .chart-details {
      div {
        margin-top: 0.4em;
        display: flex;
        flex-direction: column;

        .chart-title {
          font-size: 14px;
          color: var(--color-unselected);
        }

        .chart-data {
          color: var(--color-selected);
        }

        &.chart-statistic {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
      }
    }

    .chart-wrapper {
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .chart {
      margin: 0.8em 0 0.4em;
      height: 10em;

      &.chart-line {
        width: 420%
      }
    }

    .content {
      padding-top: 0.4em;

      .content-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 1em 0;

        .iconItem {
          display: flex;
          justify-content: center;
          align-items: center;
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


