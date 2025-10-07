<template>
  <!-- 论坛头部 -->
  <div class="forum-home-page">
    <div class="page-header">
      <div class="page-header-content">
        <h1>后花园</h1>
        <p>分享花卉知识，交流养护经验</p>
      </div>
    </div>
    <div class="forum-container">
      <el-row :gutter="20" class="forum-layout">
        <!-- 左侧分类导航 -->
        <el-col :span="5" class="category-sidebar">
          <el-card class="category-card" shadow="never">
            <template #header>
              <div class="card-header">
                <h3>论坛板块</h3>
              </div>
            </template>
            <el-menu
              :default-active="activeCategory"
              :default-openeds="defaultOpeneds"
              class="category-menu"
              @select="handleCategorySelect"
              unique-opened
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
        <el-col :span="19" class="posts-main">
          <el-card class="posts-card" shadow="never">
            <template #header>
              <div class="posts-header">
                <h2>{{ currentCategoryName }}</h2>
                <div class="header-actions">
                  <el-button 
                    type="primary" 
                    @click="viewAllPosts" 
                    v-if="activeCategory !== 'all'"
                    round
                  >
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
                          <el-avatar :size="36" :src="post.userAvatar">
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
                        <div class="post-tags">
                          <el-tag v-if="post.isTop" type="danger" size="small" effect="dark">置顶</el-tag>
                          <el-tag v-if="post.isEssence" type="warning" size="small" effect="dark">精华</el-tag>
                        </div>
                      </div>
                      <div class="post-content">
                        <div class="post-preview" v-html="getPostPreview(post.content)"></div>
                      </div>
                      <div class="post-footer">
                        <div class="post-stats">
                          <span class="stat-item">
                            <el-icon><View /></el-icon> 
                            {{ post.viewCount || 0 }}
                          </span>
                          <span class="stat-item">
                            <el-icon><ChatLineRound /></el-icon> 
                            {{ post.commentCount || 0 }}
                          </span>
                          <span class="stat-item">
                            <el-icon><Star /></el-icon> 
                            {{ post.likeCount || 0 }}
                          </span>
                        </div>
                        <div class="post-category">
                          <el-tag size="small" type="info">{{ getCategoryName(post.categoryId) }}</el-tag>
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
                    background
                  />
                </div>

                <!-- 无结果状态 -->
                <div v-if="!loading && currentPosts.length === 0" class="no-results">
                  <el-empty description="暂无帖子">
                    <el-button type="primary" @click="refreshPosts" round>刷新</el-button>
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
const defaultOpeneds = ref([]) // 默认展开的子菜单
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
      const openeds = []
      response.data.forEach(category => {
        flatCategories.push(category)
        // 如果分类有子分类，则将其ID添加到默认展开数组中
        if (category.children && category.children.length > 0) {
          openeds.push(category.id.toString())
          category.children.forEach(child => {
            flatCategories.push(child)
          })
        }
      })
      allCategories.value = flatCategories
      // 设置默认展开的子菜单为所有有子分类的一级分类
      defaultOpeneds.value = openeds
    } else {
      ElMessage.error(response.message || '获取板块数据失败')
    }
  } catch (error) {
    console.error('获取板块数据失败:', error)
    ElMessage.error('获取板块数据失败: ' + (error.message || ''))
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
    ElMessage.error('获取帖子数据失败: ' + (error.message || ''))
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
    ElMessage.error('获取帖子数据失败: ' + (error.message || ''))
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

<style scoped>
.forum-home-page {
  background-color: var(--bg-color-page);
  min-height: 100vh;
  padding: 20px 0;
}

.page-header {
  background: var(--gradient-primary);
  color: white;
  padding: 2rem 0;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  margin: 0 20px 20px;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="forum-grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23forum-grain)"/></svg>');
  pointer-events: none;
}

.page-header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.page-header p {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
}

.forum-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.forum-layout {
  margin-top: 0;
}

/* Category Sidebar */
.category-sidebar {
  position: sticky;
  top: 20px;
  align-self: flex-start;
  height: calc(100vh - 40px);
}

.category-card {
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  border: none;
}

.category-card .el-card__header {
  background: transparent;
  border-bottom: 1px solid var(--border-color-lighter);
  padding: 16px 20px;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color-primary);
}

.category-card .el-card__body {
  padding: 0;
}

.category-menu {
  border-right: none;
  background: transparent;
}

.category-menu .el-menu-item,
.category-menu .el-sub-menu__title {
  height: 50px;
  line-height: 50px;
}

.category-menu .el-sub-menu .el-menu-item {
  height: 40px;
  line-height: 40px;
  padding-left: 40px !important;
}

/* Posts Main Content */
.posts-main {
  flex: 1;
}

.posts-card {
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  border: none;
}

.posts-card .el-card__header {
  background: transparent;
  border-bottom: 1px solid var(--border-color-lighter);
  padding: 16px 20px;
}

.posts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.posts-header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: var(--text-color-primary);
}

.header-actions {
  flex-shrink: 0;
}

/* Posts Grid */
.posts-grid {
  margin: 0 -10px;
}

.post-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  border-radius: 10px;
  overflow: hidden;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--card-shadow-hover);
}

.post-header {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--border-color-lighter);
}

.post-avatar {
  margin-right: 12px;
}

.post-info {
  flex: 1;
  min-width: 0;
}

.post-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 6px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text-color-primary);
}

.post-meta {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: var(--text-color-secondary);
  gap: 2px;
}

.post-tags {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 10px;
}

.post-content {
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100px;
}

.post-preview {
  color: var(--text-color-regular);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
  font-size: 14px;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--bg-color-page);
  border-top: 1px solid var(--border-color-lighter);
  font-size: 12px;
  color: var(--text-color-secondary);
}

.post-stats {
  display: flex;
  gap: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.post-category .el-tag {
  background-color: var(--primary-extra-light);
  border-color: var(--primary-light);
  color: var(--primary-color);
}

/* Pagination */
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 40px 0;
}

/* Loading */
.loading-container {
  padding: 20px 0;
}

/* Responsive */
@media (max-width: 768px) {
  .forum-layout {
    flex-direction: column;
  }
  
  .category-sidebar {
    position: relative;
    height: auto;
    margin-bottom: 20px;
  }
  
  .el-col {
    width: 100%;
    padding: 0 10px;
  }
  
  .page-header {
    margin: 0 15px 15px;
    padding: 1.5rem 0;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .page-header p {
    font-size: 1rem;
  }
  
  .forum-container {
    padding: 0 15px;
  }
  
  .posts-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .header-actions {
    align-self: flex-end;
  }
  
  .post-header {
    padding: 12px;
  }
  
  .post-content {
    padding: 12px;
  }
  
  .post-footer {
    padding: 12px;
  }
  
  .posts-grid {
    margin: 0 -5px;
  }
  
  .post-card {
    margin-bottom: 15px;
  }
  
  .posts-header h2 {
    font-size: 20px;
  }
}
</style>