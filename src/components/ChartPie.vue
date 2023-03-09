<script setup lang="ts">
import * as echarts from 'echarts';
import {ref, watchPostEffect} from 'vue';

const props = defineProps<{
  data: { value: number, name: string, }
}>();
let chartDom = ref<HTMLDivElement>();

watchPostEffect(() => {
  if (chartDom.value === undefined) return;
  let myChart = echarts.init(chartDom.value);
  myChart.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'right'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        legendHoverLink: true,
        clockwise: true,
        label:{
          formatter: '{b}: {d}%'
        }
      }
    ]
  });
});
</script>

<template>
  <div class="chart" ref="chartDom">12</div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>