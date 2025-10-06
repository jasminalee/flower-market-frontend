<template>
  <el-page-header class="page-header" title="个人中心">
    <template #content>
      个人信息
    </template>
  </el-page-header>
  <div class="profile-container">
    <el-card class="profile-card">

      
      <el-form
        ref="profileFormRef"
        :model="profileForm"
        :rules="profileRules"
        label-width="120px"
        class="profile-form"
      >
        <el-form-item label="头像" prop="avatar">
          <div class="avatar-selection">
            <!-- 预设头像选择 -->
            <div class="avatar-options">
              <div 
                v-for="avatar in avatarOptions" 
                :key="avatar"
                class="avatar-option"
                :class="{ selected: profileForm.avatar === avatar }"
                @click="selectAvatar(avatar)"
              >
                <el-image 
                  :src="avatar" 
                  class="avatar-preview"
                  fit="cover"
                  lazy
                />
              </div>
            </div>
            
            <!-- 或者上传自定义头像 -->
            <div class="custom-avatar-upload">
              <span class="upload-label">或上传自定义头像:</span>
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :on-change="handleAvatarChange"
                :disabled="loading"
              >
                <el-button size="small" type="primary">选择文件</el-button>
              </el-upload>
            </div>
            
            <!-- 当前选中的头像预览 -->
            <div class="current-avatar-preview">
              <span>当前头像:</span>
              <el-image 
                :src="profileForm.avatar || defaultAvatar" 
                class="current-avatar"
                fit="cover"
                lazy
              />
            </div>
          </div>
        </el-form-item>
        
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
import { Plus } from '@element-plus/icons-vue'
import sysUserApi from '@/api/sysUser.js'
import apiClient from '@/api/apiClient.js'

// 获取认证存储实例
const authStore = useAuthStore()

// 表单引用
const profileFormRef = ref()

// 加载状态
const loading = ref(false)

// API基础URL
const API_BASE_URL = apiClient.raw.defaults.baseURL || 'http://localhost:18091'
const uploadUrl = API_BASE_URL + "/api/upload/image"

// 默认头像
const defaultAvatar =  API_BASE_URL+"/images/avater/girl.png"

// 预设头像选项
const avatarOptions = [
  API_BASE_URL+"/images/avater/girl.png",
  API_BASE_URL+"/images/avater/man.png",
  API_BASE_URL+"/images/avater/girl1.png",
  API_BASE_URL+"/images/avater/man1.png",
]

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
 * 选择预设头像
 */
const selectAvatar = (avatar) => {
  profileForm.avatar = avatar
}

/**
 * 处理头像上传成功
 */
const handleAvatarSuccess = (response, uploadFile) => {
  if (response && response.code === 200) {
    console.log('头像上传成功:', response)
    // 检查返回的是否是完整URL，如果不是则拼接基础URL
    if (response.data && response.data.startsWith('http')) {
      profileForm.avatar = response.data
    } else {
      profileForm.avatar = API_BASE_URL + response.data
    }
    ElMessage.success('头像上传成功')
  } else {
    // 如果上传失败，移除预览图片
    profileForm.avatar = ''
    ElMessage.error('头像上传失败')
  }
}

/**
 * 上传前检查
 */
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('头像图片必须是 JPG 或 PNG 格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像图片大小不能超过 2MB!')
    return false
  }
  return true
}

/**
 * 处理头像预览
 */
const handleAvatarChange = (file) => {
  // 创建预览URL
  const previewUrl = URL.createObjectURL(file.raw)
  console.log('file:', file)
  console.log('previewUrl:', previewUrl)

  // 为了预览效果，我们可以临时设置预览URL，但会在上传成功后替换
  if (!profileForm.avatar || profileForm.avatar.startsWith('blob:')) {
    profileForm.avatar = previewUrl
  }
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

<style src="@/assets/profile.css" scoped>

</style>