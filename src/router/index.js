import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
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
        path: '/code',
        name: '代码生成',
        isShow: true,
        component: HelloWorld
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
