<template>
  <el-page-header class="page-header" title="商户管理">
    <template #content>
      管理商户产品
    </template>
  </el-page-header>

  <el-card class="filter-card">
    <el-row type="flex" justify="space-between" align="middle" class="filters-bar">
      <el-col :span="23">
        <el-form :model="searchForm" inline>
          <el-form-item label="产品名称">
            <el-input
              v-model="searchForm.productName"
              placeholder="搜索产品名称"
              clearable
              @keyup.enter="handleSearch"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="产品编码">
            <el-input
              v-model="searchForm.productCode"
              placeholder="搜索产品编码"
              clearable
              @keyup.enter="handleSearch"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="选择状态" clearable>
              <el-option label="上架" :value="1" />
              <el-option label="下架" :value="0" />
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

      <el-col :span="1" style="text-align: right;">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          上架产品
        </el-button>
      </el-col>
    </el-row>
  </el-card>

  <el-card class="table-card">
    <el-table
      :data="merchantProductList"
      :loading="loading"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" min-width="50" />
      <el-table-column label="产品图片" min-width="100">
        <template #default="{ row }">
          <el-image
            :src="getFirstImage(row.subImages)"
            class="product-image"
            fit="cover"
            :preview-src-list="getImageList(row.subImages)"
            preview-teleported
          >
            <template #error>
              <div class="image-slot">
                <el-icon><icon-picture /></el-icon>
              </div>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="merchantName" label="产品名称" min-width="150" />
      <el-table-column prop="brand" label="品牌" min-width="100" />
      <el-table-column prop="description" label="产品描述" min-width="200" show-overflow-tooltip />
      <el-table-column prop="skuCode" label="产品编码" min-width="120" />
      <el-table-column prop="skuId" label="SKU ID" min-width="100" />
      <el-table-column prop="price" label="商户定价" min-width="100">
        <template #default="{ row }">
          ¥{{ row.price }}
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="商户库存" min-width="100" />
      <el-table-column prop="avgRating" label="平均评分" min-width="100" />
      <el-table-column prop="totalSales" label="总销量" min-width="100" />
      <el-table-column label="是否热销" min-width="100">
        <template #default="{ row }">
          <el-tag :type="row.isHot === 1 ? 'success' : 'info'">
            {{ row.isHot === 1 ? '是' : '否' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否折扣" min-width="100">
        <template #default="{ row }">
          <el-tag :type="row.isDiscounted === 1 ? 'warning' : 'info'">
            {{ row.isDiscounted === 1 ? '是' : '否' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'">
            {{ row.status === 1 ? '上架' : '下架' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="160" />
      <el-table-column prop="updateTime" label="更新时间" min-width="160" />

      <el-table-column label="操作" width="250" fixed="right">
        <template #default="{ row }">
          <el-button v-if="row.status === 1" type="warning" size="small" text @click="handleOffShelf(row)">
            <el-icon><Close /></el-icon>
            下架
          </el-button>
          <el-button v-else type="success" size="small" text @click="handleOnShelf(row)">
            <el-icon><Check /></el-icon>
            上架
          </el-button>
          <el-button type="primary" size="small" text @click="handleEdit(row)">
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

  <!-- 商户产品表单对话框 -->
  <el-dialog
    :title="dialogTitle"
    v-model="dialogVisible"
    width="600px"
    :close-on-click-modal="false"
  >
    <el-form
      ref="merchantProductFormRef"
      :model="merchantProductForm"
      :rules="merchantProductRules"
      label-width="100px"
    >
      <el-form-item v-if="!isEdit" label="选择SKU" prop="skuId">
        <el-select 
          v-model="merchantProductForm.skuId" 
          placeholder="请选择SKU" 
          style="width: 100%" 
          filterable
          remote
          :remote-method="loadAvailableSkus"
          :loading="loading"
          @change="handleSkuChange"
        >
          <el-option
            v-for="sku in availableSkus"
            :key="sku.id"
            :label="sku.merchantName"
            :value="sku.id"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item label="产品名称">
        <el-input v-model="selectedSku.merchantName" disabled />
      </el-form-item>
      
      <el-form-item label="产品编码">
        <el-input v-model="selectedSku.skuCode" disabled />
      </el-form-item>

      <el-form-item label="SKU ID">
        <el-input v-model="merchantProductForm.skuId" disabled />
      </el-form-item>

      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="商户定价" prop="price">
            <el-input-number 
              v-model="merchantProductForm.price" 
              :precision="2" 
              :step="0.1" 
              :min="0" 
              controls-position="right" 
              style="width: 100%" 
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商户库存" prop="stock">
            <el-input-number 
              v-model="merchantProductForm.stock" 
              :min="0" 
              controls-position="right" 
              style="width: 100%" 
            />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="merchantProductForm.status">
          <el-radio :label="1">上架</el-radio>
          <el-radio :label="0">下架</el-radio>
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
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import merchantProductApi from '@/api/merchantProduct.js'
import productSkuApi from '@/api/productSku.js'
import { Plus, Search, Refresh, Edit, Delete, Check, Close, Picture as IconPicture } from '@element-plus/icons-vue'

// 响应式数据
const loading = ref(false)
const saving = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const merchantProductFormRef = ref()

// 商户产品列表数据
const merchantProductList = ref([])
const availableSkus = ref([])
const selectedSku = ref({})

// 搜索表单
const searchForm = reactive({
  productName: '',
  productCode: '',
  status: ''
})

// 分页信息
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
})

// 商户产品表单
const merchantProductForm = reactive({
  id: null,
  merchantId: 1, // 默认商户ID，实际应该从登录用户获取
  productId: null,
  skuId: null,
  price: 0,
  stock: 0,
  status: 1
})

// 表单验证规则
const merchantProductRules = {
  skuId: [
    { required: true, message: '请选择SKU', trigger: 'change' }
  ],
  price: [
    { required: true, message: '请输入商户定价', trigger: 'blur' }
  ],
  stock: [
    { required: true, message: '请输入商户库存', trigger: 'blur' }
  ]
}

// 计算属性
const dialogTitle = computed(() => isEdit.value ? '编辑商户产品' : '上架产品')

/**
 * 加载商户产品列表
 */
const loadMerchantProductList = async () => {
  loading.value = true
  try {
    const params = {
      current: pagination.page,
      size: pagination.size,
      merchantId: merchantProductForm.merchantId,
      productName: searchForm.productName || undefined,
      productCode: searchForm.productCode || undefined,
      status: searchForm.status !== '' ? searchForm.status : undefined
    }

    const response = await merchantProductApi.page(params)
    if (response && response.code === 200) {
      const pageData = response.data || {}
      const records = pageData.records || []
      merchantProductList.value = records
      pagination.total = pageData.total != null ? pageData.total : (pageData.count || 0)
      pagination.page = pageData.current || pagination.page
      pagination.size = pageData.size || pagination.size
    } else {
      ElMessage.error('加载商户产品列表失败: ' + (response?.message || '未知错误'))
    }
  } catch (error) {
    console.error('加载商户产品列表失败:', error)
    ElMessage.error('加载商户产品列表失败: ' + (error.message || '网络错误'))
  } finally {
    loading.value = false
  }
}

/**
 * 加载可上架的SKU列表
 */
const loadAvailableSkus = async (searchKeyword = '') => {
  try {
    const params = {
      merchantName: searchKeyword || undefined,
      current: 1,
      size: 100
    }
    
    const response = await productSkuApi.search(params)
    if (response && response.code === 200) {
      availableSkus.value = response.data
    } else {
      ElMessage.error('加载可上架SKU列表失败: ' + (response?.message || '未知错误'))
    }
  } catch (error) {
    console.error('加载可上架SKU列表失败:', error)
    ElMessage.error('加载可上架SKU列表失败: ' + (error.message || '网络错误'))
  }
}

/**
 * 处理SKU选择变化
 */
const handleSkuChange = (skuId) => {
  const sku = availableSkus.value.find(s => s.id === skuId)
  if (sku) {
    selectedSku.value = sku
    // 同时设置productId
    merchantProductForm.productId = sku.productId
    // 自动填充价格和库存（可选）
    merchantProductForm.price = sku.price || 0
    merchantProductForm.stock = sku.stock || 0
  }
}

/**
 * 搜索
 */
const handleSearch = () => {
  pagination.page = 1
  loadMerchantProductList()
  ElMessage.success('搜索成功')
}

/**
 * 重置搜索
 */
const handleReset = () => {
  searchForm.productName = ''
  searchForm.productCode = ''
  searchForm.status = ''
  pagination.page = 1
  loadMerchantProductList()
  ElMessage.info('搜索条件已重置')
}

/**
 * 分页大小改变
 */
const handleSizeChange = (val) => {
  pagination.size = val
  pagination.page = 1
  loadMerchantProductList()
}

/**
 * 当前页改变
 */
const handleCurrentChange = (val) => {
  pagination.page = val
  loadMerchantProductList()
}

/**
 * 新增商户产品
 */
const handleAdd = () => {
  isEdit.value = false
  dialogVisible.value = true
  // 重置表单
  Object.assign(merchantProductForm, {
    id: null,
    merchantId: 1, // 默认商户ID，实际应该从登录用户获取
    productId: null,
    skuId: null,
    price: 0,
    stock: 0,
    status: 1
  })
  selectedSku.value = {}
  loadAvailableSkus()
}

/**
 * 编辑商户产品
 */
const handleEdit = async (row) => {
  isEdit.value = true
  dialogVisible.value = true
  // 填充表单数据
  Object.assign(merchantProductForm, row)
  // 设置选中产品信息
  if (row.skuId) {
    try {
      const response = await productSkuApi.getById(row.skuId)
      if (response && response.code === 200) {
        selectedSku.value = response.data || {}
      } else {
        ElMessage.error('加载SKU信息失败: ' + (response?.message || '未知错误'))
      }
    } catch (error) {
      console.error('加载SKU信息失败:', error)
      ElMessage.error('加载SKU信息失败: ' + (error.message || '未知错误'))
    }
  }
}

/**
 * 上架产品
 */
const handleOnShelf = async (row) => {
  try {
    const response = await merchantProductApi.onShelf({
      id: row.id,
      merchantId: row.merchantId,
      productId: row.productId,
      skuId: row.skuId,
      price: row.price,
      stock: row.stock,
      status: 1
    })
    if (response && response.code === 200) {
      ElMessage.success('产品上架成功')
      loadMerchantProductList()
    } else {
      ElMessage.error('产品上架失败: ' + (response?.message || '未知错误'))
    }
  } catch (error) {
    console.error('产品上架失败:', error)
    ElMessage.error('产品上架失败: ' + (error.message || '未知错误'))
  }
}

/**
 * 下架产品
 */
const handleOffShelf = async (row) => {
  try {
    await ElMessageBox.confirm('确定要下架该产品吗？', '提示', {
      type: 'warning'
    })
    
    const response = await merchantProductApi.offShelf(row.id)
    if (response && response.code === 200) {
      ElMessage.success('产品下架成功')
      loadMerchantProductList()
    } else {
      ElMessage.error('产品下架失败: ' + (response?.message || '未知错误'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('产品下架失败:', error)
      ElMessage.error('产品下架失败: ' + (error.message || '未知错误'))
    }
  }
}

/**
 * 删除商户产品
 */
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除该商户产品吗？', '提示', {
      type: 'warning'
    })
    
    const response = await merchantProductApi.remove(row.id)
    if (response && response.code === 200) {
      ElMessage.success('删除成功')
      loadMerchantProductList()
    } else {
      ElMessage.error('删除失败: ' + (response?.message || '未知错误'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
      ElMessage.error('删除失败: ' + (error.message || '未知错误'))
    }
  }
}

/**
 * 保存商户产品
 */
const handleSave = async () => {
  try {
    await merchantProductFormRef.value.validate()
    
    saving.value = true
    const formData = { ...merchantProductForm }
    
    // 如果是编辑模式且没有选择产品，则使用当前产品ID
    if (isEdit.value && !formData.productId && selectedSku.value.id) {
      formData.productId = selectedSku.value.id
    }
    
    const response = await merchantProductApi.save(formData)
    if (response && response.code === 200) {
      ElMessage.success(isEdit.value ? '更新成功' : '新增成功')
      dialogVisible.value = false
      loadMerchantProductList()
    } else {
      ElMessage.error(isEdit.value ? '更新失败: ' + (response?.message || '未知错误') : '新增失败: ' + (response?.message || '未知错误'))
    }
  } catch (error) {
    ElMessage.error(isEdit.value ? '更新失败: ' + (error.message || '未知错误') : '新增失败: ' + (error.message || '未知错误'))
  } finally {
    saving.value = false
  }
}

// 添加图片处理方法
const getFirstImage = (subImages) => {
  if (!subImages) return ''
  try {
    const images = JSON.parse(subImages)
    return images && images.length > 0 ? images[0] : ''
  } catch (e) {
    console.error('解析图片列表失败:', e)
    return ''
  }
}

const getImageList = (subImages) => {
  if (!subImages) return []
  try {
    const images = JSON.parse(subImages)
    return images || []
  } catch (e) {
    console.error('解析图片列表失败:', e)
    return []
  }
}

// 初始化加载
onMounted(() => {
  loadMerchantProductList()
})
</script>

<style scoped>
.product-image {
  width: 60px;
  height: 60px;
  border-radius: 4px;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
}
</style>