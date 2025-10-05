<template>
  <el-page-header class="page-header" title="产品管理">
    <template #content>
      管理产品SKU
    </template>
  </el-page-header>

  <el-card class="filter-card">
    <el-row type="flex" justify="space-between" align="middle" class="filters-bar">
      <el-col :span="23">
        <el-form :model="searchForm" inline>
          <el-form-item label="SKU名称">
            <el-input
              v-model="searchForm.skuName"
              placeholder="搜索SKU名称"
              clearable
              @keyup.enter="handleSearch"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="SKU编码">
            <el-input
              v-model="searchForm.skuCode"
              placeholder="搜索SKU编码"
              clearable
              @keyup.enter="handleSearch"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
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

      <el-col :span="1" style="text-align: right;">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          新增SKU
        </el-button>
      </el-col>
    </el-row>
  </el-card>

  <el-card class="table-card">
    <el-table
      :data="skuList"
      :loading="loading"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" min-width="50" />
      <el-table-column prop="skuName" label="SKU名称" min-width="150" />
      <el-table-column prop="skuCode" label="SKU编码" min-width="120" />
      <el-table-column prop="price" label="价格" min-width="100">
        <template #default="{ row }">
          ¥{{ row.price }}
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="库存" min-width="100" />
      <el-table-column label="产品" min-width="150">
        <template #default="{ row }">
          <span v-if="getProductById(row.productId)">
            {{ getProductById(row.productId).productName }}
          </span>
          <span v-else>N/A</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'">
            {{ row.status === 1 ? '有效' : '无效' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="160" />

      <el-table-column label="操作" width="250" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" size="small" text @click="handleView(row)">
            <el-icon><View /></el-icon>
            查看
          </el-button>
          <el-button type="warning" size="small" text @click="handleEdit(row)">
            <el-icon><Edit /></el-icon>
            编辑
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

  <!-- SKU表单对话框 -->
  <el-dialog
    :title="dialogTitle"
    v-model="dialogVisible"
    width="600px"
    :close-on-click-modal="false"
  >
    <el-form
      ref="skuFormRef"
      :model="skuForm"
      :rules="skuRules"
      label-width="100px"
    >
      <el-form-item label="SKU名称" prop="skuName">
        <el-input 
          v-model="skuForm.skuName" 
          placeholder="请输入SKU名称" 
          :disabled="formMode === 'view'"
        />
      </el-form-item>
      
      <el-form-item label="SKU编码" prop="skuCode">
        <el-input 
          v-model="skuForm.skuCode" 
          placeholder="请输入SKU编码"
          :disabled="formMode === 'view' || formMode === 'edit'"
        />
      </el-form-item>
      
      <el-form-item label="所属产品" prop="productId">
        <el-select 
          v-model="skuForm.productId" 
          placeholder="请选择产品" 
          style="width: 100%" 
          filterable
          :disabled="formMode === 'view'"
        >
          <el-option
            v-for="product in productList"
            :key="product.id"
            :label="product.productName"
            :value="product.id"
          />
        </el-select>
      </el-form-item>
      
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="价格" prop="price">
            <el-input-number 
              v-model="skuForm.price" 
              :precision="2" 
              :step="0.1" 
              :min="0" 
              controls-position="right" 
              style="width: 100%" 
              :disabled="formMode === 'view'"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="库存" prop="stock">
            <el-input-number 
              v-model="skuForm.stock" 
              :min="0" 
              controls-position="right" 
              style="width: 100%" 
              :disabled="formMode === 'view'"
            />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-form-item label="规格描述" prop="specifications">
        <el-input 
          v-model="skuForm.specifications" 
          type="textarea"
          placeholder="请输入规格描述"
          :rows="3"
          :disabled="formMode === 'view'"
        />
      </el-form-item>
      
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="skuForm.status" :disabled="formMode === 'view'">
          <el-radio :label="1">有效</el-radio>
          <el-radio :label="0">无效</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer" v-if="formMode !== 'view'">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saving">
          {{ saving ? '保存中...' : '保存' }}
        </el-button>
      </div>
      <div class="dialog-footer" v-else>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import productSkuApi from '@/api/productSku.js'
import productApi from '@/api/product.js'
import { Plus, Search, Refresh, View, Edit, Delete } from '@element-plus/icons-vue'

// 响应式数据
const loading = ref(false)
const saving = ref(false)
const dialogVisible = ref(false)
const formMode = ref('create') // 'create', 'edit', 'view'
const skuFormRef = ref()

// SKU列表数据
const skuList = ref([])
const productList = ref([])
const productMap = ref(new Map())

// 搜索表单
const searchForm = reactive({
  skuName: '',
  skuCode: ''
})

// 分页信息
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
})

// SKU表单
const skuForm = reactive({
  id: null,
  skuName: '',
  skuCode: '',
  productId: null,
  price: 0,
  stock: 0,
  specifications: '',
  status: 1
})

