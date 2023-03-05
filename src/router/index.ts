import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import Billing from '@/views/Billing.vue';

const Money = import(/* webpackChunkName: "money" */ '@/views/Money.vue');
const Category = import(/* webpackChunkName: "label" */ '@/views/Category.vue');
const Details = import(/* webpackChunkName: "details" */ '@/views/Details.vue');
const NotFound = import(/* webpackChunkName: "notFound" */ '@/views/NotFound.vue');
const Statistics = import(/* webpackChunkName: "statistics" */ '@/views/Statistics.vue');
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/billing'
  },
  {
    path: '/billing',
    name: 'billing',
    component: Billing
  },
  {
    path: '/money',
    name: 'money',
    component: Money
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path: '/details',
    name: 'details',
    component: Details
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Statistics
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;