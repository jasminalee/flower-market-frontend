<template>
  <div class="comment-section">
    <el-card class="comment-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>用户评论</span>
          <el-badge :value="comments.length" type="primary" v-if="comments.length > 0">
            <el-button type="text" @click="loadComments">刷新</el-button>
          </el-badge>
        </div>
      </template>

      <!-- 评论输入区 -->
      <div class="comment-input-section" v-if="authStore.isAuthenticated">
        <el-form :model="commentForm" :rules="commentRules" ref="commentFormRef">
          <el-form-item prop="content">
            <el-input
              v-model="commentForm.content"
              type="textarea"
              :rows="3"
              placeholder="请输入您的评论..."
              maxlength="500"
              show-word-limit
            />
          </el-form-item>
          
          <el-form-item prop="rating">
            <div class="rating-section">
              <span class="rating-label">评分：</span>
              <el-rate v-model="commentForm.rating" :max="5" />
            </div>
          </el-form-item>
          
          <el-form-item>
            <el-checkbox v-model="commentForm.isAnonymous">匿名评论</el-checkbox>
          </el-form-item>
          
          <el-form-item>
            <el-button 
              type="primary" 
              @click="submitComment" 
              :loading="submitting"
              round
            >
              发表评论
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <div class="comment-login-prompt" v-else>
        <el-alert
          title="请先登录后发表评论"
          type="info"
          show-icon
          :closable="false"
        >
          <template #default>
            <el-button type="primary" text @click="goToLogin">立即登录</el-button>
          </template>
        </el-alert>
      </div>

      <!-- 评论列表 -->
      <div class="comments-list" v-if="comments.length > 0">
        <div 
          v-for="comment in comments" 
          :key="comment.id" 
          class="comment-item"
        >
          <div class="comment-avatar">
            <el-avatar :icon="User" />
          </div>
          
          <div class="comment-content">
            <div class="comment-header">
              <span class="comment-author">
                {{ comment.isAnonymous ? '匿名用户' : (comment.user?.username || '用户' + comment.userId) }}
              </span>
              <el-rate 
                v-model="comment.rating" 
                disabled 
                size="small" 
                class="comment-rating"
              />
              <span class="comment-date">{{ formatDate(comment.createTime) }}</span>
            </div>
            
            <div class="comment-text">{{ comment.content }}</div>
            
            <div class="comment-actions">
              <el-button type="text" size="small" @click="replyTo(comment)">
                <el-icon><ChatLineSquare /></el-icon>
                回复
              </el-button>
            </div>
            
            <!-- 回复列表 -->
            <div 
              v-for="reply in comment.replies" 
              :key="reply.id" 
              class="reply-item"
            >
              <div class="reply-content">
                <div class="reply-header">
                  <span class="reply-author">
                    {{ reply.isAnonymous ? '匿名用户' : (reply.user?.username || '用户' + reply.userId) }}
                  </span>
                  <span class="reply-date">{{ formatDate(reply.createTime) }}</span>
                </div>
                <div class="reply-text">{{ reply.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="no-comments" v-else>
        <el-empty description="暂无评论，快来发表第一条评论吧！" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { User, ChatLineSquare } from '@element-plus/icons-vue'
import commentApi from '@/api/comment.js'
import { useAuthStore } from '@/config/store.js'

// Props
const props = defineProps({
  productId: {
    type: [String, Number],
    required: true
  }
})

// Emits
const emit = defineEmits(['comment-submitted'])

// Router
const router = useRouter()

// Store
const authStore = useAuthStore()

// 响应式数据
const comments = ref([])
const submitting = ref(false)
const commentFormRef = ref(null)

// 评论表单
const commentForm = reactive({
  content: '',
  rating: 5,
  isAnonymous: false
})

// 表单验证规则
const commentRules = {
  content: [
    { required: true, message: '请输入评论内容', trigger: 'blur' },
    { min: 5, max: 500, message: '评论内容长度应在5到500个字符之间', trigger: 'blur' }
  ],
  rating: [
    { required: true, message: '请选择评分', trigger: 'change' }
  ]
}

/**
 * 格式化日期
 */
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * 加载评论
 */
const loadComments = async () => {
  try {
    const response = await commentApi.listBySource(props.productId, 'product')
    if (response && response.code === 200) {
      // 处理评论数据，添加回复字段
      comments.value = (response.data || []).map(comment => ({
        ...comment,
        replies: []
      }))
    } else {
      ElMessage.error('加载评论失败: ' + (response?.message || '未知错误'))
    }
  } catch (error) {
    console.error('加载评论失败:', error)
    ElMessage.error('加载评论失败: ' + (error.message || '网络错误'))
  }
}

/**
 * 提交评论
 */
const submitComment = async () => {
  try {
    await commentFormRef.value.validate()
    
    submitting.value = true
    
    const commentData = {
      content: commentForm.content,
      rating: commentForm.rating,
      isAnonymous: commentForm.isAnonymous ? 1 : 0,
      sourceId: props.productId,
      sourceType: 'product',
      userId: authStore.user?.id || authStore.user?.userId || 0,
      status: 1 // 默认显示
    }
    
    const response = await commentApi.save(commentData)
    if (response && response.code === 200) {
      ElMessage.success('评论发表成功')
      // 重置表单
      commentForm.content = ''
      commentForm.rating = 5
      commentForm.isAnonymous = false
      // 重新加载评论
      loadComments()
      // 触发事件
      emit('comment-submitted')
    } else {
      ElMessage.error('发表评论失败: ' + (response?.message || '未知错误'))
    }
  } catch (error) {
    if (error.field) {
      // 表单验证错误，Element Plus 会自动显示
      return
    }
    console.error('发表评论失败:', error)
    ElMessage.error('发表评论失败: ' + (error.message || '网络错误'))
  } finally {
    submitting.value = false
  }
}

/**
 * 回复评论
 */
const replyTo = (comment) => {
  ElMessageBox.prompt('请输入回复内容', '回复评论', {
    confirmButtonText: '提交',
    cancelButtonText: '取消',
    inputType: 'textarea',
    inputPlaceholder: '请输入回复内容...',
    inputValidator: (value) => {
      if (!value || value.trim().length === 0) {
        return '回复内容不能为空'
      }
      if (value.length > 500) {
        return '回复内容不能超过500个字符'
      }
      return true
    }
  }).then(async ({ value }) => {
    try {
      const replyData = {
        content: value,
        sourceId: props.productId,
        sourceType: 'product',
        userId: authStore.user?.id || authStore.user?.userId || 0,
        isAnonymous: comment.isAnonymous ? 1 : 0,
        status: 1
      }
      
      const response = await commentApi.save(replyData)
      if (response && response.code === 200) {
        ElMessage.success('回复成功')
        loadComments() // 重新加载评论
      } else {
        ElMessage.error('回复失败: ' + (response?.message || '未知错误'))
      }
    } catch (error) {
      console.error('回复失败:', error)
      ElMessage.error('回复失败: ' + (error.message || '网络错误'))
    }
  }).catch(() => {
    // 用户取消操作
  })
}

/**
 * 跳转到登录页面
 */
const goToLogin = () => {
  router.push('/login')
}

// 生命周期
onMounted(() => {
  loadComments()
})
</script>

<style src="@/assets/comment.css"></style>