import {createStore} from 'vuex';
import createId from '@/lib/createId';

type CategoryItem = { id?: number; category: string, iconName: string, isShow?: boolean, type: string, created?: boolean }
const store = createStore({
  state: {
    categoryList: [] as Category[],
    recordList: [] as RecordItem[],
    createRecordError: null as Error | null,
    createCategoryError: null as Error | null,
    updateCategoryError: null as Error | null,
  },
  getters: {},
  mutations: {
    fetRecordList(state) {
      state.recordList = JSON.parse(localStorage.getItem('recordList') || '[]');
    },
    createRecord(state, obj: RecordItem) {
      state.recordList.push(obj);
      store.commit('saveRecord');
      state.createRecordError = null;
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
        state.createCategoryError = new Error('category name is duplicated');
      } else {
        if ('id' in obj) {
          state.createCategoryError = new Error('category id is duplicated');
        } else {
          obj.isShow = true;
          obj.created = true;
          state.categoryList.push(Object.assign({}, {id: createId()}, obj) as Category);
          store.commit('saveCategory');
          state.createCategoryError = null;
        }
      }
    },
    updateCategory(state, obj: Category) {
      const xxx = state.categoryList.filter(item => item.id === obj.id);
      if (xxx.length === 0) {
        state.updateCategoryError=new Error('category is nut found')
      } else {
        for (let i = 0; i < state.categoryList.length; i++) {
          if (state.categoryList[i].id === obj.id) {
            state.categoryList.splice(i, 1, obj);
          }
        }
        console.log(state.categoryList);
        store.commit('saveCategory');
        state.updateCategoryError=null
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
