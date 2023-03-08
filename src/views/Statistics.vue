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
const {toggleMonth, toggleYear, monthSum, monthExpend, monthIncome} = detailInput(year, month);
const goBack = () => router.push({name: 'billing'});
const toggleType = (value: string) => type.value = value;
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

</style>


