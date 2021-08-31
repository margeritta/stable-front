import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/Layout.vue'
import Home from '../components/Home'
import Horses from '../components/Horses'
import WorkersNews from '../components/WorkersNews'
import Offer from '../components/Offer'
import News from '../components/News'
import Authentication from '../components/Authentication'
import Tasks from '../components/Tasks'
import Calendar from '../components/Calendar'
//import store from '../store/index'
import NotFound from '../components/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children:[
      {
        path:'',
        component:Home,
        name:'Home'
      },
      {
        path:'/horses',
        component:Horses,
        name:'Horses'
      },
      {
        path:'/offer',
        component:Offer,
        name:'Offer'
      },
      {
        path:'/news',
        component:News,
        name:'News'
      },
      {
        path:'/workersnews',
        component:WorkersNews,
        name:'WorkersNews',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/auth',
        component:Authentication,
        name:'Authentication',
        meta: {
          requiresUnauth: true
        }
      },
      {
        path: '/tasks',
        component:Tasks,
        name:'Tasks',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/calendar',
        component:Calendar,
        name:'Calendar',
        meta: {
          requiresAuth: true
        }
      },
      { path: '/:notFound(.*)', component: NotFound }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next('/');
  } else if (to.meta.requiresUnauth && localStorage.getItem('token')) {
    next('/');
  } else {
    next()
  }
})

export default router
