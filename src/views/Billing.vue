<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import {computed, reactive} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import dayjs from 'dayjs';

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
const newRecordList = computed(() => {
  if (recordList.value.length === 0) return;
  let groupList: GroupList[] = [];
  let newList = sort(recordList.value);
  groupList[0] = {createAt: newList[0].createAt, items: [newList[0]]};
  for (let i = 1; i < newList.length; i++) {
    const current = newList[i];
    const last = groupList[groupList.length - 1];
    if (dayjs(current.createAt).isSame(dayjs(last.createAt), 'day')) {
      last.items.push(current);
    } else {
      groupList.push({createAt: current.createAt, items: [current]});
    }
  }
  console.log(groupList);
  return [];
});
const goBack = () => router.back();
</script>

<template>
  <Layout :routes="routeInfos">
    {{
      newRecordList
    }}
    <Teleport to="body">
      <div class="nav">
        <Icon name="left" class="left" @click="goBack"/>
        <button class="year">2023年的账单</button>
      </div>
    </Teleport>
    <div class="item-list top">
      <div class="title">2023年</div>
      <div class="table">
        <div class="table-title">
          <span class="left">本年结余</span>
          <span class="right">￥2222.00</span>
        </div>
        <div class="table-content">
          <div class="item">
            <span>本年支出</span>
            <span class="right">- ￥2562</span>
          </div>
          <div class="item">
            <span>本年收入</span>
            <span class="right">+ ￥2562</span>
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
          <ul class="item">
            <li>3月</li>
            <li>-253.00</li>
            <li>+566.00</li>
            <li>+222</li>
            <li>
              <Icon name="left"/>
            </li>
          </ul>
          <ul class="item">
            <li>3月</li>
            <li>-253.00</li>
            <li>+566.00</li>
            <li>+222</li>
            <li>
              <Icon name="left"/>
            </li>
          </ul>
        </div>
      </div>
    </div>
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
</style>