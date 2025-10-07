<template>
  <el-page-header class="page-header" title="商户管理">
    <template #content>
      订单管理
    </template>
  </el-page-header>

  <!-- Filter Card -->
  <el-card class="filter-card">
    <el-row type="flex" justify="space-between" align="middle" class="filters-bar">
      <el-col :span="20">
        <el-form :model="searchForm" inline>
          <el-form-item label="订单编号">
            <el-input
              v-model="searchForm.orderNo"
              placeholder="搜索订单编号"
              clearable
              @keyup.enter="handleSearch"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="订单状态">
            <el-select v-model="searchForm.status" placeholder="选择订单状态" clearable>
              <el-option label="待付款" :value="1" />
              <el-option label="已付款" :value="2" />
              <el-option label="已发货" :value="3" />
              <el-option label="已完成" :value="4" />
              <el-option label="已取消" :value="5" />
              <el-option label="退款中" :value="6" />
              <el-option label="已退款" :value="7" />
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

  <!-- Table Card -->
  <el-card class="table-card">
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="10" animated />
    </div>

    <div v-else>
      <el-table 
        :data="orders" 
        :loading="tableLoading"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="id" label="订单ID" min-width="50" />
        <el-table-column prop="orderNo" label="订单编号" min-width="200" />
        <el-table-column prop="createTime" label="下单时间" min-width="180">
          <template #default="scope">
            {{ formatDate(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="totalAmount" label="订单总额" min-width="120">
          <template #default="scope">
            ¥{{ scope.row.totalAmount }}
          </template>
        </el-table-column>
        <el-table-column prop="payAmount" label="实际支付" min-width="120">
          <template #default="scope">
            ¥{{ scope.row.payAmount }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态" min-width="120">
          <template #default="scope">
            <el-tag :type="getOrderStatusType(scope.row.status)">
              {{ getOrderStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template #default="scope">
            <el-button type="primary" size="small" text @click="viewOrderDetail(scope.row)">
              <el-icon><View /></el-icon>
              查看
            </el-button>
            <el-button 
              size="small" 
              type="success" 
              text
              v-if="scope.row.status === 2"
              @click="markAsShipped(scope.row)"
            >
              <el-icon><Promotion /></el-icon>
              发货
            </el-button>
            <el-button 
              size="small" 
              type="warning" 
              text
              v-if="scope.row.status === 6"
              @click="processRefund(scope.row)"
            >
              <el-icon><Coin /></el-icon>
              处理退款
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination -->
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
    </div>
  </el-card>

  <!-- Order Detail Dialog -->
  <el-dialog
    title="订单详情"
    v-model="orderDetailDialogVisible"
    width="800px"
    :close-on-click-modal="false"
  >
    <div v-if="orderDetailLoading" class="loading-container">
      <el-skeleton :rows="10" animated />
    </div>
    
    <div v-else>
      <!-- Order Info -->
      <el-card class="mb-20">
        <template #header>
          <div class="card-header">
            <span>订单信息</span>
          </div>
        </template>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="info-item">
              <span class="label">订单编号：</span>
              <span>{{ orderDetail.order.orderNo }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <span class="label">下单时间：</span>
              <span>{{ formatDate(orderDetail.order.createTime) }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <span class="label">订单状态：</span>
              <el-tag :type="getOrderStatusType(orderDetail.order.status)">
                {{ getOrderStatusText(orderDetail.order.status) }}
              </el-tag>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <span class="label">订单总额：</span>
              <span>¥{{ orderDetail.order.totalAmount }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <span class="label">实际支付：</span>
              <span>¥{{ orderDetail.order.payAmount }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <span class="label">收货人：</span>
              <span>{{ orderDetail.order.receiverName }}</span>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="info-item">
              <span class="label">收货地址：</span>
              <span>{{ orderDetail.order.receiverAddress }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <span class="label">联系电话：</span>
              <span>{{ orderDetail.order.receiverPhone }}</span>
            </div>
          </el-col>
        </el-row>
      </el-card>
      
      <!-- Order Items -->
      <el-card class="mb-20">
        <template #header>
          <div class="card-header">
            <span>商品明细</span>
          </div>
        </template>
        
        <el-table :data="orderDetail.orderItems" stripe style="width: 100%">
          <el-table-column prop="productName" label="商品名称" min-width="150" />
          <el-table-column prop="skuName" label="规格" min-width="120" />
          <el-table-column prop="price" label="单价" min-width="100">
            <template #default="scope">
              ¥{{ scope.row.price }}
            </template>
          </el-table-column>
          <el-table-column prop="quantity" label="数量" min-width="80" />
          <el-table-column prop="totalPrice" label="小计" min-width="100">
            <template #default="scope">
              ¥{{ scope.row.totalPrice }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="orderDetailDialogVisible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAuthStore } from '@/config/store.js'
import orderApi from '@/api/order'
import { Search, Refresh, View, Promotion, Coin } from '@element-plus/icons-vue'
import '@/assets/orders.css'

// Store
const authStore = useAuthStore()

// 响应式数据
const loading = ref(true)
const tableLoading = ref(false)
const orders = ref([])

// Order detail related data
const orderDetailDialogVisible = ref(false)
const orderDetailLoading = ref(false)
const orderDetail = ref({
  order: {},
  orderItems: []
})

// 搜索表单
const searchForm = reactive({
  orderNo: '',
  status: ''
})

const pagination = reactive({
  current: 1,
  size: 10,
  total: 0
})

// 方法
const getOrderStatusType = (status) => {
  const statusMap = {
    1: 'info',    // 待付款
    2: 'warning', // 已付款
    3: 'primary', // 已发货
    4: 'success', // 已完成
    5: 'danger',  // 已取消
    6: 'warning', // 退款中
    7: 'danger'   // 已退款
  }
  return statusMap[status] || 'info'
}

const getOrderStatusText = (status) => {
  const statusMap = {
    1: '待付款',
    2: '已付款',
    3: '已发货',
    4: '已完成',
    5: '已取消',
    6: '退款中',
    7: '已退款'
  }
  return statusMap[status] || '未知状态'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN')
}

/**
 * 获取订单列表
 */
const fetchOrders = async () => {
  try {
    tableLoading.value = true
    
    // 获取当前商户ID
    const merchantId = authStore.user?.id || authStore.user?.userId
    
    // 调用API获取订单列表
    const params = {
      merchantId: merchantId,
      current: pagination.current,
      size: pagination.size,
      orderNo: searchForm.orderNo || undefined,
      status: searchForm.status || undefined
    }
    
    const response = await orderApi.page(params)
    
    if (response.code === 200 && response.data) {
      orders.value = response.data.records || []
      pagination.total = response.data.total || 0
    } else {
      ElMessage.error(response.message || '获取订单列表失败')
    }
  } catch (error) {
    console.error('获取订单列表失败:', error)
    ElMessage.error('获取订单列表失败')
  } finally {
    loading.value = false
    tableLoading.value = false
  }
}

/**
 * 查看订单详情
 */
const viewOrderDetail = async (order) => {
  try {
    orderDetailLoading.value = true
    orderDetailDialogVisible.value = true
    
    // 调用API获取订单详情
    const response = await orderApi.getDetailById(order.id)
    
    if (response.code === 200 && response.data) {
      orderDetail.value = response.data
    } else {
      ElMessage.error(response.message || '获取订单详情失败')
    }
  } catch (error) {
    console.error('获取订单详情失败:', error)
    ElMessage.error('获取订单详情失败')
  } finally {
    orderDetailLoading.value = false
  }
}

/**
 * 标记为已发货
 */
const markAsShipped = (order) => {
  ElMessageBox.confirm(
    `确定要将订单 ${order.orderNo} 标记为已发货吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      // 更新订单状态为已发货 (状态码3)
      const orderData = {
        ...order,
        status: 3, // 已发货
        deliveryTime: new Date().toISOString() // 设置发货时间
      }
      
      const response = await orderApi.save(orderData)
      
      if (response.code === 200) {
        ElMessage.success('订单已标记为已发货')
        // 重新加载订单列表
        await fetchOrders()
      } else {
        ElMessage.error(response.message || '操作失败')
      }
    } catch (error) {
      console.error('操作失败:', error)
      ElMessage.error('操作失败: ' + (error.message || '未知错误'))
    }
  }).catch(() => {
    // 用户取消操作
  })
}

/**
 * 处理退款
 */
const processRefund = (order) => {
  ElMessageBox.confirm(
    `确定要处理订单 ${order.orderNo} 的退款申请吗？`,
    '处理退款',
    {
      confirmButtonText: '确定退款',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      // 更新订单状态为已退款 (状态码7)
      const orderData = {
        ...order,
        status: 7 // 已退款
      }
      
      const response = await orderApi.save(orderData)
      
      if (response.code === 200) {
        ElMessage.success('退款处理成功')
        orderDetailDialogVisible.value = false
        // 重新加载订单列表
        await fetchOrders()
      } else {
        ElMessage.error(response.message || '退款处理失败')
      }
    } catch (error) {
      console.error('退款处理失败:', error)
      ElMessage.error('退款处理失败: ' + (error.message || '未知错误'))
    }
  }).catch(() => {
    // 用户取消操作
  })
}

/**
 * 搜索
 */
const handleSearch = () => {
  pagination.current = 1
  fetchOrders()
  ElMessage.success('搜索成功')
}

/**
 * 重置搜索
 */
const handleReset = () => {
  searchForm.orderNo = ''
  searchForm.status = ''
  pagination.current = 1
  fetchOrders()
  ElMessage.info('搜索条件已重置')
}

// 分页处理
const handleSizeChange = (val) => {
  pagination.size = val
  pagination.current = 1
  fetchOrders()
}

const handleCurrentChange = (val) => {
  pagination.current = val
  fetchOrders()
}

// 生命周期
onMounted(() => {
  fetchOrders()
})
</script>

<style scoped>
/* 可以添加一些自定义样式 */
.mb-20 {
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 10px;
}

.info-item .label {
  font-weight: bold;
  margin-right: 10px;
}

.card-header {
  font-weight: bold;
}
</style>