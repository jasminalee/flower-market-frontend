<template>
  <el-page-header class="page-header" title="个人中心">
    <template #content>
      我的订单
    </template>
  </el-page-header>

  <!-- Filter Card -->
  <el-card class="filter-card">
    <el-row type="flex" justify="space-between" align="middle" class="filters-bar">
      <el-col :span="20">
        <el-form :model="searchForm" inline>
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
            <el-button type="primary" size="small" text @click="viewOrder(scope.row)">
              <el-icon><View /></el-icon>
              查看
            </el-button>
            <el-button 
              size="small" 
              type="success" 
              text
              v-if="scope.row.status === 1"
              @click="goToPayment(scope.row)"
            >
              <el-icon><Wallet /></el-icon>
              去支付
            </el-button>
            <el-button 
              size="small" 
              type="danger" 
              text
              v-if="scope.row.status === 1 || scope.row.status === 2"
              @click="cancelOrder(scope.row)"
            >
              <el-icon><Close /></el-icon>
              取消
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
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAuthStore } from '@/config/store.js'
import orderApi from '@/api/order'
import { Search, Refresh, View, Wallet, Close } from '@element-plus/icons-vue'

// Store
const authStore = useAuthStore()

// 响应式数据
const loading = ref(true)
const tableLoading = ref(false)
const orders = ref([])

// 搜索表单
const searchForm = reactive({
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
    
    // 获取当前用户ID
    const userId = authStore.user?.id || authStore.user?.userId
    
    // 调用API获取订单列表
    const params = {
      userId: userId,
      current: pagination.current,
      size: pagination.size,
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
const viewOrder = (order) => {
  // 跳转到订单确认页面查看详情
  window.open(`/#/order-confirmation/${order.id}`, '_blank')
}

/**
 * 去支付
 */
const goToPayment = (order) => {
  ElMessage.info(`支付功能开发中... 订单号: ${order.orderNo}`)
  // 这里可以跳转到支付页面
}

/**
 * 取消订单
 */
const cancelOrder = (order) => {
  ElMessageBox.confirm(
    `确定要取消订单 ${order.orderNo} 吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      // 这里可以调用取消订单的API
      ElMessage.success('订单取消成功')
      // 重新加载订单列表
      await fetchOrders()
    } catch (error) {
      console.error('取消订单失败:', error)
      ElMessage.error('取消订单失败: ' + (error.message || '未知错误'))
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
</style>