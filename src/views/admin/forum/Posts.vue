<template>
  <el-page-header class="page-header" title="帖子管理">
    <template #content>
      管理论坛帖子信息
    </template>
  </el-page-header>

  <el-card class="filter-card">
    <el-row type="flex" justify="space-between" align="middle" class="filters-bar">
      <el-col :span="23">
        <el-form :model="filterForm" inline>
          <el-form-item label="帖子标题">
            <el-input
                v-model="filterForm.title"
                placeholder="搜索帖子标题"
                clearable
                @keyup.enter="fetchPosts"
            >
              <template #prefix>
                <el-icon>
                  <Search/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="板块">
            <el-select v-model="filterForm.categoryId" placeholder="选择板块" clearable filterable>
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
            <el-select v-model="filterForm.status" placeholder="选择状态" clearable>
              <el-option label="全部" value="" />
              <el-option label="正常" :value="1" />
              <el-option label="审核中" :value="2" />
              <el-option label="删除" :value="0" />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="fetchPosts">
              <el-icon>
                <Search/>
              </el-icon>
              搜索
            </el-button>
            <el-button @click="resetFilter">
              <el-icon>
                <Refresh/>
              </el-icon>
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="1" style="text-align: right;">
        <el-button :icon="Plus" type="primary" @click="showPostForm">
          新增帖子
        </el-button>
      </el-col>
    </el-row>
  </el-card>

  <el-card class="table-card">
    <el-table
        :data="posts"
        :loading="loading"
        stripe
        style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="50" />
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
      <el-table-column prop="createTime" label="创建时间" min-width="160">
        <template #default="{ row }">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="300" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" size="small" text @click="editPost(row)">
            <el-icon>
              <Edit/>
            </el-icon>
            编辑
          </el-button>
          <el-button 
            size="small" 
            :type="row.isTop ? 'warning' : 'default'" 
            text
            @click="toggleTop(row)"
          >
            {{ row.isTop ? '取消置顶' : '置顶' }}
          </el-button>
          <el-button 
            size="small" 
            :type="row.isEssence ? 'warning' : 'default'" 
            text
            @click="toggleEssence(row)"
          >
            {{ row.isEssence ? '取消精华' : '精华' }}
          </el-button>
          <el-button size="small" type="danger" text @click="deletePost(row)">
            <el-icon>
              <Delete/>
            </el-icon>
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
      :close-on-click-modal="false"
      width="1200px"
      class="post-dialog"
      @close="handleDialogClose"
  >
    <el-form
        :model="postForm"
        :rules="postRules"
        ref="postFormRef"
        label-width="100px"
    >
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="帖子标题" prop="title">
            <el-input v-model="postForm.title" placeholder="请输入帖子标题" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属板块" prop="categoryId">
            <el-cascader
              v-model="postForm.categoryId"
              :options="categoryTree"
              :props="{ value: 'id', label: 'name', children: 'children', emitPath: false }"
              placeholder="请选择板块"
              style="width: 100%"
              clearable
              filterable
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="帖子类型" prop="postType">
            <el-radio-group v-model="postForm.postType">
              <el-radio :label="1">普通文本</el-radio>
              <el-radio :label="2">视频</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-select v-model="postForm.status" placeholder="请选择状态">
              <el-option label="正常" :value="1" />
              <el-option label="审核中" :value="2" />
              <el-option label="删除" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item label="视频URL" prop="videoUrl" v-if="postForm.postType === 2">
            <el-input v-model="postForm.videoUrl" placeholder="请输入视频URL" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="24">
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
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item label="帖子内容" prop="content">
            <div class="editor-container">
              <Toolbar
                class="editor-toolbar"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
              />
              <Editor
                class="editor-content"
                v-model="postForm.content"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="handleEditorCreated"
                @onChange="handleEditorChange"
              />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="savePost">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, computed, shallowRef, onBeforeUnmount } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search, Refresh, Edit, Delete } from '@element-plus/icons-vue'
import forumPostApi from '@/api/forumPost'
import forumCategoryApi from '@/api/forumCategory'
import fileApi from '@/api/file'
import { useAuthStore } from '@/config/store.js'
import '@/assets/forum.css'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import apiClient from '@/api/apiClient.js'

// 响应式数据
const loading = ref(false)
const posts = ref([])
const categories = ref([])
const categoryTree = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const authStore = useAuthStore()

