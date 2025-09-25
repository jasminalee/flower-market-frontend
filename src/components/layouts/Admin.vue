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
        <el-header class="header">
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
            <!-- 主题切换 -->
            <el-switch
              v-model="isDarkTheme"
              @change="toggleTheme"
              inline-prompt
              :active-icon="Moon"
              :inactive-icon="Sunny"
              class="theme-switch"
            />
            
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
                    <el-icon><Setting /></el-icon>系统设置
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

        <!-- 底部 -->
        <el-footer class="footer">
          <div class="footer-content">
            <span>&copy; 2024 花卉市场管理系统. 保留所有权利.</span>
            <span>Version 1.0.0</span>
          </div>
        </el-footer>
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
  SwitchButton, Monitor, UserFilled, Lock, Sunny, Moon
} from '@element-plus/icons-vue'

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

  // 系统管理模块 - 根据权限动态添加
  const systemMenus = []
  
  if (authStore.hasPermission('system:user:list')) {
    systemMenus.push({
      path: '/admin/system/users',
      title: '用户管理',
      icon: 'UserFilled'
    })
  }
  
  if (authStore.hasPermission('system:role:list')) {
    systemMenus.push({
      path: '/admin/system/roles',
      title: '角色管理',
      icon: 'UserFilled'
    })
  }
  
  if (authStore.hasPermission('system:permission:list')) {
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
      ElMessage.info('个人中心功能开发中...')
      break
    case 'settings':
      ElMessage.info('系统设置功能开发中...')
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
.admin-layout {
  height: 100vh;
  overflow: hidden;
}

.layout-container {
  height: 100%;
}

/* 侧边栏样式 */
.sidebar {
  background-color: #001529;
  transition: width 0.3s;
  overflow: hidden;
}

.sidebar-header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border-bottom: 1px solid #1f2937;
}

.logo {
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.logo-text {
  margin-left: 8px;
  color: #409eff;
}

.collapsed-logo {
  color: #409eff;
}

.sidebar-menu {
  border: none;
  height: calc(100vh - 64px);
  overflow-y: auto;
}

.sidebar-menu:not(.el-menu--collapse) {
  width: 240px;
}

/* 主容器样式 */
.main-container {
  background-color: #f0f2f5;
  overflow: hidden;
}

/* 头部样式 */
.header {
  background: white;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.collapse-btn {
  font-size: 18px;
  color: #666;
}

.collapse-btn:hover {
  color: #409eff;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.theme-switch {
  --el-switch-on-color: #409eff;
  --el-switch-off-color: #dcdfe6;
}

.user-dropdown {
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: #f5f5f5;
}

.username {
  font-size: 14px;
  color: #333;
}

.dropdown-arrow {
  font-size: 12px;
  color: #999;
}

/* 主内容样式 */
.main-content {
  padding: 0;
  background-color: #f0f2f5;
  overflow-y: auto;
}

.content-wrapper {
  padding: 24px;
  min-height: calc(100vh - 64px - 60px);
}

/* 底部样式 */
.footer {
  background: white;
  border-top: 1px solid #e8e8e8;
  padding: 0 24px;
  height: 60px;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #666;
  font-size: 12px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1001;
  }
  
  .main-container {
    margin-left: 0 !important;
  }
  
  .header-left .el-breadcrumb {
    display: none;
  }
  
  .username {
    display: none;
  }
}

/* 暗色主题 */
:global(.dark) .header {
  background: #1f1f1f;
  border-bottom-color: #333;
  color: #fff;
}

:global(.dark) .main-content {
  background-color: #121212;
}

:global(.dark) .footer {
  background: #1f1f1f;
  border-top-color: #333;
}

:global(.dark) .footer-content {
  color: #ccc;
}

:global(.dark) .user-info:hover {
  background-color: #333;
}

:global(.dark) .username {
  color: #fff;
}
</style>