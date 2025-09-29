<template>
  <el-page-header class="page-header" title="产品管理">
    <template #content>
      管理产品分类
    </template>
  </el-page-header>

  <el-card class="filter-card">
    <el-row type="flex" justify="space-between" align="middle" class="filters-bar">
      <el-col :span="18">
        <el-form :model="searchForm" inline>
          <el-form-item label="分类名称">
            <el-input
              v-model="searchForm.categoryName"
              placeholder="搜索分类名称"
              clearable
              @keyup.enter="handleSearch"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="分类级别">
            <el-select v-model="searchForm.categoryLevel" placeholder="选择分类级别" clearable>
              <el-option label="一级分类" :value="1" />
              <el-option label="二级分类" :value="2" />
              <el-option label="三级分类" :value="3" />
            </el-select>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="选择状态" clearable>
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
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

      <el-col :span="6" style="text-align: right;">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          新增分类
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
      <el-table-column prop="categoryName" label="分类名称" min-width="150" />
      <el-table-column prop="categoryLevel" label="分类级别" min-width="100">
        <template #default="{ row }">
          <el-tag v-if="row.categoryLevel === 1" type="primary">一级分类</el-tag>
          <el-tag v-else-if="row.categoryLevel === 2" type="success">二级分类</el-tag>
          <el-tag v-else-if="row.categoryLevel === 3" type="warning">三级分类</el-tag>
          <span v-else>{{ getCategoryLevelText(row.categoryLevel) }}</span>
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
      <el-table-column prop="createTime" label="创建时间" min-width="160" />

      <el-table-column label="操作" width="250" fixed="right">
        <template #default="{ row }">
          <el-button type="warning" size="small" text @click="handleEdit(row)">
            <el-icon><Edit /></el-icon>
            编辑
          </el-button>
          <el-button type="primary" size="small" text @click="handleAddChild(row)">
            <el-icon><Plus /></el-icon>
            添加下级
          </el-button>
          <el-button type="danger" size="small" text @click="handleDelete(row)">
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog
    :title="dialogTitle"
    v-model="dialogVisible"
    width="600px"
  >
    <el-form
      ref="categoryFormRef"
      :model="categoryForm"
      :rules="categoryRules"
      label-width="100px"
    >
      <el-form-item label="分类名称" prop="categoryName">
        <el-input v-model="categoryForm.categoryName" placeholder="请输入分类名称" />
      </el-form-item>

      <el-form-item label="分类级别" prop="categoryLevel">
        <el-select v-model="categoryForm.categoryLevel" placeholder="请选择分类级别" style="width: 100%" :disabled="isEdit || isAddChild">
          <el-option label="一级分类" :value="1" />
          <el-option label="二级分类" :value="2" />
          <el-option label="三级分类" :value="3" />
        </el-select>
      </el-form-item>

      <el-form-item label="上级分类" prop="parentId">
        <el-select 
          v-model="categoryForm.parentId" 
          placeholder="请选择上级分类" 
          style="width: 100%" 
          :disabled="isEdit || isAddChild"
        >
          <el-option
            v-for="category in categoryOptions"
            :key="category.id"
            :label="category.categoryName"
            :value="category.id"
          />
        </el-select>
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
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saving">
          {{ saving ? '保存中...' : '保存' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import productCategoryApi from '@/api/productCategory.js'
import { Plus, Search, Refresh, Edit, Delete } from '@element-plus/icons-vue'

// 响应式数据
const loading = ref(false)
const saving = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const isAddChild = ref(false)
const categoryFormRef = ref()

// 分类列表数据
const categoryTree = ref([])
const categoryOptions = ref([])

// 搜索表单
const searchForm = reactive({
  categoryName: '',
  categoryLevel: '',
  status: ''
})

// 分类表单
const categoryForm = reactive({
  id: null,
  categoryName: '',
  categoryLevel: 1,
  parentId: 0,
  sort: 0,
  status: 1
})

// 表单验证规则
const categoryRules = {
  categoryName: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { min: 2, max: 50, message: '分类名称长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  categoryLevel: [
    { required: true, message: '请选择分类级别', trigger: 'change' }
  ]
}

// 计算属性
const dialogTitle = computed(() => {
  if (isAddChild.value) return '添加下级分类'
  return isEdit.value ? '编辑分类' : '新增分类'
})

/**
 * 加载分类树
 */
const loadCategoryTree = async () => {
  loading.value = true
  try {
    const params = {}
    
    if (searchForm.categoryName) {
      params.categoryName = searchForm.categoryName
    }
    
    if (searchForm.categoryLevel !== '') {
      params.categoryLevel = searchForm.categoryLevel
    }
    
    if (searchForm.status !== '') {
      params.status = searchForm.status
    }

    const response = await productCategoryApi.getTree()
    if (response && response.code === 200) {
      categoryTree.value = response.data || []
    } else {
      ElMessage.error('获取分类树失败')
    }
  } catch (error) {
    console.error('加载分类树失败:', error)
    ElMessage.error('加载分类树失败: ' + (error.message || '未知错误'))
  } finally {
    loading.value = false
  }
}

/**
 * 加载分类选项
 */
const loadCategoryOptions = async () => {
  try {
    const response = await productCategoryApi.list({ status: 1 })
    if (response && response.code === 200) {
      categoryOptions.value = response.data || []
    } else {
      ElMessage.error('获取分类选项失败')
    }
  } catch (error) {
    console.error('加载分类选项失败:', error)
    ElMessage.error('加载分类选项失败: ' + (error.message || '未知错误'))
  }
}

/**
 * 搜索
 */
const handleSearch = () => {
  loadCategoryTree()
  ElMessage.success('搜索成功')
}

/**
 * 重置搜索
 */
const handleReset = () => {
  searchForm.categoryName = ''
  searchForm.categoryLevel = ''
  searchForm.status = ''
  loadCategoryTree()
  ElMessage.info('搜索条件已重置')
}

/**
 * 新增分类
 */
const handleAdd = () => {
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
 * 添加下级分类
 */
const handleAddChild = (category) => {
  isEdit.value = false
  isAddChild.value = true
  resetCategoryForm()
  categoryForm.parentId = category.id
  categoryForm.categoryLevel = category.categoryLevel + 1
  nextTick(() => {
    if (categoryFormRef.value) {
      categoryFormRef.value.clearValidate()
    }
  })
  dialogVisible.value = true
}

/**
 * 编辑分类
 */
const handleEdit = (category) => {
  isEdit.value = true
  isAddChild.value = false
  Object.assign(categoryForm, {
    id: category.id,
    categoryName: category.categoryName,
    categoryLevel: category.categoryLevel,
    parentId: category.parentId,
    sort: category.sort,
    status: category.status
  })
  nextTick(() => {
    if (categoryFormRef.value) {
      categoryFormRef.value.clearValidate()
    }
  })
  dialogVisible.value = true
}

/**
 * 删除分类
 */
const handleDelete = async (category) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除分类 "${category.categoryName}" 吗？此操作将同时删除其所有子分类。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    const response = await productCategoryApi.remove(category.id)
    if (response !== undefined) {
      ElMessage.success('删除成功')
      loadCategoryTree()
      loadCategoryOptions()
    } else {
      ElMessage.error('删除失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除分类失败:', error)
      ElMessage.error('删除失败')
    }
  }
}

/**
 * 保存分类
 */
const handleSave = async () => {
  if (!categoryFormRef.value) return

  try {
    await categoryFormRef.value.validate()

    saving.value = true

    const categoryData = {
      id: categoryForm.id,
      categoryName: categoryForm.categoryName,
      categoryLevel: categoryForm.categoryLevel,
      parentId: categoryForm.parentId || 0,
      sort: categoryForm.sort,
      status: categoryForm.status
    }

    const response = await productCategoryApi.save(categoryData)

    if (response !== undefined) {
      ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
      dialogVisible.value = false
      loadCategoryTree()
      loadCategoryOptions()
    } else {
      ElMessage.error('保存失败')
    }
  } catch (error) {
    console.error('保存分类失败:', error)
    ElMessage.error('保存失败')
  } finally {
    saving.value = false
  }
}

/**
 * 重置分类表单
 */
const resetCategoryForm = () => {
  Object.assign(categoryForm, {
    id: null,
    categoryName: '',
    categoryLevel: 1,
    parentId: 0,
    sort: 0,
    status: 1
  })

  if (categoryFormRef.value) {
    categoryFormRef.value.resetFields()
  }
}

/**
 * 获取分类级别文本描述
 */
const getCategoryLevelText = (level) => {
  const levelMap = {
    1: '一级分类',
    2: '二级分类',
    3: '三级分类'
  }
  return levelMap[level] || '未知'
}

// 生命周期
onMounted(() => {
  loadCategoryTree()
  loadCategoryOptions()
})
</script>

<style scoped>
</style>