// 表单验证规则
const skuRules = {
  skuName: [
    { required: true, message: '请输入SKU名称', trigger: 'blur' },
    { min: 2, max: 100, message: 'SKU名称长度在 2 到 100 个字符', trigger: 'blur' }
  ],
  skuCode: [
    { required: true, message: '请输入SKU编码', trigger: 'blur' },
    { min: 2, max: 50, message: 'SKU编码长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  productId: [
    { required: true, message: '请选择产品', trigger: 'change' }
  ],
  price: [
    { required: true, message: '请输入价格', trigger: 'blur' }
  ],
  stock: [
    { required: true, message: '请输入库存', trigger: 'blur' }
  ]
}

// 计算属性
const dialogTitle = computed(() => {
  switch (formMode.value) {
    case 'create':
      return '新增SKU'
    case 'edit':
      return '编辑SKU'
    case 'view':
      return '查看SKU'
    default:
      return 'SKU管理'
  }
})

/**
 * 加载SKU列表
 */
const loadSkuList = async () => {
  loading.value = true
  try {
    const params = {
      current: pagination.page,
      size: pagination.size,
      skuName: searchForm.skuName || undefined,
      skuCode: searchForm.skuCode || undefined
    }

    const response = await productSkuApi.page(params)
    if (response) {
      const records = response.data.records || []
      skuList.value = records
      pagination.total = response.total != null ? response.total : (response.count || 0)
      pagination.page = response.current || pagination.page
      pagination.size = response.size || pagination.size
    }
  } catch (error) {
    console.error('加载SKU列表失败:', error)
    ElMessage.error('加载SKU列表失败')
  } finally {
    loading.value = false
  }
}

/**
 * 加载产品列表
 */
const loadProductList = async () => {
  try {
    const response = await productApi.list({ status: 1 })
    if (response && response.code === 200) {
      productList.value = response.data || []
      
      // 构建产品映射表，便于通过ID查找产品
      productMap.value.clear()
      productList.value.forEach(product => {
        productMap.value.set(product.id, product)
      })
    } else {
      ElMessage.error('获取产品列表失败')
    }
  } catch (error) {
    console.error('加载产品列表失败:', error)
    ElMessage.error('加载产品列表失败: ' + (error.message || '未知错误'))
  }
}

/**
 * 根据产品ID获取产品信息
 */
const getProductById = (productId) => {
  if (!productId) return null
  return productMap.value.get(productId)
}

/**
 * 搜索
 */
const handleSearch = () => {
  pagination.page = 1
  loadSkuList()
  ElMessage.success('搜索成功')
}

/**
 * 重置搜索
 */
const handleReset = () => {
  searchForm.skuName = ''
  searchForm.skuCode = ''
  pagination.page = 1
  loadSkuList()
  ElMessage.info('搜索条件已重置')
}

/**
 * 分页大小改变
 */
const handleSizeChange = (newSize) => {
  pagination.size = newSize
  pagination.page = 1
  loadSkuList()
  ElMessage.info(`页面大小已更改为 ${newSize} 条/页`)
}

/**
 * 当前页改变
 */
const handleCurrentChange = (newPage) => {
  pagination.page = newPage
  loadSkuList()
  ElMessage.info(`正在加载第 ${newPage} 页`)
}

/**
 * 新增SKU
 */
const handleAdd = () => {
  formMode.value = 'create'
  resetSkuForm()
  dialogVisible.value = true
}

/**
 * 查看SKU
 */
const handleView = (sku) => {
  formMode.value = 'view'
  Object.assign(skuForm, {
    id: sku.id,
    skuName: sku.skuName,
    skuCode: sku.skuCode,
    productId: sku.productId,
    price: sku.price,
    stock: sku.stock,
    specifications: sku.specifications,
    status: sku.status
  })
  dialogVisible.value = true
}

/**
 * 编辑SKU
 */
const handleEdit = (sku) => {
  formMode.value = 'edit'
  Object.assign(skuForm, {
    id: sku.id,
    skuName: sku.skuName,
    skuCode: sku.skuCode,
    productId: sku.productId,
    price: sku.price,
    stock: sku.stock,
    specifications: sku.specifications,
    status: sku.status
  })
  dialogVisible.value = true
}

/**
 * 删除SKU
 */
const handleDelete = async (sku) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除SKU "${sku.skuName}" 吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    const response = await productSkuApi.remove(sku.id)
    if (response !== undefined) {
      ElMessage.success('删除成功')
      loadSkuList()
    } else {
      ElMessage.error('删除失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除SKU失败:', error)
      ElMessage.error('删除失败')
    }
  }
}

/**
 * 保存SKU
 */
const handleSave = async () => {
  console.log('保存SKU...')
  // 查看模式下不保存
  if (formMode.value === 'view') {
    dialogVisible.value = false
    return
  }

  if (!skuFormRef.value) return

  try {
    await skuFormRef.value.validate()

    saving.value = true

    const skuData = {
      id: skuForm.id,
      skuName: skuForm.skuName,
      skuCode: skuForm.skuCode,
      productId: skuForm.productId,
      price: skuForm.price,
      stock: skuForm.stock,
      specifications: skuForm.specifications,
      status: skuForm.status
    }

    const response = await productSkuApi.save(skuData)

    if (response !== undefined) {
      ElMessage.success(formMode.value === 'edit' ? '更新成功' : '创建成功')
      dialogVisible.value = false
      loadSkuList()
    } else {
      ElMessage.error('保存失败')
    }
  } catch (error) {
    console.error('保存SKU失败:', error)
    ElMessage.error('保存失败')
  } finally {
    saving.value = false
  }
}

/**
 * 重置SKU表单
 */
const resetSkuForm = () => {
  Object.assign(skuForm, {
    id: null,
    skuName: '',
    skuCode: '',
    productId: null,
    price: 0,
    stock: 0,
    specifications: '',
    status: 1
  })

  if (skuFormRef.value) {
    skuFormRef.value.resetFields()
  }
}

// 生命周期
onMounted(() => {
  loadSkuList()
  loadProductList()
})
</script>

<style scoped>
</style>