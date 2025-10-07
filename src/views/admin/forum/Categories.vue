<template>
  <div class="forum-categories">
    <el-card class="category-card">
      <template #header>
        <div class="card-header">
          <span>论坛板块管理</span>
          <el-button type="primary" @click="showCategoryForm">
            <el-icon><Plus /></el-icon>
            新增板块
          </el-button>
        </div>
      </template>

      <!-- 搜索和筛选区域 -->
      <div class="filter-section">
        <el-form :inline="true" :model="filterForm" class="filter-form">
          <el-form-item label="板块名称">
            <el-input v-model="filterForm.name" placeholder="请输入板块名称" clearable />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="filterForm.status" placeholder="请选择状态" clearable>
              <el-option label="全部" value="" />
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="fetchCategories">
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
        :data="categories"
        v-loading="loading"
        stripe
        style="width: 100%"
        row-key="id"
      >
        <el-table-column prop="name" label="板块名称" min-width="150">
          <template #default="{ row }">
            <div class="category-info">
              <div class="category-icon">
                <el-icon v-if="row.icon"><component :is="row.icon" /></el-icon>
                <el-icon v-else><Folder /></el-icon>
              </div>
              <span>{{ row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
        <el-table-column prop="level" label="级别" width="80">
          <template #default="{ row }">
            <el-tag :type="row.level === 1 ? 'primary' : 'success'">
              {{ row.level === 1 ? '一级' : '二级' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="parentId" label="父板块" width="120">
          <template #default="{ row }">
            <span v-if="row.parentId === 0">顶级板块</span>
            <span v-else>{{ getParentCategoryName(row.parentId) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="editCategory(row)">
              编辑
            </el-button>
            <el-button size="small" type="danger" @click="deleteCategory(row)">
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

    <!-- 板块表单对话框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="500px"
      @close="handleDialogClose"
    >
      <el-form
        :model="categoryForm"
        :rules="categoryRules"
        ref="categoryFormRef"
        label-width="100px"
      >
        <el-form-item label="板块名称" prop="name">
          <el-input v-model="categoryForm.name" placeholder="请输入板块名称" />
        </el-form-item>
        <el-form-item label="板块描述" prop="description">
          <el-input
            v-model="categoryForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入板块描述"
          />
        </el-form-item>
        <el-form-item label="板块级别" prop="level">
          <el-select v-model="categoryForm.level" placeholder="请选择板块级别">
            <el-option label="一级板块" :value="1" />
            <el-option label="二级板块" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="父板块" prop="parentId" v-if="categoryForm.level === 2">
          <el-select v-model="categoryForm.parentId" placeholder="请选择父板块" filterable>
            <el-option
              v-for="parent in parentCategories"
              :key="parent.id"
              :label="parent.name"
              :value="parent.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排序号" prop="sort">
          <el-input-number
            v-model="categoryForm.sort"
            :min="0"
            :max="999"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="categoryForm.status"
            :active-value="1"
            :inactive-value="0"
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveCategory">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search, Refresh, Folder } from '@element-plus/icons-vue'
import forumCategoryApi from '@/api/forumCategory'
import { useAuthStore } from '@/config/store.js'

const authStore = useAuthStore()

// 响应式数据
const loading = ref(false)
const categories = ref([])
const parentCategories = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 表单相关
const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)
const categoryFormRef = ref()

// 筛选表单
const filterForm = reactive({
  name: '',
  status: ''
})

// 板块表单
const categoryForm = reactive({
  id: undefined,
  name: '',
  description: '',
  level: 1,
  parentId: 0,
  sort: 0,
  status: 1
})

// 表单验证规则
const categoryRules = {
  name: [
    { required: true, message: '请输入板块名称', trigger: 'blur' }
  ],
  level: [
    { required: true, message: '请选择板块级别', trigger: 'change' }
  ]
}

/**
 * 计算属性
 */
const allCategories = computed(() => {
  return [...categories.value, ...parentCategories.value]
})

/**
 * 获取父板块名称
 */
const getParentCategoryName = (parentId) => {
  const parent = allCategories.value.find(item => item.id === parentId)
  return parent ? parent.name : ''
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
 * 显示板块表单
 */
const showCategoryForm = () => {
  isEdit.value = false
  dialogTitle.value = '新增板块'
  dialogVisible.value = true
  // 重置表单
  Object.assign(categoryForm, {
    id: undefined,
    name: '',
    description: '',
    level: 1,
    parentId: 0,
    sort: 0,
    status: 1
  })
}

/**
 * 编辑板块
 */
const editCategory = (row) => {
  isEdit.value = true
  dialogTitle.value = '编辑板块'
  dialogVisible.value = true
  // 填充表单数据
  Object.assign(categoryForm, row)
}

/**
 * 删除板块
 */
const deleteCategory = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除板块 "${row.name}" 吗？删除后将无法恢复！`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const response = await forumCategoryApi.remove(row.id)
    if (response.code === 200) {
      ElMessage.success('删除成功')
      fetchCategories()
    } else {
      ElMessage.error(response.message || '删除失败')
    }
  } catch (error) {
    // 用户取消操作
  }
}

/**
 * 保存板块
 */
const saveCategory = async () => {
  try {
    await categoryFormRef.value.validate()
    
    const data = { ...categoryForm }
    const response = await forumCategoryApi.save(data)
    
    if (response.code === 200) {
      ElMessage.success(isEdit.value ? '更新成功' : '新增成功')
      dialogVisible.value = false
      fetchCategories()
    } else {
      ElMessage.error(response.message || (isEdit.value ? '更新失败' : '新增失败'))
    }
  } catch (error) {
    console.error('保存板块失败:', error)
  }
}

/**
 * 处理对话框关闭
 */
const handleDialogClose = () => {
  categoryFormRef.value.resetFields()
}

/**
 * 处理分页大小变化
 */
const handleSizeChange = (newSize) => {
  pageSize.value = newSize
  currentPage.value = 1
  fetchCategories()
}

/**
 * 处理当前页变化
 */
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
  fetchCategories()
}

/**
 * 重置筛选条件
 */
const resetFilter = () => {
  filterForm.name = ''
  filterForm.status = ''
  currentPage.value = 1
  fetchCategories()
}

/**
 * 获取板块数据
 */
const fetchCategories = async () => {
  try {
    loading.value = true
    
    // 构建请求参数，只包含有值的参数
    const params = {
      current: currentPage.value,
      size: pageSize.value
    }
    
    // 只有当筛选条件有值时才添加到参数中
    if (filterForm.name) {
      params.name = filterForm.name
    }
    if (filterForm.status !== '' && filterForm.status !== null && filterForm.status !== undefined) {
      params.status = filterForm.status
    }
    
    // 调用API获取板块数据
    const response = await forumCategoryApi.page(params)
    
    if (response.code === 200) {
      categories.value = response.data.records
      total.value = response.data.total
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

/**
 * 获取父板块列表
 */
const fetchParentCategories = async () => {
  try {
    const response = await forumCategoryApi.list({ level: 1 })
    if (response.code === 200) {
      parentCategories.value = response.data
    }
  } catch (error) {
    console.error('获取父板块列表失败:', error)
  }
}

// 监听板块级别变化
const watchLevelChange = () => {
  // 当切换为一级板块时，清空父板块选择
  if (categoryForm.level === 1) {
    categoryForm.parentId = 0
  }
}

// 监听器
watch(() => categoryForm.level, watchLevelChange)

// 生命周期
onMounted(() => {
  fetchCategories()
  fetchParentCategories()
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

.category-info {
  display: flex;
  align-items: center;
}

.category-icon {
  margin-right: 8px;
  color: #409eff;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>