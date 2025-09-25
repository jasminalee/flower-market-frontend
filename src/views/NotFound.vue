<template>
  <div class="not-found-page">
    <div class="not-found-container">
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

<style scoped>
.not-found-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.not-found-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 60px 40px;
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.error-icon {
  margin-bottom: 32px;
}

.error-info {
  margin-bottom: 40px;
}

.error-title {
  font-size: 6rem;
  font-weight: 700;
  color: #409eff;
  margin-bottom: 16px;
  line-height: 1;
}

.error-subtitle {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.error-description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.suggestions {
  border-top: 1px solid #eee;
  padding-top: 32px;
}

.suggestions h3 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 20px;
}

.suggestion-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}

.suggestion-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f8f9fa;
  color: #666;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s;
  font-size: 14px;
}

.suggestion-link:hover {
  background: #e9ecef;
  color: #409eff;
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .not-found-container {
    padding: 40px 24px;
  }

  .error-title {
    font-size: 4rem;
  }

  .error-subtitle {
    font-size: 1.5rem;
  }

  .error-description {
    font-size: 1rem;
  }

  .error-actions {
    flex-direction: column;
    align-items: center;
  }

  .error-actions .el-button {
    width: 200px;
  }

  .suggestion-links {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .not-found-page {
    padding: 16px;
  }

  .not-found-container {
    padding: 32px 20px;
  }

  .error-title {
    font-size: 3rem;
  }

  .error-icon .el-icon {
    font-size: 80px !important;
  }
}

/* 动画效果 */
.not-found-container {
  animation: slideInUp 0.6s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-icon {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>