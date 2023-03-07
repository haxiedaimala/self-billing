import {createStore} from 'vuex';
import createId from '@/createId';

type CategoryItem = { id?: number; category: string, iconName: string, isShow?: boolean, type: string, created?: boolean }
const store = createStore({
  state: {
    categoryList: [] as Category[],
    recordList: [] as RecordItem[]
  },
  getters: {},
  mutations: {
    fetRecordList(state) {
      state.recordList = JSON.parse(localStorage.getItem('recordList') || '[]');
    },
    createRecord(state, obj: RecordItem) {
      state.recordList.push(obj);
      store.commit('saveRecord');
      window.alert('记账成功');
    },
    saveRecord(state) {
      localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetCategoryList(state) {
      state.categoryList = JSON.parse(localStorage.getItem('categoryList') || '[]');
      if (state.categoryList.length === 0) {
        store.commit('createCategory', {category: '餐饮', iconName: 'food', isShow: true, type: '-', created: false});
        store.commit('createCategory', {category: '交通', iconName: 'car', isShow: true, type: '-', created: false});
        store.commit('createCategory', {category: '购物', iconName: 'food', isShow: true, type: '-', created: false});
      }
    },
    createCategory(state, obj: CategoryItem) {
      const names = state.categoryList.map(item => item.category);
      if (names.indexOf(obj.category) >= 0) {
        window.alert('标签名已存在');
      } else {
        if ('id' in obj) {
          window.alert('重复创建');
        } else {
          obj.isShow = true;
          obj.created = true;
          state.categoryList.push(Object.assign({}, {id: createId()}, obj) as Category);
          store.commit('saveCategory');
          window.alert('创建成功');
        }
      }
    },
    updateCategory(state, obj: Category) {
      const xxx = state.categoryList.filter(item => item.id === obj.id);
      if (xxx.length === 0) {
        window.alert('找不到该标签信息');
      } else {
        for (let i = 0; i < state.categoryList.length; i++) {
          if (state.categoryList[i].id === obj.id) {
            state.categoryList.splice(i, 1, obj);
          }
        }
        console.log(state.categoryList);
        store.commit('saveCategory');
        alert('更新成功');
      }
    },
    saveCategory(state) {
      localStorage.setItem('categoryList', JSON.stringify(state.categoryList));
    }
  },
  actions: {},
  modules: {}
});
store.commit('fetCategoryList');
store.commit('fetRecordList');
export default store;
