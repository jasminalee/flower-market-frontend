<template>
  <div class="forum-post">
    <!-- 帖子详情 -->
    <div class="container">
      <!-- 返回按钮 -->
      <div class="back-button">
        <el-button @click="goBack">
          <el-icon><ArrowLeft /></el-icon>
          返回
        </el-button>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="15" animated />
      </div>

      <!-- 帖子内容 -->
      <div v-else>
        <el-card class="post-detail-card" shadow="never">
          <div class="post-detail-header">
            <h1 class="post-detail-title">{{ post.title }}</h1>
            <div class="post-detail-meta">
              <div class="post-author">
                <el-avatar :size="32" :src="post.userAvatar">
                  <el-icon><User /></el-icon>
                </el-avatar>
                <span class="author-name">{{ post.userName || '匿名用户' }}</span>
              </div>
              <div class="post-time">
                <el-icon><Clock /></el-icon>
                {{ formatDate(post.createTime) }}
              </div>
              <div class="post-stats">
                <span class="stat-item">
                  <el-icon><View /></el-icon>
                  {{ post.viewCount || 0 }} 浏览
                </span>
                <span class="stat-item">
                  <el-icon><ChatLineRound /></el-icon>
                  {{ post.commentCount || 0 }} 回复
                </span>
                <span class="stat-item">
                  <el-icon><Star /></el-icon>
                  {{ post.likeCount || 0 }} 点赞
                </span>
              </div>
            </div>
          </div>
          <div class="post-detail-content" v-html="post.content"></div>
          <div class="post-detail-footer">
            <div class="post-tags">
              <el-tag v-if="post.isTop" type="danger">置顶</el-tag>
              <el-tag v-if="post.isEssence" type="warning">精华</el-tag>
              <el-tag v-if="post.postType === 2" type="success">视频</el-tag>
            </div>
            <div class="post-actions">
              <el-button @click="likePost" :type="isLiked ? 'primary' : 'default'">
                <el-icon><Star /></el-icon>
                {{ isLiked ? '已点赞' : '点赞' }} ({{ post.likeCount || 0 }})
              </el-button>
              <el-button @click="favoritePost">
                <el-icon><StarFilled /></el-icon>
                收藏
              </el-button>
            </div>
          </div>
        </el-card>

        <!-- 评论区域 -->
        <div class="comments-section">
          <h2>评论 ({{ post.commentCount || 0 }})</h2>
          
          <!-- 评论表单 -->
          <div class="comment-form">
            <el-input
              v-model="commentContent"
              type="textarea"
              :rows="4"
              placeholder="请输入您的评论..."
              maxlength="500"
              show-word-limit
            ></el-input>
            <div class="comment-actions">
              <el-button type="primary" @click="submitComment" :disabled="!commentContent.trim()">
                <el-icon><ChatLineRound /></el-icon>
                发表评论
              </el-button>
            </div>
          </div>

          <!-- 评论列表 -->
          <div class="comment-list">
            <div 
              v-for="comment in comments" 
              :key="comment.id" 
              class="comment-item"
            >
              <div class="comment-header">
                <div class="comment-avatar">
                  {{ comment.userAvatar || '用' }}
                </div>
                <div class="comment-author">{{ comment.userName || '匿名用户' }}</div>
                <div class="comment-time">{{ formatDate(comment.createTime) }}</div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { 
  ArrowLeft, User, Clock, View, ChatLineRound, Star, StarFilled 
} from '@element-plus/icons-vue'
import forumPostApi from '@/api/forumPost'
import forumCommentApi from '@/api/forumComment'
import { useAuthStore } from '@/config/store.js'

const authStore = useAuthStore()

// 路由
const router = useRouter()
const route = useRoute()

// 响应式数据
const loading = ref(true)
const post = ref({})
const comments = ref([])
const commentContent = ref('')
const isLiked = ref(false)

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
  return date.toLocaleString()
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
 * 提交评论
 */
const submitComment = async () => {
  if (!commentContent.value.trim()) {
    ElMessage.warning('请输入评论内容')
    return
  }
  
  try {
    // 构造评论对象
    const comment = {
      content: commentContent.value,
      sourceId: route.params.id,
      sourceType: 'forum',
      userId: authStore.user?.id || 1, // 使用当前登录用户ID，如果未登录则使用默认值
      status: 1
    }
    
    const response = await forumCommentApi.save(comment)
    if (response.code === 200) {
      ElMessage.success('评论发表成功')
      commentContent.value = ''
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
    console.log('正在获取帖子信息，ID:', id)
    const response = await forumPostApi.getById(id)
    console.log('获取帖子信息响应:', response)
    if (response.code === 200) {
      post.value = response.data
      console.log('帖子数据:', post.value)
      
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
    
    console.log('正在获取评论信息，帖子ID:', postId)
    const response = await forumCommentApi.getByPost(postId)
    console.log('获取评论信息响应:', response)
    if (response.code === 200) {
      comments.value = response.data.map(comment => ({
        ...comment,
        userName: comment.userName || '用户' + Math.floor(Math.random() * 1000),
        userAvatar: comment.userAvatar || '用'
      }))
      console.log('评论数据:', comments.value)
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
  console.log('组件挂载，帖子ID:', postId)
  if (postId) {
    fetchPost(postId)
    fetchComments()
  } else {
    ElMessage.error('帖子ID不存在')
    loading.value = false
  }
})
</script>

<style src="@/assets/forum.css"></style>