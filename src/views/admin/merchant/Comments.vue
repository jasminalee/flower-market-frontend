<template>
  <el-page-header class="page-header" title="商户管理">
    <template #content>
      管理评论
    </template>
  </el-page-header>

  <el-card class="filter-card">
    <el-row type="flex" justify="space-between" align="middle" class="filters-bar">
      <el-col :span="18">
        <el-form :model="searchForm" inline>
          <el-form-item label="来源类型">
            <el-select v-model="searchForm.sourceType" placeholder="选择来源类型" clearable>
              <el-option label="产品" value="product" />
              <el-option label="文章" value="article" />
              <el-option label="论坛" value="forum" />
            </el-select>
          </el-form-item>

          <el-form-item label="评分">
            <el-select v-model="searchForm.rating" placeholder="选择评分" clearable>
              <el-option label="1星" :value="1" />
              <el-option label="2星" :value="2" />
              <el-option label="3星" :value="3" />
              <el-option label="4星" :value="4" />
              <el-option label="5星" :value="5" />
            </el-select>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="选择状态" clearable>
              <el-option label="显示" :value="1" />
              <el-option label="隐藏" :value="0" />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSearch">
              <el-icon><Search /></el-icon>
              搜索
            </el-button>
            <el-button @click="handleReset">
              <el-icon><Refresh /></el-icon>
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>

  <el-card class="table-card">
    <el-table
      :data="commentList"
      :loading="loading"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="sourceType" label="来源类型" min-width="100">
        <template #default="{ row }">
          <el-tag v-if="row.sourceType === 'product'">产品</el-tag>
          <el-tag v-else-if="row.sourceType === 'article'" type="success">文章</el-tag>
          <el-tag v-else-if="row.sourceType === 'forum'" type="warning">论坛</el-tag>
          <span v-else>{{ row.sourceType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sourceId" label="来源ID" min-width="100" />
      <el-table-column prop="content" label="评论内容" min-width="200">
        <template #default="{ row }">
          <div class="comment-content">{{ row.content }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="rating" label="评分" min-width="80">
        <template #default="{ row }">
          <el-rate v-model="row.rating" disabled />
        </template>
      </el-table-column>
      <el-table-column label="是否匿名" min-width="100">
        <template #default="{ row }">
          <el-tag :type="row.isAnonymous === 1 ? 'warning' : 'success'">
            {{ row.isAnonymous === 1 ? '匿名' : '实名' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'">
            {{ row.status === 1 ? '显示' : '隐藏' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="160" />

      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button v-if="row.status === 1" type="warning" size="small" text @click="handleChangeStatus(row, 0)">
            <el-icon><Hide /></el-icon>
            隐藏
          </el-button>
          <el-button v-else type="success" size="small" text @click="handleChangeStatus(row, 1)">
            <el-icon><View /></el-icon>
            显示
          </el-button>
          <el-button type="danger" size="small" text @click="handleDelete(row)">
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.size"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>

  <!-- 评论详情对话框 -->
  <el-dialog
    title="评论详情"
    v-model="detailDialogVisible"
    width="600px"
  >
    <el-form label-width="100px">
      <el-form-item label="来源类型">
        <el-input v-model="selectedComment.sourceType" disabled />
      </el-form-item>
      
      <el-form-item label="来源ID">
        <el-input v-model="selectedComment.sourceId" disabled />
      </el-form-item>
      
      <el-form-item label="用户ID">
        <el-input v-model="selectedComment.userId" disabled />
      </el-form-item>
      
      <el-form-item label="评分">
        <el-rate v-model="selectedComment.rating" disabled />
      </el-form-item>
      
      <el-form-item label="是否匿名">
        <el-tag :type="selectedComment.isAnonymous === 1 ? 'warning' : 'success'">
          {{ selectedComment.isAnonymous === 1 ? '匿名' : '实名' }}
        </el-tag>
      </el-form-item>
      
      <el-form-item label="状态">
        <el-tag :type="selectedComment.status === 1 ? 'success' : 'danger'">
          {{ selectedComment.status === 1 ? '显示' : '隐藏' }}
        </el-tag>
      </el-form-item>
      
      <el-form-item label="评论内容">
        <el-input 
          v-model="selectedComment.content" 
          type="textarea"
          :rows="4"
          disabled
        />
      </el-form-item>
      
      <el-form-item label="创建时间">
        <el-input v-model="selectedComment.createTime" disabled />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="detailDialogVisible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import commentApi from '@/api/comment.js'
import { Search, Refresh, View, Hide, Delete } from '@element-plus/icons-vue'

// 响应式数据
const loading = ref(false)
const detailDialogVisible = ref(false)
const selectedComment = ref({})

// 评论列表数据
const commentList = ref([])

// 搜索表单
const searchForm = reactive({
  sourceType: '',
  rating: '',
  status: ''
})

// 分页信息
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
})

/**
 * 加载评论列表
 */
const loadCommentList = async () => {
  loading.value = true
  try {
    const params = {
      current: pagination.page,
      size: pagination.size,
      sourceType: searchForm.sourceType || undefined,
      rating: searchForm.rating !== '' ? searchForm.rating : undefined,
      status: searchForm.status !== '' ? searchForm.status : undefined
    }

    const response = await commentApi.page(params)
    if (response && response.data) {
      const records = response.data.records || []
      commentList.value = records
      pagination.total = response.data.total || 0
      pagination.page = response.data.current || pagination.page
      pagination.size = response.data.size || pagination.size
    }
  } catch (error) {
    console.error('加载评论列表失败:', error)
    ElMessage.error('加载评论列表失败')
  } finally {
    loading.value = false
  }
}

/**
 * 搜索
 */
const handleSearch = () => {
  pagination.page = 1
  loadCommentList()
  ElMessage.success('搜索成功')
}

/**
 * 重置搜索
 */
const handleReset = () => {
  searchForm.sourceType = ''
  searchForm.rating = ''
  searchForm.status = ''
  pagination.page = 1
  loadCommentList()
  ElMessage.info('搜索条件已重置')
}

/**
 * 分页大小改变
 */
const handleSizeChange = (val) => {
  pagination.size = val
  pagination.page = 1
  loadCommentList()
}

/**
 * 当前页改变
 */
const handleCurrentChange = (val) => {
  pagination.page = val
  loadCommentList()
}

/**
 * 查看评论详情
 */
const handleViewDetail = (row) => {
  selectedComment.value = { ...row }
  detailDialogVisible.value = true
}

/**
 * 改变评论状态
 */
const handleChangeStatus = async (row, status) => {
  try {
    const action = status === 1 ? '显示' : '隐藏'
    await ElMessageBox.confirm(`确定要${action}该评论吗？`, '提示', {
      type: 'warning'
    })
    
    await commentApi.save({
      ...row,
      status: status
    })
    ElMessage.success(`${action}成功`)
    loadCommentList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error(`${action}失败:`, error)
      ElMessage.error(`${action}失败: ` + (error.message || '未知错误'))
    }
  }
}

/**
 * 删除评论
 */
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除该评论吗？', '提示', {
      type: 'warning'
    })
    
    await commentApi.remove(row.id)
    ElMessage.success('删除成功')
    loadCommentList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
      ElMessage.error('删除失败: ' + (error.message || '未知错误'))
    }
  }
}

// 初始化加载
onMounted(() => {
  loadCommentList()
})
</script>

<style scoped>
.comment-content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>