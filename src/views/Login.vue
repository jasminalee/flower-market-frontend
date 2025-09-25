<template>
  <div class="login-page">
    <div class="login-container">
      <!-- 左侧背景区域 -->
      <div class="login-bg">
        <div class="bg-content">
          <h1>花卉市场管理系统</h1>
          <p>专业的花卉产品管理平台</p>
          <div class="features">
            <div class="feature-item">
              <el-icon><CircleCheck /></el-icon>
              <span>权限管理</span>
            </div>
            <div class="feature-item">
              <el-icon><CircleCheck /></el-icon>
              <span>产品管理</span>
            </div>
            <div class="feature-item">
              <el-icon><CircleCheck /></el-icon>
              <span>订单管理</span>
            </div>
            <div class="feature-item">
              <el-icon><CircleCheck /></el-icon>
              <span>数据统计</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧登录表单 -->
      <div class="login-form-container">
        <div class="login-form">
          <!-- Logo 和标题 -->
          <div class="form-header">
            <div class="logo">
              <el-icon size="40" color="#409eff">
                <Management />
              </el-icon>
            </div>
            <h2>登录管理后台</h2>
            <p>请输入您的账户信息</p>
          </div>

          <!-- 登录表单 -->
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            size="large"
            @submit.prevent="handleLogin"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名"
                :prefix-icon="User"
                clearable
                @keyup.enter="handleLogin"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                :prefix-icon="Lock"
                show-password
                clearable
                @keyup.enter="handleLogin"
              />
            </el-form-item>

            <el-form-item>
              <div class="form-options">
                <el-checkbox v-model="loginForm.remember">
                  记住我
                </el-checkbox>
                <el-link type="primary" :underline="false">
                  忘记密码？
                </el-link>
              </div>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                size="large"
                :loading="loading"
                @click="handleLogin"
                class="login-btn"
              >
                {{ loading ? '登录中...' : '登录' }}
              </el-button>
            </el-form-item>
          </el-form>

          <!-- 演示账户信息 -->
          <div class="demo-accounts">
            <el-divider>演示账户</el-divider>
            <div class="demo-list">
              <div class="demo-item" @click="fillDemoAccount('admin')">
                <strong>超级管理员</strong>
                <span>admin / admin123</span>
              </div>
              <div class="demo-item" @click="fillDemoAccount('manager')">
                <strong>管理员</strong>
                <span>manager / manager123</span>
              </div>
              <div class="demo-item" @click="fillDemoAccount('user')">
                <strong>普通用户</strong>
                <span>user / user123</span>
              </div>
            </div>
          </div>

          <!-- 返回首页 -->
          <div class="back-home">
            <el-button type="text" @click="goHome">
              <el-icon><ArrowLeft /></el-icon>
              返回首页
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { ElMessage } from 'element-plus'
import { User, Lock, Management, CircleCheck, ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// 响应式数据
const loading = ref(false)
const loginFormRef = ref()

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
  remember: false
})

// 表单验证规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

/**
 * 处理登录
 */
const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    // 表单验证
    await loginFormRef.value.validate()
    
    loading.value = true

    // 执行登录
    const success = await authStore.login({
      username: loginForm.username,
      password: loginForm.password
    })

    if (success) {
      ElMessage.success('登录成功')
      
      // 跳转到目标页面或默认页面
      const redirect = route.query.redirect || '/admin/dashboard'
      router.push(redirect)
    } else {
      ElMessage.error('用户名或密码错误')
    }
  } catch (error) {
    console.error('登录失败:', error)
    ElMessage.error('登录失败，请重试')
  } finally {
    loading.value = false
  }
}

/**
 * 填充演示账户
 */
const fillDemoAccount = (type) => {
  const accounts = {
    admin: { username: 'admin', password: 'admin123' },
    manager: { username: 'manager', password: 'manager123' },
    user: { username: 'user', password: 'user123' }
  }
  
  const account = accounts[type]
  if (account) {
    loginForm.username = account.username
    loginForm.password = account.password
    ElMessage.info(`已填充${type === 'admin' ? '超级管理员' : type === 'manager' ? '管理员' : '普通用户'}账户信息`)
  }
}

/**
 * 返回首页
 */
const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 1000px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 600px;
}

/* 左侧背景区域 */
.login-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 40px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.login-bg::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.1"><path d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>') repeat;
  opacity: 0.1;
  animation: float 20s infinite linear;
}

@keyframes float {
  0% { transform: translateX(0) translateY(0) rotate(0deg); }
  100% { transform: translateX(-60px) translateY(-60px) rotate(360deg); }
}

.bg-content {
  position: relative;
  z-index: 1;
}

.bg-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.2;
}

.bg-content p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 40px;
}

.features {
  display: grid;
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
}

.feature-item .el-icon {
  color: #67c23a;
}

/* 右侧登录表单 */
.login-form-container {
  padding: 60px 40px;
  display: flex;
  align-items: center;
}

.login-form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  margin-bottom: 16px;
}

.form-header h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.form-header p {
  color: #666;
  font-size: 14px;
}

/* 表单样式 */
.el-form-item {
  margin-bottom: 24px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.login-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
}

/* 演示账户 */
.demo-accounts {
  margin-top: 32px;
}

.demo-list {
  display: grid;
  gap: 8px;
}

.demo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f5f7fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.demo-item:hover {
  background: #e1f3ff;
  transform: translateX(4px);
}

.demo-item strong {
  color: #333;
  font-size: 14px;
}

.demo-item span {
  color: #666;
  font-size: 12px;
  font-family: monospace;
}

/* 返回首页 */
.back-home {
  margin-top: 24px;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-container {
    grid-template-columns: 1fr;
    max-width: 400px;
  }

  .login-bg {
    display: none;
  }

  .login-form-container {
    padding: 40px 24px;
  }

  .bg-content h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: 16px;
  }

  .login-form-container {
    padding: 32px 20px;
  }

  .form-header h2 {
    font-size: 1.5rem;
  }

  .demo-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}

/* 动画效果 */
.login-form {
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

.bg-content {
  animation: slideInLeft 0.8s ease-out;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>