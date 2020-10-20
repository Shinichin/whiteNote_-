import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import Van from 'vant'
import 'vant/lib/index.css'
import Home from '../components/Home'
import LibraryIndex from '../components/library/LibraryIndex'
import Register from '@/components/Register'
Vue.use(Van)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/library',
          name: 'Library',
          component: LibraryIndex,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'index',
      redirect: '/index',
      component: AppIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
