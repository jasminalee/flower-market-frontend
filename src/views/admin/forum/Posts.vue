<template>
  <div class="forum-posts">
    <el-card class="post-card">
      <template #header>
        <div class="card-header">
          <span>论坛帖子管理</span>
          <el-button type="primary" @click="showPostForm">
            <el-icon><Plus /></el-icon>
            新增帖子
          </el-button>
        </div>
      </template>

      <!-- 搜索和筛选区域 -->
      <div class="filter-section">
        <el-form :inline="true" :model="filterForm" class="filter-form">
          <el-form-item label="帖子标题">
            <el-input v-model="filterForm.title" placeholder="请输入帖子标题" clearable />
          </el-form-item>
          <el-form-item label="板块">
            <el-select v-model="filterForm.categoryId" placeholder="请选择板块" clearable filterable>
              <el-option label="全部" value="" />
              <el-option
                v-for="category in categories"
                :key="category.id"
                :label="category.name"
                :value="category.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="filterForm.status" placeholder="请选择状态" clearable>
              <el-option label="全部" value="" />
              <el-option label="正常" :value="1" />
              <el-option label="审核中" :value="2" />
              <el-option label="删除" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="fetchPosts">
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
        :data="posts"
        v-loading="loading"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="title" label="帖子标题" min-width="200" show-overflow-tooltip>
          <template #default="{ row }">
            <div class="post-title-cell">
              <el-tag v-if="row.isTop" type="danger" size="small">置顶</el-tag>
              <el-tag v-if="row.isEssence" type="warning" size="small">精华</el-tag>
              <el-tag v-if="row.postType === 2" type="success" size="small">视频</el-tag>
              <span class="post-title">{{ row.title }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="categoryId" label="所属板块" width="120">
          <template #default="{ row }">
            {{ getCategoryName(row.categoryId) }}
          </template>
        </el-table-column>
        <el-table-column prop="userId" label="用户ID" width="100" />
        <el-table-column prop="viewCount" label="浏览量" width="100" />
        <el-table-column prop="commentCount" label="评论数" width="100" />
        <el-table-column prop="likeCount" label="点赞数" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getPostStatusType(row.status)">
              {{ getPostStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="editPost(row)">
              编辑
            </el-button>
            <el-button 
              size="small" 
              :type="row.isTop ? 'warning' : 'default'" 
              @click="toggleTop(row)"
            >
              {{ row.isTop ? '取消置顶' : '置顶' }}
            </el-button>
            <el-button 
              size="small" 
              :type="row.isEssence ? 'warning' : 'default'" 
              @click="toggleEssence(row)"
            >
              {{ row.isEssence ? '取消精华' : '精华' }}
            </el-button>
            <el-button size="small" type="danger" @click="deletePost(row)">
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

    <!-- 帖子表单对话框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="800px"
      @close="handleDialogClose"
    >
      <el-form
        :model="postForm"
        :rules="postRules"
        ref="postFormRef"
        label-width="100px"
      >
        <el-form-item label="帖子标题" prop="title">
          <el-input v-model="postForm.title" placeholder="请输入帖子标题" />
        </el-form-item>
        <el-form-item label="所属板块" prop="categoryId">
          <el-select v-model="postForm.categoryId" placeholder="请选择板块" filterable>
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="帖子类型" prop="postType">
          <el-radio-group v-model="postForm.postType">
            <el-radio :label="1">普通文本</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="视频URL" prop="videoUrl" v-if="postForm.postType === 2">
          <el-input v-model="postForm.videoUrl" placeholder="请输入视频URL" />
        </el-form-item>
        <el-form-item label="视频封面" prop="coverImage" v-if="postForm.postType === 2">
          <el-input v-model="postForm.coverImage" placeholder="请输入视频封面图片URL" />
          <el-upload
            class="cover-uploader"
            :action="uploadUrl"
            :headers="uploadHeaders"
            :show-file-list="false"
            :on-success="handleCoverUploadSuccess"
            :before-upload="beforeCoverUpload"
          >
            <el-image
              v-if="postForm.coverImage"
              :src="postForm.coverImage"
              class="cover"
              fit="cover"
            />
            <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="帖子内容" prop="content">
          <el-input
            v-model="postForm.content"
            type="textarea"
            :rows="10"
            placeholder="请输入帖子内容"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="postForm.status" placeholder="请选择状态">
            <el-option label="正常" :value="1" />
            <el-option label="审核中" :value="2" />
            <el-option label="删除" :value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="savePost">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search, Refresh } from '@element-plus/icons-vue'
import forumPostApi from '@/api/forumPost'
import forumCategoryApi from '@/api/forumCategory'
import fileApi from '@/api/file'
import { useAuthStore } from '@/config/store.js'

// 响应式数据
const loading = ref(false)
const posts = ref([])
const categories = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const authStore = useAuthStore()

// 表单相关
const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)
const postFormRef = ref()

// 上传相关
const uploadUrl = import.meta.env.VITE_API_BASE_URL + '/api/upload/image'
const uploadHeaders = computed(() => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
})

