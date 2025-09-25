<template>
  <div class="public-layout">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="container">
        <!-- Logo 区域 -->
        <div class="logo-section">
          <router-link to="/" class="logo">
            <el-icon size="32" color="#409eff">
              <House />
            </el-icon>
            <span class="logo-text">花卉市场</span>
          </router-link>
        </div>

        <!-- 导航菜单 -->
        <nav class="nav-menu">
          <router-link to="/" class="nav-item" exact-active-class="active">
            首页
          </router-link>
          <router-link to="/products" class="nav-item" active-class="active">
            产品展示
          </router-link>
        </nav>

        <!-- 右侧操作区 -->
        <div class="header-actions">
          <!-- 主题切换 -->
          <ThemeToggle mode="icon" :show-text="false" class="theme-toggle-btn" />
          
          <el-button type="primary" @click="goToLogin">
            <el-icon><User /></el-icon>
            进入管理后台
          </el-button>
        </div>
      </div>
    </header>

    <!-- 主内容区域 -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- 底部 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>关于我们</h4>
            <p>专业的花卉产品展示平台，为您提供最优质的花卉产品。</p>
          </div>
          <div class="footer-section">
            <h4>联系方式</h4>
            <p>电话：400-123-4567</p>
            <p>邮箱：info@flowermarket.com</p>
          </div>
          <div class="footer-section">
            <h4>快速链接</h4>
            <router-link to="/">首页</router-link>
            <router-link to="/products">产品展示</router-link>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 花卉市场. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { User, House } from '@element-plus/icons-vue'
import ThemeToggle from '../../components/ThemeToggle.vue'

const router = useRouter()

/**
 * 跳转到登录页面
 */
const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.public-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏 */
.header {
  background: var(--bg-color);
  box-shadow: var(--box-shadow-base);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid var(--border-color-light);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  width: 100%;
}

.header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

/* Logo 区域 */
.logo-section {
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-color-primary);
  font-weight: bold;
  transition: var(--transition-base);
}

.logo-text {
  margin-left: 8px;
  font-size: 24px;
  background: linear-gradient(135deg, #409eff, #67c23a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 导航菜单 */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-item {
  color: var(--text-color-regular);
  text-decoration: none;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: var(--border-radius-base);
  transition: all 0.3s ease;
}

.nav-item:hover {
  color: var(--primary-color);
  background-color: var(--primary-extra-light);
}

.nav-item.active {
  color: var(--primary-color);
  background-color: var(--primary-extra-light);
  font-weight: 500;
}

/* 头部操作区 */
.header-actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.theme-toggle-btn {
  margin-right: 8px;
}

/* 主内容区 */
.main-content {
  flex: 1;
  padding: 0;
  background-color: var(--bg-color-page);
  width: 100%;
  min-height: calc(100vh - 70px - 200px); /* 减去 header 和 footer 高度 */
}

/* 底部 */
.footer {
  background: var(--text-color-primary);
  color: var(--bg-color);
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  padding: 40px 0;
}

.footer-section h4 {
  color: var(--primary-color);
  margin-bottom: 16px;
  font-size: 18px;
}

.footer-section p {
  line-height: 1.6;
  color: var(--text-color-secondary);
  margin-bottom: 8px;
}

.footer-section a {
  display: block;
  color: var(--text-color-secondary);
  text-decoration: none;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: var(--primary-color);
}

.footer-bottom {
  border-top: 1px solid var(--border-color);
  padding: 20px 0;
  text-align: center;
  color: var(--text-color-secondary);
}

/* 响应式设计 */
@media (min-width: 1600px) {
  .container {
    max-width: 1600px;
    padding: 0 60px;
  }
  
  .header .container {
    padding: 0 60px;
  }
  
  .nav-menu {
    gap: 40px;
  }
  
  .nav-item {
    font-size: 18px;
    padding: 10px 20px;
  }
  
  .logo-text {
    font-size: 28px;
  }
}

@media (min-width: 1200px) and (max-width: 1599px) {
  .container {
    max-width: 1400px;
    padding: 0 40px;
  }
}

@media (max-width: 768px) {
  .header .container {
    flex-wrap: wrap;
    height: auto;
    padding: 16px 20px;
  }

  .nav-menu {
    order: 3;
    width: 100%;
    margin-top: 16px;
    justify-content: center;
    gap: 16px;
  }

  .nav-item {
    padding: 8px 12px;
    font-size: 14px;
  }

  .logo-text {
    font-size: 20px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 24px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }

  .nav-menu {
    gap: 8px;
  }

  .header-actions .el-button {
    padding: 8px 12px;
    font-size: 12px;
  }
}
</style>