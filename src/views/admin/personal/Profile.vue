<template>
  <div class="profile-container">
    <el-card class="profile-card">
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
        </div>
      </template>
      
      <el-form
        ref="profileFormRef"
        :model="profileForm"
        :rules="profileRules"
        label-width="120px"
        class="profile-form"
      >
        <el-form-item label="用户ID" prop="id">
          <el-input v-model="profileForm.id" disabled />
        </el-form-item>
        
        <el-form-item label="用户名" prop="username">
          <el-input v-model="profileForm.username" disabled />
        </el-form-item>
        
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="profileForm.nickname" />
        </el-form-item>
        
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="profileForm.email" />
        </el-form-item>
        
        <el-form-item label="电话" prop="phone">
          <el-input v-model="profileForm.phone" />
        </el-form-item>
        
        <el-form-item label="地址" prop="addr">
          <el-input v-model="profileForm.addr" type="textarea" />
        </el-form-item>
        
        <el-form-item label="头像" prop="avatar">
          <el-input v-model="profileForm.avatar" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm" :loading="loading">保存</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/config/store.js'
import { ElMessage } from 'element-plus'
import sysUserApi from '@/api/sysUser.js'

// 获取认证存储实例
const authStore = useAuthStore()

// 表单引用
const profileFormRef = ref()

// 加载状态
const loading = ref(false)

// 表单数据
const profileForm = reactive({
  id: '',
  username: '',
  nickname: '',
  email: '',
  phone: '',
  addr: '',
  avatar: '',
  createTime: '',
  updateTime: '',
  status: 1
})

// 表单验证规则
const profileRules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
}

/**
 * 提交表单
 */
const submitForm = async () => {
  if (!profileFormRef.value) return
  
  await profileFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // 调用API更新用户信息
        const result = await sysUserApi.save(profileForm)
        
        if (result && result.code === 200) {
          ElMessage.success('个人信息更新成功')
          
          // 更新store中的用户信息
          authStore.user = { ...authStore.user, ...profileForm }
          
          // 更新本地存储
          localStorage.setItem('user', JSON.stringify(authStore.user))
        } else {
          ElMessage.error(result?.message || '更新失败')
        }
      } catch (error) {
        ElMessage.error('更新失败：' + (error.message || '网络错误'))
      } finally {
        loading.value = false
      }
    }
  })
}

/**
 * 重置表单
 */
const resetForm = () => {
  if (profileFormRef.value) {
    profileFormRef.value.resetFields()
  }
  
  // 重新加载用户信息
  loadUserInfo()
}

/**
 * 加载用户信息
 */
const loadUserInfo = async () => {
  try {
    if (authStore.user && authStore.user.id) {
      const result = await sysUserApi.getById(authStore.user.id)
      
      if (result && result.code === 200) {
        Object.assign(profileForm, result.data)
      } else {
        ElMessage.error('获取用户信息失败: ' + (result?.message || '未知错误'))
      }
    }
  } catch (error) {
    ElMessage.error('获取用户信息失败：' + (error.message || '网络错误'))
  }
}

// 组件挂载时加载用户信息
onMounted(() => {
  loadUserInfo()
})
</script>

<style scoped>
@import '@/assets/profile.css';
</style>