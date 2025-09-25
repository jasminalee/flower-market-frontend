import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import PublicLayout from '@/layouts/PublicLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// 前台页面
const HomeView = () => import('@/views/public/HomeView.vue')
const AboutView = () => import('@/views/public/AboutView.vue')

// 后台页面
const LoginView = () => import('@/views/admin/LoginView.vue')
const DashboardView = () => import('@/views/admin/DashboardView.vue')
const UserManageView = () => import('@/views/admin/UserManageView.vue')
const RoleManageView = () => import('@/views/admin/RoleManageView.vue')

// 静态页面
const NotFoundView = () => import('@/views/NotFoundView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 前台路由
    {
      path: '/',
      component: PublicLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'about',
          name: 'about',
          component: AboutView
        }
      ]
    },
    // 后台路由
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: 'users',
          name: 'user-manage',
          component: UserManageView
        },
        {
          path: 'roles',
          name: 'role-manage',
          component: RoleManageView
        }
      ]
    },
    // 登录页
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    // 404页面
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router