// 筛选表单
const filterForm = reactive({
  title: '',
  categoryId: '',
  status: ''
})

// 帖子表单
const postForm = reactive({
  id: undefined,
  title: '',
  categoryId: '',
  postType: 1,
  content: '',
  videoUrl: '',
  coverImage: '',
  status: 1,
  userId: authStore.user?.id || 1 // 使用当前登录用户ID，如果未登录则使用默认值
})

// 表单验证规则
const postRules = {
  title: [
    { required: true, message: '请输入帖子标题', trigger: 'blur' }
  ],
  categoryId: [
    { required: true, message: '请选择所属板块', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入帖子内容', trigger: 'blur' }
  ]
}

/**
 * 获取板块名称
 */
const getCategoryName = (categoryId) => {
  const category = categories.value.find(item => item.id === categoryId)
  return category ? category.name : ''
}

/**
 * 获取帖子状态类型
 */
const getPostStatusType = (status) => {
  switch (status) {
    case 1: return 'success'
    case 2: return 'warning'
    case 0: return 'danger'
    default: return 'info'
  }
}

/**
 * 获取帖子状态文本
 */
const getPostStatusText = (status) => {
  switch (status) {
    case 1: return '正常'
    case 2: return '审核中'
    case 0: return '删除'
    default: return '未知'
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
 * 显示帖子表单
 */
const showPostForm = () => {
  isEdit.value = false
  dialogTitle.value = '新增帖子'
  dialogVisible.value = true
  // 重置表单
  Object.assign(postForm, {
    id: undefined,
    title: '',
    categoryId: '',
    postType: 1,
    content: '',
    videoUrl: '',
    coverImage: '',
    status: 1,
    userId: authStore.user?.id || 1 // 使用当前登录用户ID，如果未登录则使用默认值
  })
}

/**
 * 编辑帖子
 */
const editPost = (row) => {
  isEdit.value = true
  dialogTitle.value = '编辑帖子'
  dialogVisible.value = true
  // 填充表单数据
  Object.assign(postForm, row)
}

/**
 * 切换置顶状态
 */
const toggleTop = async (row) => {
  try {
    const action = row.isTop ? '取消置顶' : '置顶'
    await ElMessageBox.confirm(
      `确定要${action}帖子 "${row.title}" 吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const data = { ...row, isTop: row.isTop ? 0 : 1 }
    const response = await forumPostApi.save(data)
    
    if (response.code === 200) {
      ElMessage.success(`${action}成功`)
      fetchPosts()
    } else {
      ElMessage.error(response.message || `${action}失败`)
    }
  } catch (error) {
    // 用户取消操作
  }
}

/**
 * 切换精华状态
 */
const toggleEssence = async (row) => {
  try {
    const action = row.isEssence ? '取消精华' : '设为精华'
    await ElMessageBox.confirm(
      `确定要${action}帖子 "${row.title}" 吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const data = { ...row, isEssence: row.isEssence ? 0 : 1 }
    const response = await forumPostApi.save(data)
    
    if (response.code === 200) {
      ElMessage.success(`${action}成功`)
      fetchPosts()
    } else {
      ElMessage.error(response.message || `${action}失败`)
    }
  } catch (error) {
    // 用户取消操作
  }
}

/**
 * 删除帖子
 */
const deletePost = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除帖子 "${row.title}" 吗？删除后将无法恢复！`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const response = await forumPostApi.remove(row.id)
    if (response.code === 200) {
      ElMessage.success('删除成功')
      fetchPosts()
    } else {
      ElMessage.error(response.message || '删除失败')
    }
  } catch (error) {
    // 用户取消操作
  }
}

/**
 * 保存帖子
 */
const savePost = async () => {
  try {
    await postFormRef.value.validate()
    
    const data = { ...postForm }
    const response = await forumPostApi.save(data)
    
    if (response.code === 200) {
      ElMessage.success(isEdit.value ? '更新成功' : '新增成功')
      dialogVisible.value = false
      fetchPosts()
    } else {
      ElMessage.error(response.message || (isEdit.value ? '更新失败' : '新增失败'))
    }
  } catch (error) {
    console.error('保存帖子失败:', error)
  }
}

/**
 * 处理对话框关闭
 */
const handleDialogClose = () => {
  postFormRef.value.resetFields()
}

/**
 * 处理封面上传成功
 */
const handleCoverUploadSuccess = (response) => {
  if (response.code === 200) {
    postForm.coverImage = response.data
    ElMessage.success('上传成功')
  } else {
    ElMessage.error(response.message || '上传失败')
  }
}

/**
 * 上传前检查
 */
const beforeCoverUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt5M = file.size / 1024 / 1024 < 5
  
  if (!isImage) {
    ElMessage.error('上传图片只能是 JPG/PNG/GIF 格式!')
    return false
  }
  
  if (!isLt5M) {
    ElMessage.error('上传图片大小不能超过 5MB!')
    return false
  }
  
  return true
}

/**
 * 处理分页大小变化
 */
const handleSizeChange = (newSize) => {
  pageSize.value = newSize
  currentPage.value = 1
  fetchPosts()
}

/**
 * 处理当前页变化
 */
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
  fetchPosts()
}

/**
 * 重置筛选条件
 */
const resetFilter = () => {
  filterForm.title = ''
  filterForm.categoryId = ''
  filterForm.status = ''
  currentPage.value = 1
  fetchPosts()
}

/**
 * 获取帖子数据
 */
const fetchPosts = async () => {
  try {
    loading.value = true
    
    // 构建请求参数，只包含有值的参数
    const params = {
      current: currentPage.value,
      size: pageSize.value
    }
    
    // 只有当筛选条件有值时才添加到参数中
    if (filterForm.title) {
      params.title = filterForm.title
    }
    if (filterForm.categoryId) {
      params.categoryId = filterForm.categoryId
    }
    if (filterForm.status !== '' && filterForm.status !== null && filterForm.status !== undefined) {
      params.status = filterForm.status
    }
    
    // 调用API获取帖子数据
    const response = await forumPostApi.page(params)
    
    if (response.code === 200) {
      posts.value = response.data.records
      total.value = response.data.total
      
      // 添加模拟数据
      posts.value.forEach(post => {
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
 * 获取板块列表
 */
const fetchCategories = async () => {
  try {
    const response = await forumCategoryApi.list({})
    if (response.code === 200) {
      categories.value = response.data
    }
  } catch (error) {
    console.error('获取板块列表失败:', error)
  }
}

// 生命周期
onMounted(() => {
  fetchPosts()
  fetchCategories()
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

.post-title-cell {
  display: flex;
  align-items: center;
  gap: 5px;
}

.post-title {
  flex: 1;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.cover-uploader .cover {
  width: 100px;
  height: 100px;
  display: block;
}

.cover-uploader .cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}

.cover-uploader :deep(.el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.cover-uploader :deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}
</style>