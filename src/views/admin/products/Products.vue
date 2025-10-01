<template>
  <el-page-header class="page-header" title="产品管理">
    <template #content>
      管理产品信息
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
          新增产品
        </el-button>
      </el-col>
    </el-row>
  </el-card>

  <el-card class="table-card">
    <el-table
      :data="productList"
      :loading="loading"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" min-width="50" />
      <el-table-column prop="mainImage" label="主图" width="80">
        <template #default="{ row }">
          <el-image 
            :src="row.mainImage" 
            class="product-image" 
            :preview-src-list="[row.mainImage]"
            preview-teleported
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column prop="productName" label="产品名称" min-width="150" />
      <el-table-column prop="productCode" label="产品编码" min-width="120" />
      <el-table-column prop="brand" label="品牌" min-width="100" />
      <el-table-column label="分类" min-width="120">
        <template #default="{ row }">
          <span v-if="getCategoryById(row.categoryId)">
            {{ getCategoryById(row.categoryId).categoryName }}
          </span>
          <span v-else>N/A</span>
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

  <!-- 产品表单对话框 -->
  <el-dialog
    :title="dialogTitle"
    v-model="dialogVisible"
    width="800px"
    :close-on-click-modal="false"
  >
    <el-form
      ref="productFormRef"
      :model="productForm"
      :rules="productRules"
      label-width="100px"
    >
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="产品名称" prop="productName">
            <el-input v-model="productForm.productName" placeholder="请输入产品名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品编码" prop="productCode">
            <el-input 
              v-model="productForm.productCode" 
              placeholder="请输入产品编码"
              :disabled="isEdit"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="品牌" prop="brand">
            <el-input v-model="productForm.brand" placeholder="请输入品牌" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分类" prop="categoryId">
            <el-cascader
              v-model="productForm.categoryId"
              :options="categoryTree"
              :props="{ value: 'id', label: 'categoryName', children: 'children', emitPath: false }"
              placeholder="请选择分类"
              style="width: 100%"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="产品类型" prop="productType">
            <el-select v-model="productForm.productType" placeholder="请选择产品类型">
              <el-option label="实物商品" :value="1" />
              <el-option label="虚拟商品" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主图" prop="mainImage">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="productForm.mainImage" :src="productForm.mainImage" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="productForm.status">
              <el-radio :label="1">上架</el-radio>
              <el-radio :label="0">下架</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="产品描述" prop="description">
        <el-input 
          v-model="productForm.description" 
          type="textarea"
          placeholder="请输入产品描述"
          :rows="3"
        />
      </el-form-item>

      <el-form-item label="产品详情" prop="detail">
        <div class="editor-container" v-if="isEdit">
          <Toolbar
            class="editor-toolbar"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            class="editor-content"
            v-model="productForm.detail"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleEditorCreated"
            @onChange="handleEditorChange"
          />
        </div>
        <div class="product-detail-view" v-else v-html="productForm.detail"></div>
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
import { ref, reactive, computed, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import productApi from '@/api/product.js'
import productCategoryApi from '@/api/productCategory.js'
import fileApi from '@/api/file.js'
import { Plus, Search, Refresh, View, Edit, Delete } from '@element-plus/icons-vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 响应式数据
const loading = ref(false)
const saving = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const productFormRef = ref()

// 产品列表数据
const productList = ref([])
const categoryTree = ref([])
const categoryMap = ref(new Map())

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

// 产品表单
const productForm = reactive({
  id: null,
  productName: '',
  productCode: '',
  brand: '',
  categoryId: null,
  mainImage: '',
  description: '',
  detail: '',
  status: 1,
  productType: 1
})

// 上传URL
const uploadUrl = import.meta.env.VITE_API_BASE_URL + '/api/upload/image'

// API基础URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:18091'

// 编辑器模式
const mode = 'default'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 工具栏配置
const toolbarConfig = {}

// 富文本编辑器配置
const editorConfig = reactive({
  placeholder: '请输入产品详情...',
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
            // 处理图片URL，将相对路径转换为绝对路径
            const imageUrl = response.data.startsWith('/') ? API_BASE_URL + response.data : response.data;
            // 插入图片到编辑器
            insertFn(imageUrl, '', '')
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

// 表单验证规则
const productRules = {
  productName: [
    { required: true, message: '请输入产品名称', trigger: 'blur' },
    { min: 2, max: 100, message: '产品名称长度在 2 到 100 个字符', trigger: 'blur' }
  ],
  productCode: [
    { required: true, message: '请输入产品编码', trigger: 'blur' },
    { min: 2, max: 50, message: '产品编码长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  brand: [
    { max: 50, message: '品牌长度不能超过 50 个字符', trigger: 'blur' }
  ],
  categoryId: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ],
  productType: [
    { required: true, message: '请选择产品类型', trigger: 'change' }
  ]
}

// 计算属性
const dialogTitle = computed(() => isEdit.value ? '编辑产品' : '新增产品')

// 编辑器创建回调
const handleEditorCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

// 编辑器内容变化处理
const handleEditorChange = (editor) => {
  productForm.detail = editor.getHtml()
}

/**
 * 加载产品列表
 */
const loadProductList = async () => {
  loading.value = true
  try {
    const params = {
      current: pagination.page,
      size: pagination.size,
      productName: searchForm.productName || undefined,
      productCode: searchForm.productCode || undefined,
      status: searchForm.status !== '' ? searchForm.status : undefined
    }

    const response = await productApi.page(params)
    if (response) {
      const records = response.data.records || []
      // 处理图片URL，将相对路径转换为绝对路径
      const processedRecords = records.map(record => {
        if (record.mainImage && record.mainImage.startsWith('/')) {
          record.mainImage = API_BASE_URL + record.mainImage
        }
        // 同样处理产品详情中的图片URL
        if (record.detail) {
          // 使用正则表达式替换详情中的相对图片路径
          record.detail = record.detail.replace(/src="(\/images\/uploads\/[^"]+)"/g, (match, p1) => {
            return `src="${API_BASE_URL}${p1}"`;
          });
        }
        return record
      })
      productList.value = processedRecords
      pagination.total = response.total != null ? response.total : (response.count || 0)
      pagination.page = response.current || pagination.page
      pagination.size = response.size || pagination.size
    }
  } catch (error) {
    console.error('加载产品列表失败:', error)
    ElMessage.error('加载产品列表失败')
  } finally {
    loading.value = false
  }
}