const API_BASE_URL = apiClient.raw.defaults.baseURL || 'http://localhost:18091'
const uploadUrl = API_BASE_URL + "/api/upload/image";

// 表单相关
const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)
const postFormRef = ref()

// 上传相关
const uploadHeaders = computed(() => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
})

const mode = 'default'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 工具栏配置
const toolbarConfig = {}

// 富文本编辑器配置
const editorConfig = reactive({
  placeholder: '请输入帖子内容...',
  MENU_CONF: {
    'uploadImage': {
      server: uploadUrl,
      fieldName: 'file',
      maxFileSize: 5 * 1024 * 1024, // 5M
      base64LimitSize: 0, // 禁用base64，强制使用上传
      // 自定义上传图片
      async customUpload(file, insertFn) {
        try {
          const formData = new FormData()
          formData.append('file', file)

          const response = await fileApi.uploadImage(formData)

          if (response && response.code === 200) {
            // 直接插入服务器URL
            const imageUrl = API_BASE_URL + response.data;
            console.log('图片上传成功:', imageUrl)
            // 插入图片
            insertFn(imageUrl, 'image.png', '图片加载中...')
            ElMessage.success('图片上传成功')
          } else {
            ElMessage.error('图片上传失败: ' + (response?.message || '未知错误'))
          }
        } catch (error) {
          ElMessage.error('图片上传失败: ' + (error.message || '网络错误'))
        }
      }
    }
  }
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
const editPost = async (row) => {
  try {
    // 显示加载状态
    loading.value = true
    
    // 调用API获取帖子详情
    const response = await forumPostApi.getById(row.id)
    
    if (response.code === 200) {
      isEdit.value = true
      dialogTitle.value = '编辑帖子'
      dialogVisible.value = true
      
      // 填充表单数据
      Object.assign(postForm, response.data)
    } else {
      ElMessage.error(response.message || '获取帖子详情失败')
    }
  } catch (error) {
    console.error('获取帖子详情失败:', error)
    ElMessage.error('获取帖子详情失败: ' + (error.message || '网络错误'))
  } finally {
    loading.value = false
  }
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
 * 获取板块列表（用于筛选）
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

/**
 * 获取板块树（用于表单中的级联选择器）
 */
const fetchCategoryTree = async () => {
  try {
    const response = await forumCategoryApi.getTree({})
    if (response.code === 200) {
      categoryTree.value = response.data
    }
  } catch (error) {
    console.error('获取板块树失败:', error)
  }
}

// 编辑器创建回调
const handleEditorCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

// 编辑器内容变化处理
const handleEditorChange = (editor) => {
  postForm.content = editor.getHtml()
}

// 在组件卸载前销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

// 生命周期
onMounted(() => {
  fetchPosts()
  fetchCategories()
  fetchCategoryTree()
})
</script>

<style scoped>
/* 表格操作列样式 */
.table-card .el-table .el-button--small {
  padding: 6px 10px;
  margin: 0 2px;
}

/* 表单对话框样式 */
.post-dialog .el-dialog__body {
  padding: 20px;
}

.post-dialog .el-form {
  margin-top: 10px;
}

.post-dialog {
  width: 1200px;
  margin-top: 4vh;
}

/* 表单行间距 */
.post-dialog .el-row {
  margin-bottom: 15px;
}

/* 表单项标签 */
.post-dialog .el-form-item__label {
  font-weight: 500;
}

/* 封面上传区域 */
.cover-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
  margin-top: 10px;
}

.cover-uploader:hover {
  border-color: #409eff;
}

.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
  line-height: 120px;
}

.cover {
  width: 120px;
  height: 120px;
  display: block;
  object-fit: cover;
}

/* 对话框底部按钮 */
.dialog-footer {
  text-align: right;
  padding: 15px 20px 0;
  border-top: 1px solid #ebeef5;
  margin-top: 10px;
}

/* 分页容器 */
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.post-title-cell {
  display: flex;
  align-items: center;
  gap: 5px;
}

.post-title {
  flex: 1;
}

/* 富文本编辑器容器 */
.editor-container {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.editor-toolbar {
  border-bottom: 1px solid #dcdfe6;
  background-color: #f5f7fa;
}

.editor-content {
  min-height: 300px;
  background-color: #fff;
}
</style>