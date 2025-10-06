<template>
  <div class="public-layout">
    <!-- 顶部导航栏 -->
    <header class="public-header">
      <el-row type="flex" justify="space-between" align="middle" :gutter="20" class="header-row">
        <!-- Logo 区域 -->
        <el-col :span="4">
          <div class="logo-section">
            <router-link to="/" class="logo">
              <el-icon size="32" color="#409eff">
                <House />
              </el-icon>
              <span class="logo-text">花卉市场</span>
            </router-link>
          </div>
        </el-col>

        <!-- 导航菜单 -->
        <el-col :span="12">
          <nav class="nav-menu">
            <router-link to="/" class="nav-item" exact-active-class="active">
              首页
            </router-link>
            <router-link to="/products" class="nav-item" active-class="active">
              产品展示
            </router-link>
            <router-link to="/shopping-cart" class="nav-item" active-class="active">
              购物车
            </router-link>
          </nav>
        </el-col>

        <!-- 右侧操作区 -->
        <el-col :span="8">
          <div class="header-actions">
            <!-- 主题切换 -->
            <ThemeToggle mode="icon" :show-text="false" class="theme-toggle-btn" />
            
            <!-- 登录后显示用户信息 -->
            <el-dropdown v-if="isAuthenticated" @command="handleUserCommand" class="user-dropdown">
              <div class="user-info">
                <el-avatar :size="32" :src="userAvatar">
                  <el-icon><User /></el-icon>
                </el-avatar>
                <span class="username">{{ userInfo?.username || '用户' }}</span>
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
            
            <!-- 未登录显示登录按钮 -->
            <el-button v-else type="primary" @click="goToLogin">
              <el-icon><User /></el-icon>
              登录
            </el-button>
          </div>
        </el-col>
      </el-row>
    </header>

    <!-- 主内容区域 -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- 底部 -->
    <footer class="public-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>关于我们</h4>
            <p>专业的花卉产品展示平台，为您提供最优质的花卉产品。</p>
          </div>
          <div class="footer-section">
            <h4>联系方式</h4>
            <p>电话：xxx-123-4567</p>
            <p>邮箱：info@vtc.com</p>
          </div>
          <div class="footer-section">
            <h4>快速链接</h4>
            <router-link to="/">首页</router-link>
            <router-link to="/products">产品展示</router-link>
            <router-link to="/shopping-cart">购物车</router-link>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 花卉市场. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/config/store.js'
import { 
  User, House, ArrowDown, Setting, SwitchButton 
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import ThemeToggle from '../ThemeToggle.vue'

const router = useRouter()
const authStore = useAuthStore()

// 计算属性
const isAuthenticated = computed(() => authStore.isAuthenticated)
const userInfo = computed(() => authStore.user)
const userAvatar = computed(() => userInfo.value?.avatar || '')

/**
 * 跳转到登录页面
 */
const goToLogin = () => {
  router.push('/login')
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
      // 跳转到管理后台
      router.push('/admin/dashboard')
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
        router.push('/')
        ElMessage.success('已退出登录')
      } catch {
        // 用户取消操作
      }
      break
  }
}
</script>

<style src="@/assets/publicLayout.css" scoped>
  /* 添加用户头像样式 */
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .username {
    margin: 0 8px;
    font-size: 14px;
  }
  
  .dropdown-arrow {
    font-size: 12px;
  }
</style>