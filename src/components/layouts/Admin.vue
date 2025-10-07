<template>
  <div class="admin-layout">
    <el-container class="layout-container">
      <!-- 侧边栏 -->
      <el-aside :width="sidebarWidth" class="sidebar">
        <div class="sidebar-header">
          <div class="logo" v-if="!isCollapsed">
            <el-icon size="28" color="#409eff">
              <Management />
            </el-icon>
            <span class="logo-text">管理后台</span>
          </div>
          <el-icon v-else size="28" color="#409eff" class="collapsed-logo">
            <Management />
          </el-icon>
        </div>
        
        <!-- 动态菜单 -->
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapsed"
          :unique-opened="true"
          class="sidebar-menu"
          background-color="#001529"
          text-color="rgba(255, 255, 255, 0.65)"
          active-text-color="#1890ff"
          @select="handleMenuSelect"
        >
          <template v-for="menu in userMenus" :key="menu.path">
            <!-- 单级菜单 -->
            <el-menu-item 
              v-if="!menu.children || menu.children.length === 0" 
              :index="menu.path"
            >
              <el-icon>
                <component :is="menu.icon" />
              </el-icon>
              <template #title>{{ menu.title }}</template>
            </el-menu-item>
            
            <!-- 多级菜单 -->
            <el-sub-menu v-else :index="menu.path">
              <template #title>
                <el-icon>
                  <component :is="menu.icon" />
                </el-icon>
                <span>{{ menu.title }}</span>
              </template>
              <el-menu-item 
                v-for="child in menu.children" 
                :key="child.path"
                :index="child.path"
              >
                <el-icon v-if="child.icon">
                  <component :is="child.icon" />
                </el-icon>
                <template #title>{{ child.title }}</template>
              </el-menu-item>
            </el-sub-menu>
          </template>
        </el-menu>
      </el-aside>

      <el-container class="main-container">
        <!-- 顶部栏 -->
        <el-header class="admin-header">
          <div class="header-left">
            <!-- 折叠按钮 -->
            <el-button 
              type="text" 
              @click="toggleSidebar" 
              class="collapse-btn"
            >
              <el-icon size="18">
                <Fold v-if="!isCollapsed" />
                <Expand v-else />
              </el-icon>
            </el-button>
            
            <!-- 面包屑导航 -->
            <el-breadcrumb separator="/">
              <el-breadcrumb-item 
                v-for="item in breadcrumbs" 
                :key="item.path"
                :to="item.path || undefined"
              >
                {{ item.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <div class="header-right">
            <!-- 用户菜单 -->
            <el-dropdown @command="handleUserCommand" class="user-dropdown">
              <div class="user-info">
                <el-avatar :size="32" :src="userAvatar">
                  <el-icon><User /></el-icon>
                </el-avatar>
                <span class="username">{{ userInfo?.username || '管理员' }}</span>
                <el-icon class="dropdown-arrow"><ArrowDown /></el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">
                    <el-icon><User /></el-icon>个人中心
                  </el-dropdown-item>
                  <el-dropdown-item command="settings">
                    <el-icon><House /></el-icon>回到首页
                  </el-dropdown-item>
                  <el-dropdown-item divided command="logout">
                    <el-icon><SwitchButton /></el-icon>退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>

        <!-- 主内容区 -->
        <el-main class="main-content">
          <div class="content-wrapper">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/config/store.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Management, Fold, Expand, User, ArrowDown, Setting, 
  SwitchButton, Monitor, UserFilled, Lock, Sunny, Moon,
  ShoppingCartFull, Avatar, Tickets, Coin, Files, Folder, Promotion,
  ChatLineRound, House, Shop, Document
} from '@element-plus/icons-vue'
import '@/assets/admin.css'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// 响应式状态
const isCollapsed = ref(false)
const isDarkTheme = ref(false)

// 计算属性
const sidebarWidth = computed(() => isCollapsed.value ? '64px' : '240px')
const userInfo = computed(() => authStore.user)
const userAvatar = computed(() => userInfo.value?.avatar || '')

// 活动菜单项
const activeMenu = computed(() => route.path)

/**
 * 根据用户权限生成菜单
 */
const userMenus = computed(() => {
  const menus = [
    {
      path: '/admin/dashboard',
      title: '仪表板',
      icon: 'Monitor'
    }
  ]

  // 检查用户是否为admin
  const isAdmin = authStore.user && authStore.user.username === 'admin'

  // 系统管理模块 - 根据权限动态添加
  const systemMenus = []
  
  if (isAdmin || authStore.hasPermission('system:user:list')) {
    systemMenus.push({
      path: '/admin/system/users',
      title: '用户管理',
      icon: 'User'  // Changed from UserFilled to User
    })
  }
  
  if (isAdmin || authStore.hasPermission('system:role:list')) {
    systemMenus.push({
      path: '/admin/system/roles',
      title: '角色管理',
      icon: 'Avatar'  // Changed from UserFilled to Avatar
    })
  }
  
  if (isAdmin || authStore.hasPermission('system:permission:list')) {
    systemMenus.push({
      path: '/admin/system/permissions',
      title: '权限管理',
      icon: 'Lock'
    })
  }

  if (systemMenus.length > 0) {
    menus.push({
      path: '/admin/system',
      title: '系统管理',
      icon: 'Setting',
      children: systemMenus
    })
  }

  // 产品管理模块 - 根据权限动态添加
  const productMenus = []
  
  if (isAdmin || authStore.hasPermission('product:category:list')) {
    productMenus.push({
      path: '/admin/products/categories',
      title: '分类管理',
      icon: 'Folder'  // Changed from ShoppingCartFull to Folder
    })
  }
  
  if (isAdmin || authStore.hasPermission('product:list')) {
    productMenus.push({
      path: '/admin/products/products',
      title: '产品信息',
      icon: 'Tickets'  // Changed from ShoppingCartFull to Tickets
    })
  }
  
  if (isAdmin || authStore.hasPermission('productSku:list')) {
    productMenus.push({
      path: '/admin/products/skus',
      title: 'SKU管理',
      icon: 'Coin'  // Changed from ShoppingCartFull to Coin
    })
  }

  if (productMenus.length > 0) {
    menus.push({
      path: '/admin/products',
      title: '产品管理',
      icon: 'ShoppingCartFull',
      children: productMenus
    })
  }

  // 商户管理模块 - 根据权限动态添加
  const merchantMenus = []
  
  if (isAdmin || authStore.hasPermission('merchant:dashboard:view')) {
    merchantMenus.push({
      path: '/admin/merchant/dashboard',
      title: '商户仪表板',
      icon: 'Monitor'
    })
  }
  
  if (isAdmin || authStore.hasPermission('merchant:product:list')) {
    merchantMenus.push({
      path: '/admin/merchant/products',
      title: '商户产品',
      icon: 'Tickets'
    })
  }
  
  if (isAdmin || authStore.hasPermission('merchant:comment:list')) {
    merchantMenus.push({
      path: '/admin/merchant/comments',
      title: '评论管理',
      icon: 'ChatLineRound'
    })
  }

  if (merchantMenus.length > 0) {
    menus.push({
      path: '/admin/merchant',
      title: '商户管理',
      icon: 'Shop', // Changed from 'User' to 'Shop' for better representation of merchant management
      children: merchantMenus
    })
  }

  // 订单管理模块 - 独立的一级菜单项，与商户管理同级
  const orderMenus = []
  
  if (isAdmin || authStore.hasPermission('merchant:order:list')) {
    orderMenus.push({
      path: '/admin/orders/merchant-orders',
      title: '商户订单',
      icon: 'Tickets'
    })
  }
  
  // 只有当有子菜单时才添加订单管理一级菜单
  if (orderMenus.length > 0) {
    menus.push({
      path: '/admin/orders',
      title: '订单管理',
      icon: 'Tickets',
      children: orderMenus
    })
  }

  // 个人中心模块 - 所有用户都有权限
  menus.push({
    path: '/admin/personal',
    title: '个人中心',
    icon: 'User', // Keeping the 'User' icon as it's appropriate for personal center
    children: [
      {
        path: '/admin/personal/profile',
        title: '个人信息',
        icon: 'Avatar' // Changed from 'User' to 'Avatar' for better distinction and consistency
      },
      {
        path: '/admin/personal/comments',
        title: '我的评论',
        icon: 'ChatLineRound' // Using the same icon as merchant comments
      },
      {
        path: '/admin/personal/shipping-address',
        title: '收货地址',
        icon: 'Files' // Using Files icon for address management
      },
      {
        path: '/admin/personal/orders',
        title: '我的订单',
        icon: 'Tickets' // Using Tickets icon for order management
      },
      {
        path: '/admin/personal/payment-methods',
        title: '支付方式',
        icon: 'Coin' // Using Coin icon for payment methods
      }
    ]
  })

  // 后花园模块 - 论坛管理
  menus.push({
    path: '/admin/forum',
    title: '后花园',
    icon: 'ChatLineRound',
    children: [
      {
        path: '/admin/forum/categories',
        title: '板块管理',
        icon: 'Folder'
      },
      {
        path: '/admin/forum/posts',
        title: '帖子管理',
        icon: 'Document'
      },
      {
        path: '/admin/forum/comments',
        title: '评论管理',
        icon: 'ChatLineRound'
      }
    ]
  })

  return menus
})

/**
 * 面包屑导航
 */
const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean)
  const crumbs = []
  
  if (paths.includes('admin')) {
    crumbs.push({ title: '管理后台', path: '/admin' })
    
    if (paths.includes('dashboard')) {
      crumbs.push({ title: '仪表板' })
    } else if (paths.includes('system')) {
      crumbs.push({ title: '系统管理' })
      
      if (paths.includes('users')) {
        crumbs.push({ title: '用户管理' })
      } else if (paths.includes('roles')) {
        crumbs.push({ title: '角色管理' })
      } else if (paths.includes('permissions')) {
        crumbs.push({ title: '权限管理' })
      }
    }
    else if (paths.includes('products')) {
      crumbs.push({ title: '产品管理' })
      
      if (paths.includes('categories')) {
        crumbs.push({ title: '分类管理' })
      } else if (paths.includes('products')) {
        crumbs.push({ title: '产品信息' })
      } else if (paths.includes('skus')) {
        crumbs.push({ title: 'SKU管理' })
      }
    }
    else if (paths.includes('merchant')) {
      crumbs.push({ title: '商户管理' })
      
      if (paths.includes('dashboard')) {
        crumbs.push({ title: '商户仪表板' })
      } else if (paths.includes('products')) {
        crumbs.push({ title: '商户产品' })
      } else if (paths.includes('comments')) {
        crumbs.push({ title: '评论管理' })
      }
    } else if (paths.includes('orders')) {
      crumbs.push({ title: '订单管理' })
      
      if (paths.includes('orders') && paths.includes('merchant')) {
        crumbs.push({ title: '商户订单' })
      }
    }
    else if (paths.includes('personal')) {
        crumbs.push({ title: '个人中心' })
        
        if (paths.includes('profile')) {
          crumbs.push({ title: '个人信息' })
        } else if (paths.includes('comments')) {
          crumbs.push({ title: '我的评论' })
        } else if (paths.includes('shipping-address')) {
          crumbs.push({ title: '收货地址' })
        } else if (paths.includes('orders')) {
          crumbs.push({ title: '我的订单' })
        } else if (paths.includes('payment-methods')) {
          crumbs.push({ title: '支付方式' })
        }
      }
  }
  
  return crumbs
})

