<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import {computed, reactive, ref} from 'vue';
import dayjs from 'dayjs';
import DetailList from '@/components/Detail-List.vue';
import filterGroupList from '@/lib/filterGroupList';
import {useRouter} from 'vue-router';
import UnShow from '@/components/UnShow.vue';

const router = useRouter();
const routeInfos = reactive([
  {name: 'information', text: '明细', iconName: 'details'},
  {name: 'billing', text: '账单', iconName: 'billing'},
  {name: 'money', text: '记账', iconName: 'money'},
  {name: 'category', text: '类别', iconName: 'category'},
]);
const year = ref(dayjs().year());
const toggleYear = () => {
  const text = window.prompt('请输入查询的年份：');
  if (text === '') return window.alert('年份不能为空');
  if (text === null) return;
  if (!/^\d{4}$/.test(text!)) return window.alert('只能输入4个数字');
  year.value = parseInt(text!);
};
const yearGroupList = computed(() => filterGroupList('year')?.filter(group => dayjs(group.createAt).year() === year.value) || []);
const monthGroupList = computed(() => filterGroupList('month')?.filter(item => dayjs(item.createAt).year() === year.value) || []);
const sum = computed(() => yearGroupList.value.reduce((sum, item) => sum + item.sum!, 0));
const expend = computed(() => yearGroupList.value.reduce((sum, item) => sum + item.expend!, 0));
const income = computed(() => yearGroupList.value.reduce((sum, item) => sum + item.income!, 0));
const showMonthList = computed(() => {
  let arr = [];
  const showFirstMonth = dayjs(monthGroupList.value[0].createAt).month() + 1;
  const findMonthDate = (i: number) => {
    return monthGroupList.value.filter(item => dayjs(item.createAt).month() === i).length === 0
        ? ''
        : monthGroupList.value.filter(item => dayjs(item.createAt).month() === i)[0];
  };
  for (let i = 0; i < showFirstMonth; i++) {
    arr.push({
      month: i + 1,
      expend: findMonthDate(i) === '' ? '0' : (findMonthDate(i) as GroupList).expend,
      income: findMonthDate(i) === '' ? '0' : (findMonthDate(i) as GroupList).income,
      sum: findMonthDate(i) === '' ? '0' : (findMonthDate(i) as GroupList).sum
    });
  }
  arr.sort((b, a) => a.month - b.month);
  return arr;
});
const goDetail = (value: number) => {
  router.push({
    name: 'details',
    query: {
      year: year.value,
      month: value
    }
  });
};
</script>

<template>
  <Layout :routes="routeInfos">
    <Teleport to="body">
      <div class="nav">
        <button class="year" @click="toggleYear">{{ year }}年的账单</button>
      </div>
    </Teleport>
    <template v-if="yearGroupList.length>0">
      <DetailList class="list-top" :top-title="year+'年'" type='年' :sum="sum" :expend="expend" :income="income"/>
      <div class="item-list">
        <div class="title">账单列表</div>
        <div class="table">
          <ul class="table-title">
            <li>月份</li>
            <li>支出</li>
            <li>收入</li>
            <li>结余</li>
            <li></li>
          </ul>
          <div class="table-content">
            <ul class="item" v-for="item in showMonthList" :key="item.month">
              <li>{{ item.month }}月</li>
              <li>-{{ item.expend }}</li>
              <li>+{{ item.income }}</li>
              <li>{{ item.sum }}</li>
              <li>
                <Icon name="right" @click="goDetail(item.month)"/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <UnShow/>
    </template>
  </Layout>
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
}

.list-top {
  margin-top: 75px;
}

.item-list {
  padding: 0.5em 1.5em;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    padding: 0.8em 0;
  }

  .table {
    border: 2px solid var(--color-border);
    border-radius: 4px;

    .table-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5em;
      background-color: var(--color-bg);
      border-bottom: 2px solid var(--color-border);

      li {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 2;

        &:last-child,
        &:first-child {
          flex: 1;
        }
      }
    }

    .table-content {
      .item {
        padding: 0.5em;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f2f2f2;

        li {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 2;

          &:last-child,
          &:first-child {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>