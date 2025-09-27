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
                <span>admin / admin</span>
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
import { useAuthStore } from '@/config/store.js'
import { ElMessage } from 'element-plus'
import { User, Lock, Management, CircleCheck, ArrowLeft } from '@element-plus/icons-vue'
import '@/assets/login.css'

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
    { required: true, message: '请输入密码', trigger: 'blur' }
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
    admin: { username: 'admin', password: 'admin' }
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

</style>