import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '控制面板',
    component: Layout,
    icon: 'dashboard',
    isShow: true,
    children: [
      {
        path: '/props',
        name: '属性列表',
        isShow: true,
        component: () => import('@/views/generator/props')
      },
      {
        path: '/list',
        name: '数据库表',
        isShow: true,
        component: () => import('@/views/generator/list')
      }
    ]
  }
]
export {routes}

export default new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({y: 0}),
  base: '/generator/',
  routes: routes
})
