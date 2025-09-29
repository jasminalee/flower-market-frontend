<template>
  <div class="error-page">
    <div class="error-container slide-in-up">
      <div class="not-found-content">
        <!-- 404 图标 -->
        <div class="error-icon">
          <el-icon size="120" color="#ddd">
            <WarningFilled />
          </el-icon>
        </div>
        
        <!-- 错误信息 -->
        <div class="error-info">
          <h1 class="error-title">404</h1>
          <h2 class="error-subtitle">页面未找到</h2>
          <p class="error-description">
            抱歉，您访问的页面不存在或已被移除。
          </p>
        </div>
        
        <!-- 操作按钮 -->
        <div class="error-actions">
          <el-button type="primary" size="large" @click="goHome">
            <el-icon><House /></el-icon>
            返回首页
          </el-button>
          <el-button size="large" @click="goBack">
            <el-icon><Back /></el-icon>
            返回上一页
          </el-button>
        </div>
        
        <!-- 建议链接 -->
        <div class="suggestions">
          <h3>您可能想要：</h3>
          <div class="suggestion-links">
            <router-link to="/" class="suggestion-link">
              <el-icon><House /></el-icon>
              前台首页
            </router-link>
            <router-link to="/products" class="suggestion-link">
              <el-icon><Goods /></el-icon>
              产品展示
            </router-link>
            <router-link to="/login" class="suggestion-link" v-if="!isAuthenticated">
              <el-icon><User /></el-icon>
              登录系统
            </router-link>
            <router-link to="/admin/dashboard" class="suggestion-link" v-if="isAuthenticated">
              <el-icon><Monitor /></el-icon>
              管理后台
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/config/store.js'
import { 
  WarningFilled, House, Back, Goods, User, Monitor 
} from '@element-plus/icons-vue'

const router = useRouter()
const authStore = useAuthStore()

// 计算属性
const isAuthenticated = computed(() => authStore.isAuthenticated)

/**
 * 返回首页
 */
const goHome = () => {
  router.push('/')
}

/**
 * 返回上一页
 */
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    goHome()
  }
}
</script>

<style src="@/assets/NotFound.css" />
