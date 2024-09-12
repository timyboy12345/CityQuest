import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/shop/ShopIndexView.vue')
    },
    {
      path: '/shop/return',
      name: 'shop-return',
      component: () => import('../views/shop/ShopReturnView.vue')
    },
    {
      path: '/shop/:id',
      name: 'shop-detail',
      component: () => import('../views/shop/ShopShowView.vue')
    },
    {
      path: '/city/:id',
      name: 'city',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CityView.vue')
    },
    {
      path: '/city/:id/summary',
      name: 'city-summary',
      component: () => import('../views/CitySummary.vue')
    }
  ]
})

export default router