/**
 * 切换侧边栏折叠状态
 */
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  // 保存到本地存储
  localStorage.setItem('sidebarCollapsed', isCollapsed.value.toString())
}

/**
 * 切换主题
 */
const toggleTheme = () => {
  const htmlElement = document.documentElement
  if (isDarkTheme.value) {
    htmlElement.classList.add('dark')
  } else {
    htmlElement.classList.remove('dark')
  }
  // 保存到本地存储
  localStorage.setItem('darkTheme', isDarkTheme.value.toString())
}

/**
 * 处理菜单选择
 */
const handleMenuSelect = (index) => {
  if (index !== route.path) {
    router.push(index)
  }
}

/**
 * 处理用户菜单命令
 */
const handleUserCommand = async (command) => {
  switch (command) {
    case 'profile':
      // 跳转到个人中心
      router.push('/admin/personal/profile')
      break
    case 'settings':
      // 跳转到首页
      router.push('/')
      break
    case 'logout':
      try {
        await ElMessageBox.confirm(
          '确定要退出登录吗？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
        authStore.logout()
        router.push('/login')
        ElMessage.success('已退出登录')
      } catch {
        // 用户取消操作
      }
      break
  }
}

// 初始化时恢复设置
onMounted(() => {
  // 恢复侧边栏状态
  const savedCollapsed = localStorage.getItem('sidebarCollapsed')
  if (savedCollapsed !== null) {
    isCollapsed.value = savedCollapsed === 'true'
  }
  
  // 恢复主题设置
  const savedTheme = localStorage.getItem('darkTheme')
  if (savedTheme !== null) {
    isDarkTheme.value = savedTheme === 'true'
    toggleTheme()
  }
})

// 监听路由变化，在移动端自动收起侧边栏
watch(route, () => {
  if (window.innerWidth <= 768) {
    isCollapsed.value = true
  }
})
</script>

<style scoped>

</style>