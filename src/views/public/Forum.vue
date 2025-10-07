<template>
  <div class="forum">
    <!-- 论坛头部 -->
    <div class="forum-header">
      <div class="forum-header-content">
        <h1>后花园</h1>
        <p>分享花卉知识，交流养护经验</p>
      </div>
    </div>

    <!-- 板块列表区域 -->
    <div class="categories-section">
      <div class="container">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="8" animated />
        </div>

        <!-- 板块网格 -->
        <div v-else>
          <el-row :gutter="20" class="categories-grid">
            <el-col 
              v-for="category in categories" 
              :key="category.id"
              :xs="24"
              :sm="12"
              :md="8"
              :lg="6"
            >
              <el-card
                class="category-card"
                @click="viewCategory(category)"
                :body-style="{ padding: '0' }"
                shadow="hover"
              >
                <div class="category-header">
                  <div class="category-icon">
                    <el-icon v-if="category.icon"><component :is="category.icon" /></el-icon>
                    <el-icon v-else><Folder /></el-icon>
                  </div>
                  <h3 class="category-title">{{ category.name }}</h3>
                </div>
                <div class="category-description">
                  {{ category.description || '暂无描述' }}
                </div>
                <div class="category-stats">
                  <span>帖子: {{ category.postCount || 0 }}</span>
                  <span>今日: {{ category.todayCount || 0 }}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <!-- 无结果状态 -->
        <div v-if="!loading && categories.length === 0" class="no-results">
          <el-empty description="暂无论坛板块">
            <el-button type="primary" @click="fetchCategories">刷新</el-button>
          </el-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Folder } from '@element-plus/icons-vue'
import forumCategoryApi from '@/api/forumCategory'

// 路由
const router = useRouter()

// 响应式数据
const loading = ref(true)
const categories = ref([])

/**
 * 查看板块详情
 */
const viewCategory = (category) => {
  // 跳转到板块帖子列表页
  router.push(`/forum/category/${category.id}`)
}

/**
 * 获取板块数据
 */
const fetchCategories = async () => {
  try {
    loading.value = true
    
    // 调用API获取启用的板块列表
    const response = await forumCategoryApi.getAvailable()
    
    if (response.code === 200) {
      categories.value = response.data.map(category => ({
        ...category,
        postCount: Math.floor(Math.random() * 1000) + 100, // 模拟数据
        todayCount: Math.floor(Math.random() * 50) // 模拟数据
      }))
    } else {
      ElMessage.error(response.message || '获取板块数据失败')
    }
  } catch (error) {
    console.error('获取板块数据失败:', error)
    ElMessage.error('获取板块数据失败')
  } finally {
    loading.value = false
  }
}

// 生命周期
onMounted(() => {
  fetchCategories()
})
</script>

<style src="@/assets/forum.css"></style>