/**
 * 加载分类树
 */
const loadCategoryTree = async () => {
  try {
    const response = await productCategoryApi.getTree()
    if (response && response.code === 200) {
      categoryTree.value = response.data || []
      
      // 构建分类映射表，便于通过ID查找分类
      const buildMap = (categories) => {
        categories.forEach(category => {
          categoryMap.value.set(category.id, category)
          if (category.children && category.children.length > 0) {
            buildMap(category.children)
          }
        })
      }
      buildMap(categoryTree.value)
    } else {
      ElMessage.error('获取分类树失败')
    }
  } catch (error) {
    console.error('加载分类树失败:', error)
    ElMessage.error('加载分类树失败: ' + (error.message || '未知错误'))
  }
}

/**
 * 根据分类ID获取分类信息
 */
const getCategoryById = (categoryId) => {
  if (!categoryId) return null
  return categoryMap.value.get(categoryId)
}

/**
 * 搜索
 */
const handleSearch = () => {
  pagination.page = 1
  loadProductList()
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
  loadProductList()
  ElMessage.info('搜索条件已重置')
}

/**
 * 分页大小改变
 */
const handleSizeChange = (newSize) => {
  pagination.size = newSize
  pagination.page = 1
  loadProductList()
  ElMessage.info(`页面大小已更改为 ${newSize} 条/页`)
}

/**
 * 当前页改变
 */
const handleCurrentChange = (newPage) => {
  pagination.page = newPage
  loadProductList()
  ElMessage.info(`正在加载第 ${newPage} 页`)
}

/**
 * 新增产品
 */
const handleAdd = () => {
  isEdit.value = false
  resetProductForm()
  dialogVisible.value = true
}

/**
 * 查看产品
 */
