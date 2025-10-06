<template>
  <el-page-header class="page-header" title="个人中心">
    <template #content>
      支付方式
    </template>
  </el-page-header>

  <el-card class="filter-card">
    <!-- 搜索表单 -->
    <el-row type="flex" justify="space-between" align="middle" class="filters-bar">
      <el-col :span="20">
        <el-form :model="searchForm" inline>
          <el-form-item label="支付方式">
            <el-input 
              v-model="searchForm.methodName" 
              placeholder="请输入支付方式名称" 
              clearable
              @keyup.enter="searchPaymentMethods"
            />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchPaymentMethods">
              <el-icon><Search /></el-icon>
              搜索
            </el-button>
            <el-button @click="resetSearch">
              <el-icon><Refresh /></el-icon>
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      
      <el-col :span="4" style="text-align: right;">
        <el-button type="primary" @click="showAddForm">
          <el-icon><Plus /></el-icon>
          新增支付方式
        </el-button>
      </el-col>
    </el-row>
  </el-card>

  <el-card class="table-card">
    <!-- 支付方式列表 -->
    <el-table 
      :data="paymentMethods" 
      :loading="loading" 
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" min-width="50" />
      <el-table-column prop="methodName" label="支付方式名称" min-width="150" />
      <el-table-column prop="methodCode" label="支付方式编码" min-width="150" />
      <el-table-column prop="accountName" label="账户名称" min-width="150" />
      <el-table-column prop="accountNumber" label="账户号码/卡号" min-width="200" />
      <el-table-column prop="bankName" label="银行名称" min-width="150" />
      <el-table-column prop="status" label="状态" min-width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
            {{ scope.row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" min-width="80" />
      <el-table-column label="操作" width="250" fixed="right">
        <template #default="scope">
          <el-button type="primary" size="small" text @click="editPaymentMethod(scope.row)">
            <el-icon><Edit /></el-icon>
            编辑
          </el-button>
          <el-button 
            size="small" 
            :type="scope.row.status === 1 ? 'warning' : 'success'"
            text
            @click="toggleStatus(scope.row)"
          >
            <el-icon><View v-if="scope.row.status === 0" /><Hide v-else /></el-icon>
            {{ scope.row.status === 1 ? '禁用' : '启用' }}
          </el-button>
          <el-button size="small" type="danger" text @click="deletePaymentMethod(scope.row)">
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="pagination.current"
        v-model:page-size="pagination.size"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>

  <!-- 新增/编辑支付方式对话框 -->
  <el-dialog 
    :title="dialogTitle" 
    v-model="dialogVisible" 
    width="600px"
    :close-on-click-modal="false"
  >
    <el-form 
      :model="paymentMethodForm" 
      :rules="formRules" 
      ref="paymentMethodFormRef" 
      label-width="120px"
      class="form-card"
    >
      <el-form-item label="支付方式名称" prop="methodName">
        <el-input v-model="paymentMethodForm.methodName" placeholder="请输入支付方式名称" />
      </el-form-item>
      <el-form-item label="支付方式编码" prop="methodCode">
        <el-input v-model="paymentMethodForm.methodCode" placeholder="请输入支付方式编码" />
      </el-form-item>
      <el-form-item label="账户名称" prop="accountName">
        <el-input v-model="paymentMethodForm.accountName" placeholder="请输入账户名称" />
      </el-form-item>
      <el-form-item label="账户号码/卡号" prop="accountNumber">
        <el-input v-model="paymentMethodForm.accountNumber" placeholder="请输入账户号码/卡号" />
      </el-form-item>
      <el-form-item label="银行名称" prop="bankName">
        <el-input v-model="paymentMethodForm.bankName" placeholder="请输入银行名称" />
      </el-form-item>
      <el-form-item label="开户行" prop="bankBranch">
        <el-input v-model="paymentMethodForm.bankBranch" placeholder="请输入开户行" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="paymentMethodForm.sort" :min="0" :max="999" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="paymentMethodForm.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input 
          v-model="paymentMethodForm.description" 
          type="textarea" 
          :rows="3" 
          placeholder="请输入支付方式描述" 
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="savePaymentMethod" :loading="saveLoading">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus, Edit, Delete, View, Hide } from '@element-plus/icons-vue'
import paymentMethodApi from '@/api/paymentMethod'
import { useAuthStore } from '@/config/store.js'

// Store
const authStore = useAuthStore()

// 响应式数据
const loading = ref(false)
const saveLoading = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)

const paymentMethods = ref([])
const paymentMethodForm = ref({
  id: null,
  methodName: '',
  methodCode: '',
  accountName: '',
  accountNumber: '',
  bankName: '',
  bankBranch: '',
  sort: 0,
  status: 1,
  description: ''
})

const searchForm = reactive({
  methodName: '',
  status: null
})

const pagination = reactive({
  current: 1,
  size: 10,
  total: 0
})

const formRules = {
  methodName: [
    { required: true, message: '请输入支付方式名称', trigger: 'blur' }
  ],
  methodCode: [
    { required: true, message: '请输入支付方式编码', trigger: 'blur' }
  ],
  accountName: [
    { required: true, message: '请输入账户名称', trigger: 'blur' }
  ],
  accountNumber: [
    { required: true, message: '请输入账户号码/卡号', trigger: 'blur' }
  ]
}

