<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import DetailList from '@/components/Detail-List.vue';
import filterGroupList from '@/lib/filterGroupList';
import {computed, ref} from 'vue';
import dayjs from 'dayjs';
import {useRoute, useRouter} from 'vue-router';
import {useStore} from 'vuex';
import {detailInput} from '@/lib/detailInput';

const route = useRoute();
const store = useStore();
const router = useRouter();
const routeYear = route.query.year as string;
const routeMonth = route.query.month as string;
const year = ref(parseInt(routeYear) || dayjs().year());
const month = ref(parseInt(routeMonth) || dayjs().month() + 1);
const {toggleMonth, toggleYear, monthSum, monthExpend, monthIncome} = detailInput(year, month);
const goBack = () => router.push({name: 'billing'});
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
  <div class="nav">
    <Icon name="left" @click="goBack"/>
    <button>
      <span class="year" @click="toggleYear">{{ year }}</span>年
      <span class="month" @click="toggleMonth">{{ month }}</span>月的账单
    </button>
  </div>
  <div class="details-content">
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
  </div>
</template>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

.nav {
  display: flex;
  align-items: center;
  padding: 1.5em 0.8em;
  background-color: #fff;

  button {
    font-size: 20px;
    margin-left: auto;
    border: none;
    background-color: transparent;
    white-space: nowrap;

    .year, .month {
      @extend %selectedItem;
    }
  }

  .left {
    width: 1.5em;
    height: 1.5em;
  }
}

.details-content {
  flex: 1;
  overflow-y: auto;
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
    overflow-y: auto;

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
          border: 1.5px solid var(--color-border);
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