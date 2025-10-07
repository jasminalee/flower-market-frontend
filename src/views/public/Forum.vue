<template>
  <!-- 论坛头部 -->
  <div class="page-header">
    <div class="page-header-content">
      <h1>后花园</h1>
      <p>分享花卉知识，交流养护经验</p>
    </div>
  </div>
  <div class="forum">
    <div class="container">
      <el-row :gutter="20" class="forum-layout">
        <!-- 左侧分类导航 -->
        <el-col :span="4" class="category-sidebar">
          <el-card class="category-card">
            <template #header>
              <div class="card-header">
                <span>论坛板块</span>
              </div>
            </template>
            <el-menu
              :default-active="activeCategory"
              class="category-menu"
              @select="handleCategorySelect"
            >
              <el-menu-item index="all">
                <el-icon><House /></el-icon>
                <span>全部帖子</span>
              </el-menu-item>
              <div v-for="category in categories" :key="category.id">
                <!-- 一级分类 -->
                <el-sub-menu 
                  v-if="category.children && category.children.length > 0" 
                  :index="category.id.toString()"
                >
                  <template #title>
                    <el-icon><Folder /></el-icon>
                    <span>{{ category.name }}</span>
                  </template>
                  <!-- 二级分类 -->
                  <el-menu-item 
                    v-for="child in category.children" 
                    :key="child.id" 
                    :index="child.id.toString()"
                  >
                    <el-icon><Document /></el-icon>
                    <span>{{ child.name }}</span>
                  </el-menu-item>
                </el-sub-menu>
                <!-- 无子分类的一级分类 -->
                <el-menu-item 
                  v-else 
                  :index="category.id.toString()"
                >
                  <el-icon><Folder /></el-icon>
                  <span>{{ category.name }}</span>
                </el-menu-item>
              </div>
            </el-menu>
          </el-card>
        </el-col>

        <!-- 右侧帖子内容 -->
        <el-col :span="20" class="posts-main">
          <el-card class="posts-card">
            <template #header>
              <div class="posts-header">
                <h2>{{ currentCategoryName }}</h2>
                <div class="header-actions">
                  <el-button type="primary" @click="viewAllPosts" v-if="activeCategory !== 'all'">
                    <el-icon><Refresh /></el-icon>
                    查看全部
                  </el-button>
                </div>
              </div>
            </template>

            <!-- 帖子列表 -->
            <div class="posts-content">
              <!-- 加载状态 -->
              <div v-if="loading" class="loading-container">
                <el-skeleton :rows="10" animated />
              </div>

              <!-- 帖子列表 -->
              <div v-else>
                <el-row :gutter="20" class="posts-grid">
                  <el-col 
                    v-for="post in currentPosts" 
                    :key="post.id"
                    :xs="24"
                    :sm="24"
                    :md="12"
                    :lg="8"
                  >
                    <el-card
                      class="post-card"
                      @click="viewPost(post)"
                      shadow="hover"
                    >
                      <div class="post-header">
                        <div class="post-avatar">
                          <el-avatar :size="32" :src="post.userAvatar">
                            <el-icon><User /></el-icon>
                          </el-avatar>
                        </div>
                        <div class="post-info">
                          <h3 class="post-title">{{ post.title }}</h3>
                          <div class="post-meta">
                            <span class="post-author">{{ post.userName || '匿名用户' }}</span>
                            <span class="post-time">{{ formatDate(post.createTime) }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="post-content">
                        <div class="post-preview" v-html="getPostPreview(post.content)"></div>
                      </div>
                      <div class="post-footer">
                        <div class="post-stats">
                          <span><el-icon><View /></el-icon> {{ post.viewCount || 0 }}</span>
                          <span><el-icon><ChatLineRound /></el-icon> {{ post.commentCount || 0 }}</span>
                          <span><el-icon><Star /></el-icon> {{ post.likeCount || 0 }}</span>
                        </div>
                        <div class="post-category">
                          <el-tag size="small">{{ getCategoryName(post.categoryId) }}</el-tag>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>

                <!-- 分页 -->
                <div class="pagination-container" v-if="currentTotal > 0">
                  <el-pagination
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :page-sizes="[12, 24, 36, 48]"
                    :total="currentTotal"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                  />
                </div>

                <!-- 无结果状态 -->
                <div v-if="!loading && currentPosts.length === 0" class="no-results">
                  <el-empty description="暂无帖子">
                    <el-button type="primary" @click="refreshPosts">刷新</el-button>
                  </el-empty>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { 
  House, 
  Folder, 
  Document, 
  User, 
  View, 
  ChatLineRound, 
  Star, 
  Refresh 
} from '@element-plus/icons-vue'
import forumCategoryApi from '@/api/forumCategory'
import forumPostApi from '@/api/forumPost'

// 路由
const router = useRouter()

// 响应式数据
const loading = ref(true)
const categories = ref([]) // 树状结构的一级分类
const allCategories = ref([]) // 所有分类（包括子分类）的平展数组
const posts = ref([]) // 全部帖子
const categoryPosts = ref({}) // 各分类的帖子
const activeCategory = ref('all') // 当前活动分类
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(0) // 全部帖子总数
const categoryTotal = ref({}) // 各分类帖子总数

/**
 * 计算属性：当前显示的帖子
 */
const currentPosts = computed(() => {
  if (activeCategory.value === 'all') {
    return posts.value
  } else {
    const categoryId = parseInt(activeCategory.value)
    return categoryPosts.value[categoryId] || []
  }
})

/**
 * 计算属性：当前帖子总数
 */
const currentTotal = computed(() => {
  if (activeCategory.value === 'all') {
    return total.value
  } else {
    const categoryId = parseInt(activeCategory.value)
    return categoryTotal.value[categoryId] || 0
  }
})

/**
 * 计算属性：当前分类名称
 */
const currentCategoryName = computed(() => {
  if (activeCategory.value === 'all') {
    return '全部帖子'
  } else {
    const categoryId = parseInt(activeCategory.value)
    const category = allCategories.value.find(cat => cat.id === categoryId)
    return category ? category.name : '未知分类'
  }
})

/**
 * 获取板块数据
 */
const fetchCategories = async () => {
  try {
    // 调用API获取树状结构的板块列表
    const response = await forumCategoryApi.getTree({ status: 1 })
    
    if (response.code === 200) {
      categories.value = response.data
      
      // 创建所有分类的平展数组（包括子分类）
      const flatCategories = []
      response.data.forEach(category => {
        flatCategories.push(category)
        if (category.children && category.children.length > 0) {
          category.children.forEach(child => {
            flatCategories.push(child)
          })
        }
      })
      allCategories.value = flatCategories
    } else {
      ElMessage.error(response.message || '获取板块数据失败')
    }
  } catch (error) {
    console.error('获取板块数据失败:', error)
    ElMessage.error('获取板块数据失败')
  }
}

/**
 * 获取全部帖子数据
 */
const fetchAllPosts = async () => {
  try {
    loading.value = true
    
    // 构建请求参数
    const params = {
      current: currentPage.value,
      size: pageSize.value,
      status: 1 // 只获取正常状态的帖子
    }
    
    // 调用API获取帖子列表
    const response = await forumPostApi.page(params)
    
    if (response.code === 200) {
      posts.value = response.data.records
      total.value = response.data.total
      
      // 添加模拟数据（如果需要）
      posts.value.forEach(post => {
        post.userName = post.userName || '用户' + Math.floor(Math.random() * 1000)
        post.userAvatar = post.userAvatar || ''
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

/**
 * 获取指定分类的帖子数据
 */
const fetchCategoryPosts = async (categoryId) => {
  try {
    loading.value = true
    
    // 构建请求参数
    const params = {
      current: currentPage.value,
      size: pageSize.value,
      status: 1, // 只获取正常状态的帖子
      categoryId: categoryId
    }
    
    // 调用API获取帖子列表
    const response = await forumPostApi.page(params)
    
    if (response.code === 200) {
      // 保存该分类的帖子数据
      categoryPosts.value[categoryId] = response.data.records
      // 更新该分类的总数
      categoryTotal.value[categoryId] = response.data.total
      
      // 添加模拟数据（如果需要）
      categoryPosts.value[categoryId].forEach(post => {
        post.userName = post.userName || '用户' + Math.floor(Math.random() * 1000)
        post.userAvatar = post.userAvatar || ''
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

/**
 * 分类选择处理
 */
const handleCategorySelect = (index) => {
  activeCategory.value = index
  currentPage.value = 1 // 重置分页
  
  // 根据选择的分类加载对应帖子
  if (index === 'all') {
    fetchAllPosts()
  } else {
    const categoryId = parseInt(index)
    // 如果该分类还没有加载过帖子，则加载
    if (!categoryPosts.value[categoryId]) {
      fetchCategoryPosts(categoryId)
    }
  }
}

/**
 * 查看全部帖子
 */
const viewAllPosts = () => {
  activeCategory.value = 'all'
  currentPage.value = 1
  fetchAllPosts()
}

/**
 * 刷新当前帖子
 */
const refreshPosts = () => {
  if (activeCategory.value === 'all') {
    fetchAllPosts()
  } else {
    const categoryId = parseInt(activeCategory.value)
    fetchCategoryPosts(categoryId)
  }
}

/**
 * 查看帖子详情
 */
const viewPost = (post) => {
  // 跳转到帖子详情页
  router.push(`/forum/post/${post.id}`)
}

/**
 * 获取分类名称
 */
const getCategoryName = (categoryId) => {
  if (!categoryId) return '未知分类'
  
  const category = allCategories.value.find(cat => cat.id === categoryId)
  return category ? category.name : '未知分类'
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
  // 简单的文本截取，去除HTML标签
  const text = content.replace(/<[^>]*>/g, '')
  return text.length > 100 ? text.substring(0, 100) + '...' : text
}

/**
 * 处理分页大小变化
 */
const handleSizeChange = (newSize) => {
  pageSize.value = newSize
  currentPage.value = 1
  refreshPosts()
}

/**
 * 处理当前页变化
 */
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
  refreshPosts()
}

// 生命周期
onMounted(() => {
  fetchCategories()
  fetchAllPosts()
})
</script>

<style src="@/assets/forum-home.css"></style>