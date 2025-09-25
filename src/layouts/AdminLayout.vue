<template>
  <el-container class="admin-layout" :class="{ 'mobile-view': isMobile }">
    <!-- 顶部导航栏 -->
<!-- 顶部导航栏 -->
    <el-header class="admin-header">
      <div class="header-left">
        <el-button 
          v-if="isMobile" 
          @click="toggleMenu" 
          class="menu-toggle"
          circle
          :icon="Expand"
        />
        <h2 class="admin-title">花卉市场管理系统</h2>
      </div>
      <div class="header-right">
        <!-- 主题切换按钮 -->
        <el-button @click="toggleTheme" :icon="themeIcon" circle />
        <!-- 用户信息下拉菜单 -->
        <el-dropdown @command="handleUserCommand">
          <span class="user-info">
            <el-avatar :size="30" icon="User" />
            <span class="username">管理员</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">个人资料</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <!-- 侧边栏 -->
    <el-aside 
      v-if="!isMobile || showMenu" 
      :class="{ 'collapsed': isCollapsed }" 
      class="admin-aside"
      width="auto"
    >
      <div class="menu-toggle-wrapper">
        <!-- 折叠/展开侧边栏按钮 -->
        <el-button 
          v-if="!isMobile" 
          @click="toggleCollapse" 
          class="collapse-toggle"
          :icon="isCollapsed ? Expand : Fold"
          circle
        />
      </div>
      <!-- 导航菜单 -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapsed"
        :collapse-transition="false"
        router
        class="admin-menu"
      >
        <el-menu-item index="/admin">
          <el-icon><Odometer /></el-icon>
          <template #title>仪表盘</template>
        </el-menu-item>
        <el-sub-menu index="system">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/admin/users">用户管理</el-menu-item>
          <el-menu-item index="/admin/roles">角色管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <!-- 主内容区 -->
    <el-main class="admin-main">
      <router-view />
    </el-main>

    <!-- 移动端遮罩层 -->
    <div 
      v-if="isMobile && showMenu" 
      class="mobile-overlay" 
      @click="closeMenu"
    />
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import {
  Odometer,
  Setting,
  Expand,
  Fold,
  Sunny,
  Moon
} from '@element-plus/icons-vue'

// 响应式状态
const isMobile = ref(false)
const isCollapsed = ref(false)
const showMenu = ref(false)

// 主题状态
const themeStore = useThemeStore()
const { theme: isDarkTheme } = storeToRefs(themeStore)

// 路由相关
const route = useRoute()
const router = useRouter()

// 计算属性
const activeMenu = computed(() => route.path)
const themeIcon = computed(() => isDarkTheme.value ? Sunny : Moon)

// 方法
const checkDevice = () => {
  isMobile.value = window.innerWidth < 768
  if (!isMobile.value) {
    showMenu.value = false
  }
}

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const closeMenu = () => {
  showMenu.value = false
}

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const handleUserCommand = (command: string) => {
  if (command === 'logout') {
    localStorage.removeItem('authToken')
    router.push('/login')
  }
}

// 生命周期
onMounted(() => {
  checkDevice()
  window.addEventListener('resize', checkDevice)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkDevice)
})
</script>

<style scoped>
.admin-layout {
  height: 100vh;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  color: var(--el-text-color-primary);
  border-bottom: 1px solid var(--el-border-color-light);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 1000;
}

.header-left {
  display: flex;
  align-items: center;
}

.menu-toggle {
  margin-right: 1rem;
}

.admin-title {
  margin: 0;
  font-size: 1.2rem;
  color: var(--el-text-color-primary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.username {
  margin-left: 0.5rem;
}

.admin-aside {
  background-color: #ffffff;
  border-right: 1px solid var(--el-border-color-light);
  transition: width 0.3s ease;
  height: calc(100vh - 60px);
  position: relative;
  z-index: 999;
}

.admin-aside.collapsed {
  width: 64px !important;
}

.menu-toggle-wrapper {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
}

.collapse-toggle {
  transition: transform 0.3s;
}

.collapse-toggle:hover {
  transform: rotate(90deg);
}

.admin-menu {
  border-right: none;
  height: calc(100% - 50px);
}

.admin-main {
  background-color: #f5f5f5;
  padding: 20px;
  overflow: auto;
}

.mobile-overlay {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

/* 移动端适配 */
.mobile-view .admin-aside {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 200px !important;
  transform: translateX(0);
  transition: transform 0.3s ease;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
}

.mobile-view .admin-aside:not(.collapsed) {
  transform: translateX(-100%);
}

@media (max-width: 767px) {
  .admin-header {
    padding: 0 10px;
  }
  
  .admin-title {
    font-size: 1rem;
  }
  
  .admin-main {
    padding: 10px;
  }
}
</style>