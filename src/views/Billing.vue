<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import {computed, reactive, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import dayjs, {OpUnitType} from 'dayjs';

const router = useRouter();
const routeInfos = reactive([
  {name: 'information', text: '明细', iconName: 'details'},
  {name: 'billing', text: '账单', iconName: 'billing'},
  {name: 'money', text: '记账', iconName: 'money'},
  {name: 'category', text: '类别', iconName: 'category'},
]);
const store = useStore();
const recordList = computed<RecordItem[]>(() => store.state.recordList);
const sort = (date: RecordItem[]) => {
  const newObj = JSON.parse(JSON.stringify(date)) as RecordItem[];
  return newObj.sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
};
const filterGroupList = (data: string) => {
  if (recordList.value.length === 0) return;
  let groupList: GroupList[] = [];
  let newList = sort(recordList.value);
  if (newList[0].type === '-') {
    groupList[0] = {createAt: newList[0].createAt, exItems: [newList[0]], inItems: []};
  } else {
    groupList[0] = {createAt: newList[0].createAt, exItems: [], inItems: [newList[0]]};
  }
  for (let i = 1; i < newList.length; i++) {
    const current = newList[i];
    const last = groupList[groupList.length - 1];
    if (dayjs(current.createAt).isSame(dayjs(last.createAt), `${data}` as OpUnitType)) {
      current.type === '-' ? last.exItems.push(current) : last.inItems.push(current);
    } else {
      if (current.type === '-') {
        groupList.push({createAt: current.createAt, exItems: [current], inItems: []});
      } else {
        groupList.push({createAt: current.createAt, exItems: [], inItems: [current]});
      }
    }
  }
  groupList.forEach(group => {
    group.expend = group.exItems.reduce((sum, item) => sum + item.account, 0);
    group.income = group.inItems.reduce((sum, item) => sum + item.account, 0);
    group.sum = group.income - group.expend;
  });
  return groupList;
};
const yearGroupList = computed(() => filterGroupList('year') || []);
const monthGroupList = computed(() => filterGroupList('month') || []);
const goBack = () => router.back();
const year = ref(dayjs().year());
const toggleYear = () => {
  const text = window.prompt('请输入查询的年份：');
  if (text === 'null') return;
  if (text === '') return window.alert('年份不能为空');
  if (!/^\d{4}$/.test(text!)) return window.alert('只能输入4个数字');
  year.value = parseInt(text!);
};
const sum = computed(() => yearGroupList.value.reduce((sum, item) => sum + item.sum!, 0));
const expend = computed(() => yearGroupList.value.reduce((sum, item) => sum + item.expend!, 0));
const income = computed(() => yearGroupList.value.reduce((sum, item) => sum + item.income!, 0));
console.log(yearGroupList.value);
</script>

<template>
  <Layout :routes="routeInfos">
    <Teleport to="body">
      <div class="nav">
        <Icon name="left" class="left" @click="goBack"/>
        <button class="year" @click="toggleYear">{{ year }}年的账单</button>
      </div>
    </Teleport>
    <template v-if="yearGroupList.filter(group=>dayjs(group.createAt).year()===year).length>0">
      <div class="item-list top">
        <div class="title">{{ year }}年</div>
        <div class="table">
          <div class="table-title">
            <span class="left">本年结余</span>
            <span class="right">￥{{ sum }}</span>
          </div>
          <div class="table-content">
            <div class="item">
              <span>本年支出</span>
              <span class="right">- ￥{{ expend }}</span>
            </div>
            <div class="item">
              <span>本年收入</span>
              <span class="right">+ ￥{{ income }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item-list">
        <div class="title">账单列表</div>
        <div class="table">
          <ul class="table-title info">
            <li>月份</li>
            <li>支出</li>
            <li>收入</li>
            <li>结余</li>
            <li></li>
          </ul>
          <div class="table-content">
            <ul class="item" v-for="(group,index) in monthGroupList.filter(item=>dayjs(item.createAt).year()===year)"
                :key="index">
              <li>{{ dayjs(group.createAt).month() + 1 }}月</li>
              <li>-{{ group.expend }}</li>
              <li>+{{ group.income }}</li>
              <li>{{ group.sum }}</li>
              <li>
                <Icon name="left"/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="un-show-content">
        <span>抱歉当前没有记录哦~~~</span>
        <router-link :to="{name:'money'}" class="un-show-link">去记账</router-link>
      </div>
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

  .left {
    width: 1.5em;
    height: 1.5em;
  }
}

.item-list {
  padding: 0.5em 1.5em;

  .title {
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

      .left {
        font-size: 18px;
      }

      .right {
        font-size: 28px;
        color: var(--color-selected);
      }

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

      &.info {
        background-color: var(--color-bg);
        border-bottom: 2px solid var(--color-border);
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

  &.top {
    margin-top: 75px;
  }
}

.un-show-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  .un-show-link {
    display: block;
    padding: 0.5em 2em;
    margin-top: 2em;
    font-size: 18px;
    background-color: var(--color-selected);
    color: #fff;
    border-radius: 0.8em;
    border: 1px solid var(--color-border);
  }
}
</style>