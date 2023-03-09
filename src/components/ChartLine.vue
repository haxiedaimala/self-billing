<script setup lang="ts">
import * as echarts from 'echarts';
import {ref, watchPostEffect} from 'vue';
import dayjs from 'dayjs';

const props = defineProps<{
  data: { key: string, value: number }[]
}>();
let chartDom = ref<HTMLDivElement>();

watchPostEffect(() => {
  if (chartDom.value === undefined) return;
  let myChart = echarts.init(chartDom.value);
  myChart.setOption({
    grid: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 20
    },
    xAxis: {
      type: 'category',
      data: props.data.map(item => dayjs(item.key).format('MM-DD')),
      axisLabel: {
        formatter: function (value: string) {
          return value.substring(1);
        }
      },
      axisTick: {
        show: true,
        alignWithLabel: true
      },
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      },
    },

    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        symbolSize: 10,
        symbol: 'circle',
        data: props.data.map(item => item.value),
        type: 'line',
        itemStyle: {
          color: '#666'
        }
      }
    ],
    tooltip: {
      show: true,
      triggerOn: 'click',
      confine: true,
      trigger: 'item',
      position: 'top',
      formatter: '{c}',
    }
  });
});
</script>

<template>
  <div class="chart" ref="chartDom"></div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>