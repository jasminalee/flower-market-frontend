<template>
  <div class="forum-comments">
    <el-card class="comment-card">
      <template #header>
        <div class="card-header">
          <span>论坛评论管理</span>
        </div>
      </template>

      <!-- 搜索和筛选区域 -->
      <div class="filter-section">
        <el-form :inline="true" :model="filterForm" class="filter-form">
          <el-form-item label="评论内容">
            <el-input v-model="filterForm.content" placeholder="请输入评论内容" clearable />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="filterForm.status" placeholder="请选择状态" clearable>
              <el-option label="全部" value="" />
              <el-option label="显示" :value="1" />
              <el-option label="隐藏" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="fetchComments">
              <el-icon><Search /></el-icon>
              查询
            </el-button>
            <el-button @click="resetFilter">
              <el-icon><Refresh /></el-icon>
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 表格区域 -->
      <el-table
        :data="comments"
        v-loading="loading"
        stripe
        style="width: 100%"
        row-key="id"
      >
        <el-table-column prop="content" label="评论内容" min-width="300">
          <template #default="{ row }">
            <div class="comment-content-cell">
              <div class="comment-user">
                <el-avatar :size="24" :src="row.userAvatar">
                  <el-icon><User /></el-icon>
                </el-avatar>
                <span class="user-name">{{ row.userName || '匿名用户' }}</span>
                <el-tag v-if="row.isAnonymous" type="info" size="small">匿名</el-tag>
              </div>
              <div class="comment-text">{{ row.content }}</div>
              <div class="comment-source">
                来源: {{ getSourceTypeName(row.sourceType) }} 
                <span v-if="row.sourceTitle">- {{ row.sourceTitle }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="rating" label="评分" width="80">
          <template #default="{ row }">
            <el-rate
              v-if="row.rating"
              v-model="row.rating"
              disabled
              size="small"
            />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-switch
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
              active-text="显示"
              inactive-text="隐藏"
              @change="toggleStatus(row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="danger" @click="deleteComment(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
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
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, User } from '@element-plus/icons-vue'
import forumCommentApi from '@/api/forumComment'
import { useAuthStore } from '@/config/store.js'

const authStore = useAuthStore()

// 响应式数据
const loading = ref(false)
const comments = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 筛选表单
const filterForm = reactive({
  content: '',
  status: ''
})

/**
 * 获取来源类型名称
 */
const getSourceTypeName = (sourceType) => {
  switch (sourceType) {
    case 'product': return '产品'
    case 'article': return '文章'
    case 'forum': return '论坛'
    default: return sourceType || '未知'
  }
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
 * 切换评论状态
 */
const toggleStatus = async (row) => {
  try {
    const data = { ...row }
    const response = await forumCommentApi.save(data)
    
    if (response.code === 200) {
      ElMessage.success('状态更新成功')
    } else {
      ElMessage.error(response.message || '状态更新失败')
      // 恢复原状态
      row.status = row.status === 1 ? 0 : 1
    }
  } catch (error) {
    console.error('更新评论状态失败:', error)
    ElMessage.error('状态更新失败')
    // 恢复原状态
    row.status = row.status === 1 ? 0 : 1
  }
}

/**
 * 删除评论
 */
const deleteComment = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除这条评论吗？删除后将无法恢复！`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const response = await forumCommentApi.remove(row.id)
    if (response.code === 200) {
      ElMessage.success('删除成功')
      fetchComments()
    } else {
      ElMessage.error(response.message || '删除失败')
    }
  } catch (error) {
    // 用户取消操作
  }
}

/**
 * 处理分页大小变化
 */
const handleSizeChange = (newSize) => {
  pageSize.value = newSize
  currentPage.value = 1
  fetchComments()
}

/**
 * 处理当前页变化
 */
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
  fetchComments()
}

/**
 * 重置筛选条件
 */
const resetFilter = () => {
  filterForm.content = ''
  filterForm.status = ''
  currentPage.value = 1
  fetchComments()
}

/**
 * 获取评论数据
 */
const fetchComments = async () => {
  try {
    loading.value = true
    
    // 构建请求参数，只包含有值的参数
    const params = {
      current: currentPage.value,
      size: pageSize.value,
      sourceType: 'forum' // 只获取论坛评论
    }
    
    // 只有当筛选条件有值时才添加到参数中
    if (filterForm.content) {
      params.content = filterForm.content
    }
    if (filterForm.status !== '' && filterForm.status !== null && filterForm.status !== undefined) {
      params.status = filterForm.status
    }
    
    // 调用API获取评论数据
    const response = await forumCommentApi.page(params)
    
    if (response.code === 200) {
      comments.value = response.data.records
      total.value = response.data.total
      
      // 添加模拟数据
      comments.value.forEach(comment => {
        comment.userName = comment.userName || '用户' + Math.floor(Math.random() * 1000)
        comment.userAvatar = comment.userAvatar || ''
        comment.sourceTitle = comment.sourceTitle || '帖子标题' + Math.floor(Math.random() * 100)
      })
    } else {
      ElMessage.error(response.message || '获取评论数据失败')
    }
  } catch (error) {
    console.error('获取评论数据失败:', error)
    ElMessage.error('获取评论数据失败')
  } finally {
    loading.value = false
  }
}

// 生命周期
onMounted(() => {
  fetchComments()
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-section {
  margin-bottom: 20px;
}

.comment-content-cell {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.comment-user {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-name {
  font-weight: 500;
}

.comment-text {
  padding: 8px;
  background-color: #f5f7fa;
  border-radius: 4px;
  line-height: 1.5;
}

.comment-source {
  font-size: 12px;
  color: #909399;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>