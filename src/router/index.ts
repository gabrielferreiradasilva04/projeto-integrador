// Composables
import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/home',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/register',
    component: () => import('@/views/RegisterView.vue'),
    children: [
      {
        path: '/register',
        name: 'RegisterView',
        component: () => import('@/views/RegisterView.vue'),
        
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/views/LoginView.vue'),
    children: [
      {
        path: '/',
        name: 'LoginView',
        component: () => import('@/views/LoginView.vue'),
      },
    ],
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
