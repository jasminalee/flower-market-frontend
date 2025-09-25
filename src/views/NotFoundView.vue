<template>
  <div class="not-found-view">
    <el-card class="not-found-card">
      <div class="not-found-content">
        <el-icon class="not-found-icon"><Warning /></el-icon>
        <h1>404</h1>
        <h2>页面未找到</h2>
        <p>抱歉，您访问的页面不存在。</p>
        <div class="actions">
          <el-button type="primary" @click="goHome">返回首页</el-button>
          <el-button @click="goBack">返回上一页</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Warning } from '@element-plus/icons-vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.not-found-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.not-found-card {
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.not-found-content {
  padding: 40px 20px;
}

.not-found-icon {
  font-size: 60px;
  color: #e6a23c;
  margin-bottom: 20px;
}

.not-found-content h1 {
  font-size: 48px;
  margin: 0 0 10px 0;
  color: #333;
}

.not-found-content h2 {
  font-size: 24px;
  margin: 0 0 20px 0;
  color: #666;
}

.not-found-content p {
  font-size: 16px;
  color: #999;
  margin-bottom: 30px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>