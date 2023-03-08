<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import DetailList from '@/components/Detail-List.vue';
import filterGroupList from '@/lib/filterGroupList';
import {computed, ref} from 'vue';
import dayjs from 'dayjs';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';

const store = useStore();
const router = useRouter();
const year = ref(dayjs().year());
const month = ref(dayjs().month() + 1);
const goBack = () => router.push({name: 'billing'});
const toggleMonth = () => {
  const text = window.prompt('请输入查询的月份：');
  if (text === '') return window.alert('月份不能为空');
  if (text === null) return;
  if (!/^\d{2}$/.test(text!) && !/^\d$/.test(text!) || parseInt(text) > 12) return window.alert('只能输入1-12的数字');
  month.value = parseInt(text!);
};
const toggleYear = () => {
  const text = window.prompt('请输入查询的年份：');
  if (text === '') return window.alert('年份不能为空');
  if (text === null) return;
  if (!/^\d{4}$/.test(text!)) return window.alert('只能输入4个数字');
  year.value = parseInt(text!);
};
const monthGroupList = computed(() => filterGroupList('month')?.filter(item => dayjs(item.createAt).year() === year.value || dayjs(item.createAt).month() === month.value) || []);
const monthSum = computed(() => {
  if (monthGroupList.value.length === 0) return 0;
  return monthGroupList.value.reduce((sum, item) => sum + item.sum, 0);
});
const monthExpend = computed(() => {
  if (monthGroupList.value.length === 0) return '暂无';
  return monthGroupList.value.reduce((sum, item) => sum + item.expend, 0);
});
const monthIncome = computed(() => {
  if (monthGroupList.value.length === 0) return '暂无';
  return monthGroupList.value.reduce((sum, item) => sum + item.income, 0);
});
const categoryList = computed<Category[]>(() => store.state.categoryList);
const showDayList = computed(() => {
  const dayGroupList = computed(() => filterGroupList('day')?.filter(item => dayjs(item.createAt).year() === year.value && dayjs(item.createAt).month() === month.value - 1) || []);
  let arr = [];
  for (let i = 0; i < dayGroupList.value.length; i++) {
    arr[i] = {
      createAt: dayGroupList.value[i].createAt,
      expend: dayGroupList.value[i].expend,
      income: dayGroupList.value[i].income,
      sum: dayGroupList.value[i].sum,
      items: [...dayGroupList.value[i].exItems, ...dayGroupList.value[i].inItems]
    };
  }
  return arr;
});
const selectIcon = (value: string) => categoryList.value.filter(item => item.category === value)[0].iconName;
</script>

<template>
  <Teleport to="body">
    <div class="nav">
      <Icon name="left" @click="goBack"/>
      <button>
        <span class="year" @click="toggleYear">{{ year }}</span>年
        <span class="month" @click="toggleMonth">{{ month }}</span>月的账单
      </button>
    </div>
  </Teleport>
  <DetailList class="list-top"
              :top-title="`${year}年${month}月账本`"
              type="月" :sum="monthSum"
              :expend="monthExpend"
              :income="monthIncome"/>
  <div class="details">
    <div class="top">
      <span class="title">收支记录</span>
      <router-link :to="{name:'money'}" class="add">+ 新建</router-link>
    </div>
    <div class="content">
      <template v-if="showDayList.length>0">
        <div class="item" v-for="dayGroup in showDayList" :key="dayGroup.createAt">
          <div class="title">
            <span>{{ dayjs(dayGroup.createAt).format('MM.DD') }}</span>
            <span>{{ dayjs(dayGroup.createAt).format('dddd') }}</span>
            <span class="sum">总结：￥{{ dayGroup.sum }}</span>
          </div>
          <div class="detail" v-for="(item,index) in dayGroup.items" :key="index">
            <div class="icon-wrapper">
              <Icon :name="selectIcon(item.category)"/>
            </div>
            <div class="details-info">
              <div class="category-sum">
                <span>{{ item.category }}</span>
                <span>
                  <span v-if="item.type==='-'">-</span>
                  <span>￥{{ item.account }}</span>
                </span>
              </div>
              <div class="note">{{ item.note }}</div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="no-show">暂无记录~~~</div>
      </template>
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

    .no-show {
      text-align: center;
      width: 100%;
      margin-top: 50px;
    }
  }
}
</style>