import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/config/store.js'

/**
 * 路由配置
 * 支持前台展示和后台管理两种不同的布局模式
 */
const routes = [
  // 前台路由 - 使用公共布局
  {
    path: '/',
    component: () => import('@/components/layouts/Public.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/public/Home.vue'),
        meta: { title: '花卉市场 - 首页' }
      },
      {
        path: 'products',
        name: 'PublicProducts',
        component: () => import('@/views/public/Products.vue'),
        meta: { title: '花卉产品' }
      },
      {
        path: 'shopping-cart',
        name: 'ShoppingCart',
        component: () => import('@/views/public/ShoppingCart.vue'),
        meta: { title: '购物车' }
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
    component: () => import('@/components/layouts/Admin.vue'),
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
      },
      // 产品管理模块
      {
        path: 'products',
        name: 'AdminProducts',
        meta: { 
          title: '产品管理',
          requiresAuth: true,
          icon: 'el-icon-shopping-cart-full'
        },
        children: [
          {
            path: 'categories',
            name: 'ProductCategories',
            component: () => import('@/views/admin/products/Categories.vue'),
            meta: { 
              title: '分类管理',
              requiresAuth: true,
              permission: 'product:category:list'
            }
          },
          {
            path: 'products',
            name: 'ProductList',
            component: () => import('@/views/admin/products/Products.vue'),
            meta: { 
              title: '产品信息',
              requiresAuth: true,
              permission: 'product:list'
            }
          },
          {
            path: 'skus',
            name: 'ProductSkus',
            component: () => import('@/views/admin/products/ProductSkus.vue'),
            meta: { 
              title: 'SKU管理',
              requiresAuth: true,
              permission: 'productSku:list'
            }
          }
        ]
      },
      // 商户管理模块
      {
        path: 'merchant',
        name: 'Merchant',
        redirect: '/admin/merchant/dashboard',
        meta: { 
          title: '商户管理',
          requiresAuth: true,
          icon: 'el-icon-user'
        },
        children: [
          {
            path: 'dashboard',
            name: 'MerchantDashboard',
            component: () => import('@/views/admin/merchant/MerchantDashboard.vue'),
            meta: { 
              title: '商户仪表板',
              requiresAuth: true,
              permission: 'merchant:dashboard:view'
            }
          },
          {
            path: 'products',
            name: 'MerchantProducts',
            component: () => import('@/views/admin/merchant/MerchantProducts.vue'),
            meta: { 
              title: '商户产品',
              requiresAuth: true,
              permission: 'merchant:product:list'
            }
          },
          {
            path: 'comments',
            name: 'MerchantComments',
            component: () => import('@/views/admin/merchant/Comments.vue'),
            meta: { 
              title: '评论管理',
              requiresAuth: true,
              permission: 'merchant:comment:list'
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

    // 检查是否为admin用户
    const isAdmin = authStore.user && authStore.user.username === 'admin'
     
    // 检查权限（admin用户跳过权限检查）
    if (to.meta.permission && !isAdmin && !authStore.hasPermission(to.meta.permission)) {
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