const handleView = async (product) => {
  isEdit.value = false // 查看模式
  
  try {
    // 调用详情接口获取完整的产品信息，包括富文本内容
    const response = await productApi.getDetail(product.id)
    if (response && response.code === 200) {
      const detailData = response.data
      // 处理图片URL
      if (detailData.mainImage && detailData.mainImage.startsWith('/')) {
        detailData.mainImage = API_BASE_URL + detailData.mainImage
      }
      
      // 处理详情中的图片URL
      if (detailData.detail) {
        // 使用正则表达式替换详情中的相对图片路径
        detailData.detail = detailData.detail.replace(/src="(\/images\/uploads\/[^"]+)"/g, (match, p1) => {
          return `src="${API_BASE_URL}${p1}"`;
        });
      }
      
      Object.assign(productForm, {
        id: detailData.id,
        productName: detailData.productName,
        productCode: detailData.productCode,
        brand: detailData.brand,
        categoryId: detailData.categoryId,
        mainImage: detailData.mainImage,
        description: detailData.description,
        detail: detailData.detail,
        status: detailData.status,
        productType: detailData.productType
      })
    } else {
      ElMessage.error('获取产品详情失败')
      return
    }
  } catch (error) {
    console.error('获取产品详情失败:', error)
    ElMessage.error('获取产品详情失败: ' + (error.message || '未知错误'))
    return
  }
  
  dialogVisible.value = true
}

/**
 * 编辑产品
 */
const handleEdit = (product) => {
  isEdit.value = true // 编辑模式
  Object.assign(productForm, {
    id: product.id,
    productName: product.productName,
    productCode: product.productCode,
    brand: product.brand,
    categoryId: product.categoryId,
    mainImage: product.mainImage,
    description: product.description,
    detail: product.detail,
    status: product.status,
    productType: product.productType
  })
  dialogVisible.value = true
}

/**
 * 删除产品
 */
const handleDelete = async (product) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除产品 "${product.productName}" 吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    const response = await productApi.remove(product.id)
    if (response !== undefined) {
      ElMessage.success('删除成功')
      loadProductList()
    } else {
      ElMessage.error('删除失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除产品失败:', error)
      ElMessage.error('删除失败')
    }
  }
}

/**
 * 保存产品
 */
const handleSave = async () => {
  // 查看模式下不保存
  if (!isEdit.value) {
    dialogVisible.value = false
    return
  }

  if (!productFormRef.value) return

  try {
    await productFormRef.value.validate()

    saving.value = true

    const productData = {
      id: productForm.id,
      productName: productForm.productName,
      productCode: productForm.productCode,
      brand: productForm.brand,
      categoryId: productForm.categoryId,
      mainImage: productForm.mainImage,
      description: productForm.description,
      detail: productForm.detail,
      status: productForm.status,
      productType: productForm.productType
    }

    const response = await productApi.save(productData)

    if (response !== undefined) {
      ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
      dialogVisible.value = false
      loadProductList()
    } else {
      ElMessage.error('保存失败')
    }
  } catch (error) {
    console.error('保存产品失败:', error)
    ElMessage.error('保存失败')
  } finally {
    saving.value = false
  }
}

/**
 * 重置产品表单
 */
const resetProductForm = () => {
  Object.assign(productForm, {
    id: null,
    productName: '',
    productCode: '',
    brand: '',
    categoryId: null,
    mainImage: '',
    description: '',
    detail: '',
    status: 1,
    productType: 1
  })

  if (productFormRef.value) {
    productFormRef.value.resetFields()
  }
  
  // 重置编辑器内容
  if (editorRef.value) {
    editorRef.value.clear()
  }
}

// 组件销毁前清理编辑器
onBeforeUnmount(() => {
  if (editorRef.value) {
    editorRef.value.destroy()
    editorRef.value = null
  }
})

/**
 * 处理图片上传成功
 */
const handleAvatarSuccess = (response, uploadFile) => {
  if (response && response.code === 200) {
    productForm.mainImage = response.data
    ElMessage.success('图片上传成功')
  } else {
    ElMessage.error('图片上传失败')
  }
}

/**
 * 上传前检查
 */
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('头像图片必须是 JPG 或 PNG 格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像图片大小不能超过 2MB!')
    return false
  }
  return true
}

// 生命周期
onMounted(() => {
  loadProductList()
  loadCategoryTree()
})
</script>

<style scoped>
.product-image {
  width: 50px;
  height: 50px;
  border-radius: 4px;
}

.avatar-uploader .avatar {
  width: 120px;
  height: 120px;
  display: block;
}

</style>