<template>
  <div class="comments-container">
    <el-card class="comments-card">
      <template #header>
        <div class="card-header">
          <span>我的评论</span>
        </div>
      </template>

      <!-- 评论列表 -->
      <el-table 
        :data="comments" 
        style="width: 100%" 
        v-loading="loading"
        element-loading-text="加载中..."
      >
        <el-table-column prop="content" label="评论内容" min-width="200">
          <template #default="scope">
            <div class="comment-content">{{ scope.row.content }}</div>
          </template>
        </el-table-column>
        
        <el-table-column prop="rating" label="评分" width="100">
          <template #default="scope">
            <el-rate
              v-model="scope.row.rating"
              disabled
              show-score
              score-template="{value}分"
            />
          </template>
        </el-table-column>
        
        <el-table-column prop="sourceType" label="来源类型" width="120">
          <template #default="scope">
            <el-tag :type="getSourceTypeTag(scope.row.sourceType)">
              {{ getSourceTypeName(scope.row.sourceType) }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column prop="createTime" label="评论时间" width="180">
          <template #default="scope">
            {{ formatDate(scope.row.createTime) }}
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button 
              size="small" 
              type="danger" 
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.current"
          v-model:page-size="pagination.size"
          :page-sizes="[10, 20, 50]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/config/store.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import commentApi from '@/api/comment.js'

// 获取认证存储实例
const authStore = useAuthStore()

// 加载状态
const loading = ref(false)

// 评论数据
const comments = ref([])

// 分页参数
const pagination = reactive({
  current: 1,
  size: 10,
  total: 0
})

/**
 * 获取评论列表
 */
const loadComments = async () => {
  if (!authStore.user || !authStore.user.id) {
    ElMessage.error('用户未登录')
    return
  }
  
  loading.value = true
  try {
    const params = {
      current: pagination.current,
      size: pagination.size,
      userId: authStore.user.id
    }
    
    const result = await commentApi.page(params)
    
    if (result && result.code === 200) {
      comments.value = result.data.records || []
      pagination.total = result.data.total || 0
    } else {
      ElMessage.error(result?.message || '获取评论列表失败')
    }
  } catch (error) {
    ElMessage.error('获取评论列表失败：' + (error.message || '网络错误'))
  } finally {
    loading.value = false
  }
}

/**
 * 处理分页大小变化
 */
const handleSizeChange = (val) => {
  pagination.size = val
  loadComments()
}

/**
 * 处理当前页变化
 */
const handleCurrentChange = (val) => {
  pagination.current = val
  loadComments()
}

/**
 * 处理删除评论
 */
const handleDelete = async (comment) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除评论"${comment.content}"吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const result = await commentApi.remove(comment.id)
    
    if (result && result.code === 200) {
      ElMessage.success('删除成功')
      // 重新加载评论列表
      loadComments()
    } else {
      ElMessage.error(result?.message || '删除失败')
    }
  } catch (error) {
    // 用户取消操作或删除失败
    if (error !== 'cancel') {
      ElMessage.error('删除失败：' + (error.message || '网络错误'))
    }
  }
}

/**
 * 获取来源类型标签类型
 */
const getSourceTypeTag = (sourceType) => {
  const typeMap = {
    'product': 'success',
    'article': 'primary',
    'forum': 'warning'
  }
  return typeMap[sourceType] || 'info'
}

/**
 * 获取来源类型名称
 */
const getSourceTypeName = (sourceType) => {
  const nameMap = {
    'product': '产品',
    'article': '文章',
    'forum': '论坛'
  }
  return nameMap[sourceType] || sourceType
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

// 组件挂载时加载评论
onMounted(() => {
  loadComments()
})
</script>

<style scoped>
@import '@/assets/comment.css';

.comments-container {
  padding: 20px;
}

.comments-card {
  min-height: 500px;
}

.comment-content {
  white-space: pre-wrap;
  word-break: break-all;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>