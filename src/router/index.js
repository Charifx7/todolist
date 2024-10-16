import { createRouter, createWebHistory } from 'vue-router'
import EditView from '../views/EditView.vue'
import HomeView from '../views/HomeView.vue'
import Testview from '@/views/Testview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todolist',
      component: HomeView
    },
    {
      path: '/test',
      name: 'test',
      component: Testview
    },
    {
      path: '/todo/:id/edit',
      name: 'edit',
      component: EditView
    }
  ]
})

export default router
