import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BaseLayout from '@/components/BaseLayout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    component: BaseLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/birthdayCake',
        name: 'birthdayCake',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Cake.vue')
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
