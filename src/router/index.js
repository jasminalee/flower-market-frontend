import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

/**
 * 路由配置
 * 支持前台展示和后台管理两种不同的布局模式
 */
const routes = [
  // 前台路由 - 使用公共布局
  {
    path: '/',
    component: () => import('@/layouts/public/Layout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/public/Home.vue'),
        meta: { title: '花卉市场 - 首页' }
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/public/Products.vue'),
        meta: { title: '花卉产品' }
      }
    ]
  },

  // 登录页面 - 独立布局
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录', requiresGuest: true }
  },

  // 后台管理路由 - 使用管理后台布局
  {
    path: '/admin',
    component: () => import('@/layouts/admin/Layout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
        meta: { 
          title: '管理后台 - 仪表板',
          requiresAuth: true,
          icon: 'el-icon-monitor'
        }
      },
      // RBAC 权限管理模块
      {
        path: 'system',
        name: 'System',
        meta: { 
          title: '系统管理',
          requiresAuth: true,
          icon: 'el-icon-setting'
        },
        children: [
          {
            path: 'users',
            name: 'SystemUsers',
            component: () => import('@/views/admin/system/Users.vue'),
            meta: { 
              title: '用户管理',
              requiresAuth: true,
              permission: 'system:user:list'
            }
          },
          {
            path: 'roles',
            name: 'SystemRoles',
            component: () => import('@/views/admin/system/Roles.vue'),
            meta: { 
              title: '角色管理',
              requiresAuth: true,
              permission: 'system:role:list'
            }
          },
          {
            path: 'permissions',
            name: 'SystemPermissions',
            component: () => import('@/views/admin/system/Permissions.vue'),
            meta: { 
              title: '权限管理',
              requiresAuth: true,
              permission: 'system:permission:list'
            }
          }
        ]
      }
    ]
  },

  // 404 页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '页面未找到' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/**
 * 路由守卫 - 权限控制
 */
router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }

  const authStore = useAuthStore()

  // 检查是否需要登录
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      // 未登录，重定向到登录页
      next({
        name: 'Login',
        query: { redirect: to.fullPath }
      })
      return
    }

    // 检查权限
    if (to.meta.permission && !authStore.hasPermission(to.meta.permission)) {
      // 没有权限，重定向到仪表板
      next({ name: 'AdminDashboard' })
      return
    }
  }

  // 检查是否需要游客状态（如登录页）
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'AdminDashboard' })
    return
  }

  next()
})

export default router