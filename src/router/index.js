import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Layout from '@/views/layout/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '/code',
        name: 'code',
        component: HelloWorld
      }
    ]
  }
]

export default new VueRouter({
  scrollBehavior: () => ({y: 0}),
  base: '/generator',
  routes: routes
})
