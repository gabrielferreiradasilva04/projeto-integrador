// Composables
import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/administrator-home',
    component: () => import('@/views/Admin/AdministratorHomeView.vue'),
  },
  {
    path: '/register',
    component: () => import('@/views/Access/RegisterView.vue'),
  },
  {
    path: '/',
    component: () => import('@/views/Access/LoginView.vue'),
  },
  {
    path: '/users-championships',
    component: () => import('@/views/Users/ChampionshipsView.vue'),
  },
  {
    path: '/my-bets',
    component: () => import('../views/Users/MyBetsView.vue'),
  },
  {
    path: '/administrator-user-search',
    component: () => import('../views/Admin/AdministratorUserSearchView.vue'),
  },
  {
    path: '/administrator-user-edit/:id',
    component: () => import('../views/Admin/AdministratorUserEditView.vue'),
  },
  {
    path: '/administrator-user-register',
    component: () => import('../views/Admin/AdminstratorUserRegisterView.vue'),
  },
  {
    path: '/error-page',
    component: () => import('../views/Errors/DefaultErrorPage.vue'),
  },
  {
    path: '/user-home',
    component: () => import('../views/Users/UsersHome.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
