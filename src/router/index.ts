// Composables
import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/administratorHome',
    component: () => import('@/views/AdministratorHomeView.vue'),
    children: [
      {
        path: '/administratorHome',
        name: 'AdministratorHome',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/AdministratorHomeView.vue'),
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
  {
    path: '/championships',
    component: () => import('@/views/ChampionshipsView.vue'),
    children: [
      {
        path: '/championships',
        name: 'ChampionshipsView',
        component: () => import('@/views/ChampionshipsView.vue'),
      },
    ],
  },
  {
    path: '/mybets',
    component: () => import('../views/MyBetsView.vue'),
    children: [
      {
        path: '/mybets',
        name: 'MyBetsView',
        component: () => import('../views/MyBetsView.vue'),
      },
    ],
  },
  {
    path: '/usersSearch',
    component: () => import('../views/UsersSearch.vue'),
    children: [
      {
        path: '/usersSearch',
        name: 'UsersSearch',
        component: () => import('../views/UsersSearch.vue'),
      },
    ],
  },
  {
    path: '/userEdit/:id',
    component: () => import('../views/UserEditView.vue'),
    children: [
      {
        path: '/userEdit/:id',
        name: 'userEdit',
        component: () => import('../views/UserEditView.vue'),
      },
    ],
  },
  {
    path: '/registerAllUsers',
    component: () => import('../views/AllUsersTypeRegisterView.vue'),
    children: [
      {
        path: '/registerAllUsers',
        name: 'registerAllUsers',
        component: () => import('../views/AllUsersTypeRegisterView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
