// Composables
import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/administrator-home',
    component: () => import('@/components/Menus/HouseManagerMenu.vue'),
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
    component: () => import('../views/Admin/HousemanagerAdministrator/AdministratorUserSearchView.vue'),
  },
  {
    path: '/administrator-user-edit/:id',
    component: () => import('../views/Admin/HousemanagerAdministrator/AdministratorUserEditView.vue'),
  },
  {
    path: '/administrator-user-register',
    component: () => import('../views/Admin/HousemanagerAdministrator/AdminstratorUserRegisterView.vue'),
  },
  {
    path: '/error-page',
    component: () => import('../views/Errors/DefaultErrorPage.vue'),
  },
  {
    path: '/user-home',
    component: () => import('../views/Users/UsersHome.vue'),
  },
  {
    path: '/championship-administrator-register',
    component: () => import('../views/Admin/ChampionshipAdministratorViews/TeamManagementView.vue'),
  },
  {
    path: '/championship-administrator-championships',
    component: () => import('../views/Admin/ChampionshipAdministratorViews/Championships/ChampionshipAdministratorChampionshipsView.vue'),
  },
  {
    path: '/championship-administrator-championships-add',
    component: () => import('../views/Admin/ChampionshipAdministratorViews/Championships/ChampionshipAdministratorAddChampionship.vue'),
  },
  {
    path: '/championship-administrator-home',
    component: () => import('@/components/Menus/ChampionshipAdminMenu.vue'),
  },

  {
    path: '/appbar',
    component: () => import('@/components/dashBoard/MainBarView.vue'),
  },
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
