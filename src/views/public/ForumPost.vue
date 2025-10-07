<template>
  <div class="forum-post-page">
    <div class="forum-post-container">
      <!-- 返回按钮 -->
      <div class="back-navigation">
        <el-button 
          @click="goBack" 
          type="primary" 
          plain
          round
        >
          <el-icon><ArrowLeft /></el-icon>
          返回论坛
        </el-button>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="15" animated />
      </div>

      <!-- 帖子内容 -->
      <div v-else class="post-content-wrapper">
        <!-- 帖子头部信息 -->
        <el-card class="post-header-card" shadow="never">
          <template #header>
            <div class="post-header-content">
              <h1 class="post-title">{{ post.title }}</h1>
              <div class="post-meta-info">
                <div class="author-info">
                  <el-avatar 
                    :size="40" 
                    :src="post.userAvatar" 
                    class="author-avatar"
                  >
                    <el-icon><User /></el-icon>
                  </el-avatar>
                  <div class="author-details">
                    <span class="author-name">{{ post.userName || '匿名用户' }}</span>
                    <span class="post-time">
                      <el-icon><Clock /></el-icon>
                      {{ formatDate(post.createTime) }}
                    </span>
                  </div>
                </div>
                
                <div class="post-stats-actions">
                  <div class="post-stats">
                    <el-tag v-if="post.isTop" type="danger" effect="dark">置顶</el-tag>
                    <el-tag v-if="post.isEssence" type="warning" effect="dark">精华</el-tag>
                    <el-tag v-if="post.postType === 2" type="success" effect="dark">视频</el-tag>
                  </div>
                  
                  <div class="post-actions">
                    <el-button 
                      @click="likePost" 
                      :type="isLiked ? 'primary' : 'default'"
                      round
                    >
                      <el-icon><Star /></el-icon>
                      {{ isLiked ? '已点赞' : '点赞' }} 
                      <el-badge 
                        :value="post.likeCount || 0" 
                        :type="isLiked ? 'primary' : 'info'"
                        class="action-badge"
                      />
                    </el-button>
                    <el-button @click="favoritePost" round>
                      <el-icon><StarFilled /></el-icon>
                      收藏
                    </el-button>
                    <el-button @click="sharePost" round>
                      <el-icon><Share /></el-icon>
                      分享
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </template>
          
          <!-- 帖子正文内容 -->
          <div class="post-body-content">
            <div class="post-content" v-html="post.content"></div>
          </div>
        </el-card>

        <!-- 评论区域 -->
        <el-card class="comments-card" shadow="never">
          <template #header>
            <div class="comments-header">
              <h2>
                <el-icon><ChatLineRound /></el-icon>
                评论 ({{ post.commentCount || 0 }})
              </h2>
            </div>
          </template>
          
          <!-- 评论表单 -->
          <div class="comment-form-section">
            <el-form 
              :model="commentForm" 
              ref="commentFormRef"
              class="comment-form"
            >
              <el-form-item prop="content">
                <el-input
                  v-model="commentForm.content"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入您的评论..."
                  maxlength="500"
                  show-word-limit
                  resize="none"
                />
              </el-form-item>
              <div class="comment-form-actions">
                <el-button 
                  type="primary" 
                  @click="submitComment"
                  :disabled="!commentForm.content || commentForm.content.trim().length === 0"
                  round
                >
                  <el-icon><ChatLineRound /></el-icon>
                  发表评论
                </el-button>
              </div>
            </el-form>
          </div>
          
          <!-- 评论列表 -->
          <div class="comments-list">
            <div 
              v-for="comment in comments" 
              :key="comment.id" 
              class="comment-item"
            >
              <div class="comment-header">
                <el-avatar 
                  :size="36" 
                  :src="comment.userAvatar" 
                  class="comment-avatar"
                >
                  {{ getAvatarText(comment.userName) }}
                </el-avatar>
                <div class="comment-info">
                  <span class="comment-author">{{ comment.userName || '匿名用户' }}</span>
                  <span class="comment-time">{{ formatDate(comment.createTime) }}</span>
                </div>
              </div>
              <div class="comment-content">
                {{ comment.content }}
              </div>
            </div>
            
            <!-- 无评论状态 -->
            <div v-if="comments.length === 0" class="no-comments">
              <el-empty description="暂无评论，快来发表第一条评论吧！" />
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  ArrowLeft, User, Clock, View, ChatLineRound, Star, StarFilled, Share
} from '@element-plus/icons-vue'
import forumPostApi from '@/api/forumPost'
import forumCommentApi from '@/api/forumComment'
import { useAuthStore } from '@/config/store.js'

const authStore = useAuthStore()

// 路由
const router = useRouter()
const route = useRoute()

// 表单引用
const commentFormRef = ref()

// 响应式数据
const loading = ref(true)
const post = ref({})
const comments = ref([])
const isLiked = ref(false)

// 评论表单
const commentForm = reactive({
  content: ''
})

/**
 * 返回上一页
 */
const goBack = () => {
  router.go(-1)
}

/**
 * 格式化日期
 */
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * 获取头像文字
 */
const getAvatarText = (name) => {
  if (!name) return '匿'
  return name.charAt(0).toUpperCase()
}

/**
 * 点赞帖子
 */