// 计算属性
const dialogTitle = computed(() => {
  return isEdit.value ? '编辑支付方式' : '新增支付方式'
})

// 方法
/**
 * 获取当前用户ID
 */
const getCurrentUserId = () => {
  return authStore.user?.id || authStore.user?.userId || 0
}

/**
 * 获取支付方式列表
 */
const fetchPaymentMethods = async () => {
  try {
    loading.value = true
    
    // 构造查询参数，只有当用户输入了内容时才传递相应参数
    const params = {
      userId: getCurrentUserId(),
      current: pagination.current,
      size: pagination.size
    }
    
    // 只有当 methodName 有值时才添加到参数中
    if (searchForm.methodName && searchForm.methodName.trim() !== '') {
      params.methodName = searchForm.methodName.trim()
    }
    
    // 只有当 status 有值时才添加到参数中
    if (searchForm.status !== null && searchForm.status !== undefined) {
      params.status = searchForm.status
    }
    
    const response = await paymentMethodApi.page(params)
    
    if (response.code === 200 && response.data) {
      paymentMethods.value = response.data.records || []
      pagination.total = response.data.total || 0
    } else {
      ElMessage.error(response.message || '获取支付方式列表失败')
    }
  } catch (error) {
    console.error('获取支付方式列表失败:', error)
    ElMessage.error('获取支付方式列表失败: ' + (error.message || '未知错误'))
  } finally {
    loading.value = false
  }
}

/**
 * 搜索支付方式
 */
const searchPaymentMethods = () => {
  pagination.current = 1
  fetchPaymentMethods()
}

/**
 * 重置搜索
 */
const resetSearch = () => {
  searchForm.methodName = ''
  searchForm.status = null
  pagination.current = 1
  fetchPaymentMethods()
}

/**
 * 显示新增表单
 */
const showAddForm = () => {
  isEdit.value = false
  paymentMethodForm.value = {
    id: null,
    methodName: '',
    methodCode: '',
    accountName: '',
    accountNumber: '',
    bankName: '',
    bankBranch: '',
    sort: 0,
    status: 1,
    description: ''
  }
  dialogVisible.value = true
}

/**
 * 编辑支付方式
 */
const editPaymentMethod = (row) => {
  isEdit.value = true
  paymentMethodForm.value = { ...row }
  dialogVisible.value = true
}

/**
 * 保存支付方式
 */
const savePaymentMethod = async () => {
  try {
    saveLoading.value = true
    
    // 添加用户ID
    const formData = {
      ...paymentMethodForm.value,
      userId: getCurrentUserId()
    }
    
    let response
    if (isEdit.value) {
      response = await paymentMethodApi.update(formData)
    } else {
      response = await paymentMethodApi.save(formData)
    }
    
    if (response.code === 200) {
      ElMessage.success(`${isEdit.value ? '更新' : '新增'}支付方式成功`)
      dialogVisible.value = false
      fetchPaymentMethods()
    } else {
      ElMessage.error(response.message || `${isEdit.value ? '更新' : '新增'}支付方式失败`)
    }
  } catch (error) {
    console.error(`${isEdit.value ? '更新' : '新增'}支付方式失败:`, error)
    ElMessage.error(`${isEdit.value ? '更新' : '新增'}支付方式失败: ` + (error.message || '未知错误'))
  } finally {
    saveLoading.value = false
  }
}

/**
 * 切换支付方式状态
 */
const toggleStatus = (row) => {
  ElMessageBox.confirm(
    `确定要${row.status === 1 ? '禁用' : '启用'}支付方式 "${row.methodName}" 吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      const formData = {
        ...row,
        status: row.status === 1 ? 0 : 1
      }
      
      const response = await paymentMethodApi.update(formData)
      
      if (response.code === 200) {
        ElMessage.success('更新状态成功')
        fetchPaymentMethods()
      } else {
        ElMessage.error(response.message || '更新状态失败')
      }
    } catch (error) {
      console.error('更新状态失败:', error)
      ElMessage.error('更新状态失败: ' + (error.message || '未知错误'))
    }
  }).catch(() => {
    // 用户取消操作
  })
}

/**
 * 删除支付方式
 */
const deletePaymentMethod = (row) => {
  ElMessageBox.confirm(
    `确定要删除支付方式 "${row.methodName}" 吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      const response = await paymentMethodApi.remove(row.id)
      
      if (response.code === 200) {
        ElMessage.success('删除支付方式成功')
        fetchPaymentMethods()
      } else {
        ElMessage.error(response.message || '删除支付方式失败')
      }
    } catch (error) {
      console.error('删除支付方式失败:', error)
      ElMessage.error('删除支付方式失败: ' + (error.message || '未知错误'))
    }
  }).catch(() => {
    // 用户取消操作
  })
}

// 分页处理
const handleSizeChange = (val) => {
  pagination.size = val
  pagination.current = 1
  fetchPaymentMethods()
}

const handleCurrentChange = (val) => {
  pagination.current = val
  fetchPaymentMethods()
}

// 生命周期
onMounted(() => {
  fetchPaymentMethods()
})
</script>

<style src="@/assets/paymentMethods.css"></style>