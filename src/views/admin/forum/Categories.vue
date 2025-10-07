<template>
  <el-page-header class="page-header" title="论坛管理">
    <template #content>
      管理论坛板块
    </template>
  </el-page-header>

  <el-card class="filter-card">
    <el-row type="flex" justify="space-between" align="middle" class="filters-bar">
      <el-col :span="22">
        <el-form :model="filterForm" inline>
          <el-form-item label="板块名称">
            <el-input
              v-model="filterForm.name"
              placeholder="搜索板块名称"
              clearable
              @keyup.enter="fetchCategories"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="filterForm.status" placeholder="选择状态" clearable>
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="fetchCategories">
              <el-icon><Search /></el-icon>
              搜索
            </el-button>
            <el-button @click="resetFilter">
              <el-icon><Refresh /></el-icon>
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="2" style="text-align: right;">
        <el-button type="primary" @click="showCategoryForm">
          <el-icon><Plus /></el-icon>
          新增板块
        </el-button>
      </el-col>
    </el-row>
  </el-card>

  <el-card class="table-card">
    <el-table
      :data="categoryTree"
      :loading="loading"
      stripe
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      default-expand-all
    >
      <el-table-column prop="name" label="板块名称" min-width="150" />
      <el-table-column prop="level" label="板块级别" min-width="100">
        <template #default="{ row }">
          <el-tag v-if="row.level === 1" type="primary">一级板块</el-tag>
          <el-tag v-else-if="row.level === 2" type="success">二级板块</el-tag>
          <span v-else>{{ getCategoryLevelText(row.level) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" min-width="80" />
      <el-table-column label="状态" min-width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'">
            {{ row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="160">
        <template #default="{ row }">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="250" fixed="right">
        <template #default="{ row }">
          <el-button type="warning" size="small" text @click="editCategory(row)">
            <el-icon><Edit /></el-icon>
            编辑
          </el-button>
          <el-button type="primary" size="small" text @click="addChildCategory(row)" v-if="row.level === 1">
            <el-icon><Plus /></el-icon>
            添加下级
          </el-button>
          <el-button type="danger" size="small" text @click="deleteCategory(row)">
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <el-empty description="暂无数据" v-if="categoryTree.length === 0 && !loading" />
  </el-card>

  <!-- 板块表单对话框 -->
  <el-dialog
    :title="dialogTitle"
    v-model="dialogVisible"
    width="600px"
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

      <el-form-item label="板块级别" prop="level">
        <el-select v-model="categoryForm.level" placeholder="请选择板块级别" style="width: 100%" :disabled="isEdit || isAddChild">
          <el-option label="一级板块" :value="1" />
          <el-option label="二级板块" :value="2" />
        </el-select>
      </el-form-item>

      <el-form-item label="上级板块" prop="parentId" v-if="categoryForm.level === 2">
        <el-select 
          v-model="categoryForm.parentId" 
          placeholder="请选择上级板块" 
          style="width: 100%" 
          :disabled="isEdit || isAddChild"
        >
          <el-option
            v-for="category in parentCategoryOptions"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="板块描述" prop="description">
        <el-input
          v-model="categoryForm.description"
          type="textarea"
          :rows="3"
          placeholder="请输入板块描述"
        />
      </el-form-item>

      <el-form-item label="排序号" prop="sort">
        <el-input-number v-model="categoryForm.sort" :min="0" controls-position="right" style="width: 100%" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="categoryForm.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveCategory" :loading="saving">
          {{ saving ? '保存中...' : '保存' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search, Refresh, Folder, Edit, Delete } from '@element-plus/icons-vue'
import forumCategoryApi from '@/api/forumCategory'
import { useAuthStore } from '@/config/store.js'

const authStore = useAuthStore()

// 响应式数据
const loading = ref(false)
const saving = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const isAddChild = ref(false)
const categoryFormRef = ref()

// 分类列表数据
const categoryTree = ref([])
const parentCategoryOptions = ref([])

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
  ]
}

// 计算属性
const dialogTitle = computed(() => {
  if (isAddChild.value) return '添加下级板块'
  return isEdit.value ? '编辑板块' : '新增板块'
})

/**
 * 计算属性
 */
const allCategories = computed(() => {
  return [...categoryTree.value, ...parentCategoryOptions.value]
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
 * 获取板块级别文本描述
 */
const getCategoryLevelText = (level) => {
  const levelMap = {
    1: '一级板块',
    2: '二级板块'
  }
  return levelMap[level] || '未知'
}

/**
 * 显示板块表单
 */
const showCategoryForm = () => {
  isEdit.value = false
  isAddChild.value = false
  resetCategoryForm()
  nextTick(() => {
    if (categoryFormRef.value) {
      categoryFormRef.value.clearValidate()
    }
  })
  dialogVisible.value = true
}

/**
 * 添加下级板块
 */
const addChildCategory = (category) => {
  isEdit.value = false
  isAddChild.value = true
  resetCategoryForm()
  categoryForm.parentId = category.id
  categoryForm.level = category.level + 1
  nextTick(() => {
    if (categoryFormRef.value) {
      categoryFormRef.value.clearValidate()
    }
  })
  dialogVisible.value = true
}

/**
 * 编辑板块
 */
const editCategory = (row) => {
  isEdit.value = true
  isAddChild.value = false
  // 填充表单数据
  Object.assign(categoryForm, row)
  nextTick(() => {
    if (categoryFormRef.value) {
      categoryFormRef.value.clearValidate()
    }
  })
  dialogVisible.value = true
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
      fetchParentCategories()
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
    
    saving.value = true
    
    const data = { ...categoryForm }
    const response = await forumCategoryApi.save(data)
    
    if (response.code === 200) {
      ElMessage.success(isEdit.value ? '更新成功' : '新增成功')
      dialogVisible.value = false
      fetchCategories()
      fetchParentCategories()
    } else {
      ElMessage.error(response.message || (isEdit.value ? '更新失败' : '新增失败'))
    }
  } catch (error) {
    console.error('保存板块失败:', error)
  } finally {
    saving.value = false
  }
}

/**
 * 重置分类表单
 */
const resetCategoryForm = () => {
  Object.assign(categoryForm, {
    id: undefined,
    name: '',
    description: '',
    level: 1,
    parentId: 0,
    sort: 0,
    status: 1
  })

  if (categoryFormRef.value) {
    categoryFormRef.value.resetFields()
  }
}

/**
 * 处理对话框关闭
 */
const handleDialogClose = () => {
  categoryFormRef.value.resetFields()
}

/**
 * 重置筛选条件
 */
const resetFilter = () => {
  filterForm.name = ''
  filterForm.status = ''
  fetchCategories()
}

/**
 * 获取板块数据
 */
const fetchCategories = async () => {
  try {
    loading.value = true
    
    // 构建请求参数，只包含有值的参数
    const params = {}
    
    // 只有当筛选条件有值时才添加到参数中
    if (filterForm.name) {
      params.name = filterForm.name
    }
    if (filterForm.status !== '' && filterForm.status !== null && filterForm.status !== undefined) {
      params.status = filterForm.status
    }
    
    // 使用树形结构API获取数据
    const response = await forumCategoryApi.getTree(params)
    
    // 添加调试信息
    console.log('论坛板块树形数据API响应:', response)
    if (response.code === 200) {
      console.log('论坛板块树形数据内容:', response.data)
      categoryTree.value = response.data || []
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
    const response = await forumCategoryApi.list({ level: 1, status: 1 })
    if (response.code === 200) {
      parentCategoryOptions.value = response.data
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

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>

<style src="@/assets/admin-forum-categories.css"></style>