const likePost = () => {
  isLiked.value = !isLiked.value
  ElMessage.success(isLiked.value ? '点赞成功' : '取消点赞')
}

/**
 * 收藏帖子
 */
const favoritePost = () => {
  ElMessage.success('收藏成功')
}

/**
 * 分享帖子
 */
const sharePost = () => {
  ElMessageBox.alert('分享功能开发中', '提示', {
    confirmButtonText: '确定'
  })
}

/**
 * 提交评论
 */
const submitComment = async () => {
  if (!commentForm.content || commentForm.content.trim().length === 0) {
    ElMessage.warning('请输入评论内容')
    return
  }
  
  try {
    // 构造评论对象
    const comment = {
      content: commentForm.content,
      sourceId: route.params.id,
      sourceType: 'forum',
      userId: authStore.user?.id || 1, // 使用当前登录用户ID，如果未登录则使用默认值
      status: 1
    }
    
    const response = await forumCommentApi.save(comment)
    if (response.code === 200) {
      ElMessage.success('评论发表成功')
      commentForm.content = ''
      // 重新加载评论
      fetchComments()
    } else {
      ElMessage.error(response.message || '评论发表失败')
    }
  } catch (error) {
    console.error('评论发表失败:', error)
    ElMessage.error('评论发表失败: ' + (error.message || ''))
  }
}

/**
 * 获取帖子信息
 */
const fetchPost = async (id) => {
  try {
    loading.value = true
    const response = await forumPostApi.getById(id)
    if (response.code === 200) {
      post.value = response.data
      
      // 添加模拟数据
      post.value.userName = post.value.userName || '用户' + Math.floor(Math.random() * 1000)
      post.value.userAvatar = post.value.userAvatar || ''
      post.value.viewCount = (post.value.viewCount || 0) + 1 // 增加浏览量
      post.value.likeCount = post.value.likeCount || Math.floor(Math.random() * 500)
      post.value.commentCount = post.value.commentCount || Math.floor(Math.random() * 100)
    } else {
      ElMessage.error(response.message || '获取帖子信息失败')
    }
  } catch (error) {
    console.error('获取帖子信息失败:', error)
    ElMessage.error('获取帖子信息失败: ' + (error.message || ''))
  } finally {
    loading.value = false
  }
}

/**
 * 获取评论列表
 */
const fetchComments = async () => {
  try {
    const postId = route.params.id
    if (!postId) {
      ElMessage.error('帖子ID不存在')
      return
    }
    
    const response = await forumCommentApi.getByPost(postId)
    if (response.code === 200) {
      comments.value = response.data.map(comment => ({
        ...comment,
        userName: comment.userName || '用户' + Math.floor(Math.random() * 1000),
        userAvatar: comment.userAvatar || ''
      }))
    } else {
      ElMessage.error(response.message || '获取评论失败')
    }
  } catch (error) {
    console.error('获取评论失败:', error)
    ElMessage.error('获取评论失败: ' + (error.message || ''))
  }
}

// 生命周期
onMounted(() => {
  const postId = route.params.id
  if (postId) {
    fetchPost(postId)
    fetchComments()
  } else {
    ElMessage.error('帖子ID不存在')
    loading.value = false
  }
})
</script>

<style scoped>
.forum-post-page {
  background-color: var(--bg-color-page);
  min-height: 100vh;
  padding: 20px 0;
}

.forum-post-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.back-navigation {
  margin-bottom: 20px;
}

.post-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-header-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  border: none;
}

.post-header-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: var(--text-color-primary);
  line-height: 1.3;
}

.post-meta-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 15px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  flex-shrink: 0;
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.author-name {
  font-weight: 600;
  color: var(--text-color-primary);
  font-size: 16px;
}

.post-time {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-color-secondary);
  font-size: 14px;
}

.post-stats-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.post-stats {
  display: flex;
  gap: 8px;
}

.post-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.action-badge :deep(.el-badge__content) {
  transform: translateY(-50%) translateX(100%) scale(0.8) !important;
}

.post-body-content {
  padding: 20px 0;
}

.post-content {
  line-height: 1.8;
  color: var(--text-color-regular);
  font-size: 16px;
}

.post-content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 16px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.comments-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  border: none;
}

.comments-header h2 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color-primary);
  font-size: 22px;
}

.comment-form-section {
  margin-bottom: 30px;
}

.comment-form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.comment-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--border-color-lighter);
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.comment-avatar {
  margin-right: 12px;
  flex-shrink: 0;
}

.comment-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.comment-author {
  font-weight: 600;
  color: var(--text-color-primary);
  font-size: 15px;
}

.comment-time {
  color: var(--text-color-secondary);
  font-size: 13px;
}

.comment-content {
  margin-left: 48px;
  line-height: 1.6;
  color: var(--text-color-regular);
  font-size: 15px;
}

.no-comments {
  padding: 40px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .forum-post-container {
    padding: 0 15px;
  }
  
  .post-title {
    font-size: 24px;
  }
  
  .post-meta-info {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .post-stats-actions {
    align-items: flex-start;
    width: 100%;
  }
  
  .post-actions {
    width: 100%;
    justify-content: flex-start;
  }
  
  .comment-content {
    margin-left: 0;
    margin-top: 12px;
  }
  
  .post-content {
    font-size: 15px;
  }
  
  .comments-header h2 {
    font-size: 20px;
  }
}
</style>