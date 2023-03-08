import filterGroupList from '@/lib/filterGroupList';
import {computed, Ref} from 'vue';
import dayjs from 'dayjs';

export function detailInput(year: Ref<number>, month: Ref<number>) {
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
  const monthGroupList = computed(() => filterGroupList('month')?.filter(item => dayjs(item.createAt).year() === year.value && dayjs(item.createAt).month() === month.value - 1) || []);
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
  return {
    monthSum,
    monthExpend,
    monthIncome,
    toggleYear,
    toggleMonth,
    monthGroupList
  };
}