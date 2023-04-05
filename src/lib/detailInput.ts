import filterGroupList from '@/lib/filterGroupList';
import openDialog from '@/lib/openDialog';
import {computed, Ref} from 'vue';
import dayjs from 'dayjs';
import openMessage from '@/lib/openMessage';

export function detailInput(year: Ref<number>, month: Ref<number>) {
  const toggleMonth = () => {
    const ok = (text: string) => {
      if (text === '') return openMessage({message: '月份不能为空', type: 'error'});
      if (text === null) return;
      if (!/^\d{2}$/.test(text!) && !/^\d$/.test(text!) || parseInt(text) > 12) return openMessage({
        message: '只能输入1-12的数字',
        type: 'error'
      });
      month.value = parseInt(text!);
    };
    openDialog({ok: ok, header: '请输入查询的月份：'});
  };
  const toggleYear = () => {
    const ok = (text: string) => {
      if (text === '') return openMessage({message: '年份不能为空', type: 'error'});
      if (text === null) return;
      if (!/^\d{4}$/.test(text!)) return openMessage({message: '只能输入4个数字', type: 'error'});
      month.value = parseInt(text!);
    };
    openDialog({ok: ok, header: '请输入查询的年份：'});
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