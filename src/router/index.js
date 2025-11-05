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
        component: () => import('../views/Home.vue'),
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
        component: () => import('../views/User.vue'),
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
        component: () => import('../views/contacts.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
