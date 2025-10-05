<template>
  <div class="public-layout">
    <!-- 顶部导航栏 -->
    <header class="header">
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
          </nav>
        </el-col>

        <!-- 右侧操作区 -->
        <el-col :span="8">
          <div class="header-actions">
            <!-- 主题切换 -->
            <ThemeToggle mode="icon" :show-text="false" class="theme-toggle-btn" />
            
            <el-button type="primary" @click="goToLogin">
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
          <p>&copy; 2025 花卉市场. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { User, House } from '@element-plus/icons-vue'
import { ElRow, ElCol } from 'element-plus'
import ThemeToggle from '../ThemeToggle.vue'

const router = useRouter()

/**
 * 跳转到登录页面
 */
const goToLogin = () => {
  router.push('/login')
}
</script>

<style src="@/assets/publicLayout.css" scoped>

</style>