import { createRouter, createWebHistory } from 'vue-router'
import { DefaultLayout } from '../layouts'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/HomePage.vue'),
      },
    ],
  },
  {
    path: '/users',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Users',
        component: () => import('../views/UserPage.vue'),
      },
    ],
  },
  {
    path: '/contacts',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Contacts',
        component: () => import('../views/ContactsPage.vue'),
      },
    ],
  },
  {
    path: '/news',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'News',
        component: () => import('../views/NewsPage.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
