import dayjs, {OpUnitType} from 'dayjs';
import {computed} from 'vue';
import {useStore} from 'vuex';

const sort = (date: RecordItem[]) => {
  const newObj = JSON.parse(JSON.stringify(date)) as RecordItem[];
  return newObj.sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
};
const filterGroupList = (data: string) => {
  const store = useStore();
  const recordList = computed<RecordItem[]>(() => store.state.recordList);
  if (recordList.value.length === 0) return;
  const groupList: GroupList[] = [];
  const newList = sort(recordList.value);
  if (newList[0].type === '-') {
    groupList[0] = {createAt: newList[0].createAt, exItems: [newList[0]], inItems: [], sum: 0, expend: 0, income: 0};
  } else {
    groupList[0] = {createAt: newList[0].createAt, exItems: [], inItems: [newList[0]], sum: 0, expend: 0, income: 0};
  }
  for (let i = 1; i < newList.length; i++) {
    const current = newList[i];
    const last = groupList[groupList.length - 1];
    if (dayjs(current.createAt).isSame(dayjs(last.createAt), `${data}` as OpUnitType)) {
      current.type === '-' ? last.exItems.push(current) : last.inItems.push(current);
    } else {
      if (current.type === '-') {
        groupList.push({createAt: current.createAt, exItems: [current], inItems: [], sum: 0, expend: 0, income: 0});
      } else {
        groupList.push({createAt: current.createAt, exItems: [], inItems: [current], sum: 0, expend: 0, income: 0});
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

export default filterGroupList;