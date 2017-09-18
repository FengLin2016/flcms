import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/main'
import List from '@/components/list/list'
import Show from '@/components/show/show'
import About from '@/components/about/about'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Main',
      component: Main
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/home/:tag',
      name: 'List',
      component: List
    },
    {
      path: '/home/show/:id',
      name: 'Show',
      component: Show
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
