<template>
  <div class="forum-category">
    <!-- 板块头部 -->
    <div class="forum-header">
      <div class="forum-header-content">
        <h1>{{ category.name || '板块' }}</h1>
        <p>{{ category.description || '板块描述' }}</p>
      </div>
    </div>

    <!-- 帖子列表区域 -->
    <div class="posts-section">
      <div class="container">
        <!-- 发帖按钮 -->
        <div class="post-actions">
          <el-button type="primary" @click="createPost">
            <el-icon><Plus /></el-icon>
            发表新帖
          </el-button>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="8" animated />
        </div>

        <!-- 帖子网格 -->
        <div v-else-if="posts.length > 0">
          <el-row :gutter="20" class="posts-grid">
            <el-col :span="24">
              <el-card
                v-for="post in posts" 
                :key="post.id"
                class="post-card"
                @click="viewPost(post)"
                shadow="hover"
              >
                <div class="post-header">
                  <div class="post-avatar">
                    {{ post.userAvatar || '用' }}
                  </div>
                  <div class="post-info">
                    <h3 class="post-title">{{ post.title }}</h3>
                    <div class="post-meta">
                      <span class="post-meta-item">
                        <el-icon><User /></el-icon>
                        {{ post.userName || '匿名用户' }}
                      </span>
                      <span class="post-meta-item">
                        <el-icon><Clock /></el-icon>
                        {{ formatDate(post.createTime) }}
                      </span>
                      <span class="post-meta-item">
                        <el-icon><View /></el-icon>
                        {{ post.viewCount || 0 }}
                      </span>
                    </div>
                  </div>
                  <div class="post-tags">
                    <el-tag v-if="post.isTop" type="danger" size="small">置顶</el-tag>
                    <el-tag v-if="post.isEssence" type="warning" size="small">精华</el-tag>
                  </div>
                </div>
                <div class="post-content">
                  <div class="post-preview" v-html="getPostPreview(post.content)"></div>
                </div>
                <div class="post-footer">
                  <div class="post-stats">
                    <span class="post-stat-item">
                      <el-icon><ChatLineRound /></el-icon>
                      {{ post.commentCount || 0 }} 回复
                    </span>
                    <span class="post-stat-item">
                      <el-icon><Star /></el-icon>
                      {{ post.likeCount || 0 }} 点赞
                    </span>
                  </div>
                  <div class="post-category">
                    {{ category.name }}
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <!-- 无结果状态 -->
        <div v-else class="no-results">
          <el-empty description="暂无帖子">
            <el-button type="primary" @click="createPost">发表第一篇帖子</el-button>
          </el-empty>
        </div>

        <!-- 分页 -->
        <div v-if="posts.length > 0" class="pagination-container">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
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
  Plus, User, Clock, View, ChatLineRound, Star 
} from '@element-plus/icons-vue'
import forumCategoryApi from '@/api/forumCategory'
import forumPostApi from '@/api/forumPost'

// 路由
const router = useRouter()
const route = useRoute()

// 响应式数据
const loading = ref(true)
const category = ref({})
const posts = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

/**
 * 查看帖子详情
 */
const viewPost = (post) => {
  // 跳转到帖子详情页
  router.push(`/forum/post/${post.id}`)
}

/**
 * 发表新帖
 */
const createPost = () => {
  ElMessage.info('请先登录后发表帖子')
  // 跳转到登录页
  router.push('/login')
}

/**
 * 格式化日期
 */
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

/**
 * 获取帖子预览内容
 */
const getPostPreview = (content) => {
  if (!content) return ''
  // 简单的文本截取，实际应用中可能需要更复杂的处理
  const text = content.replace(/<[^>]*>/g, '') // 去除HTML标签
  return text.length > 100 ? text.substring(0, 100) + '...' : text
}

const handleSizeChange = (newSize) => {
  pageSize.value = newSize
  currentPage.value = 1
  fetchPosts()
}

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
  fetchPosts()
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * 获取板块信息
 */
const fetchCategory = async (id) => {
  try {
    const response = await forumCategoryApi.getById(id)
    if (response.code === 200) {
      category.value = response.data
    } else {
      ElMessage.error(response.message || '获取板块信息失败')
    }
  } catch (error) {
    console.error('获取板块信息失败:', error)
    ElMessage.error('获取板块信息失败')
  }
}

/**
 * 获取帖子数据
 */
const fetchPosts = async () => {
  try {
    loading.value = true
    
    // 构建请求参数
    const params = {
      current: currentPage.value,
      size: pageSize.value,
      categoryId: route.params.id,
      status: 1 // 只获取正常状态的帖子
    }
    
    // 调用API获取帖子数据
    const response = await forumPostApi.pageByCategory(route.params.id, params)
    
    if (response.code === 200) {
      posts.value = response.data.records
      total.value = response.data.total
      
      // 为每个帖子添加模拟数据
      posts.value.forEach(post => {
        post.userName = post.userName || '用户' + Math.floor(Math.random() * 1000)
        post.userAvatar = post.userAvatar || '用'
        post.viewCount = post.viewCount || Math.floor(Math.random() * 1000)
        post.commentCount = post.commentCount || Math.floor(Math.random() * 100)
        post.likeCount = post.likeCount || Math.floor(Math.random() * 500)
      })
    } else {
      ElMessage.error(response.message || '获取帖子数据失败')
    }
  } catch (error) {
    console.error('获取帖子数据失败:', error)
    ElMessage.error('获取帖子数据失败')
  } finally {
    loading.value = false
  }
}

// 生命周期
onMounted(() => {
  fetchCategory(route.params.id)
  fetchPosts()
})
</script>

<style src="@/assets/forum.css"></style>