<template>
  <el-page-header class="page-header" title="个人中心">
    <template #content>
      我的订单
    </template>
  </el-page-header>
  <div class="orders-page">
    <el-card class="orders-card">

      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="10" animated />
      </div>

      <div v-else>
        <el-table :data="orders" v-loading="tableLoading">
          <el-table-column prop="orderNo" label="订单编号" width="220" />
          <el-table-column prop="createTime" label="下单时间" width="180">
            <template #default="scope">
              {{ formatDate(scope.row.createTime) }}
            </template>
          </el-table-column>
          <el-table-column prop="totalAmount" label="订单总额" width="120">
            <template #default="scope">
              ¥{{ scope.row.totalAmount }}
            </template>
          </el-table-column>
          <el-table-column prop="payAmount" label="实际支付" width="120">
            <template #default="scope">
              ¥{{ scope.row.payAmount }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="订单状态" width="120">
            <template #default="scope">
              <el-tag :type="getOrderStatusType(scope.row.status)">
                {{ getOrderStatusText(scope.row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template #default="scope">
              <el-button size="small" @click="viewOrder(scope.row)">查看</el-button>
              <el-button 
                size="small" 
                type="primary" 
                v-if="scope.row.status === 1"
                @click="goToPayment(scope.row)"
              >
                去支付
              </el-button>
              <el-button 
                size="small" 
                type="danger" 
                v-if="scope.row.status === 1 || scope.row.status === 2"
                @click="cancelOrder(scope.row)"
              >
                取消
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination
            v-model:current-page="pagination.current"
            v-model:page-size="pagination.size"
            :page-sizes="[10, 20, 50]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAuthStore } from '@/config/store.js'
import orderApi from '@/api/order'

// Store
const authStore = useAuthStore()

// 响应式数据
const loading = ref(true)
const tableLoading = ref(false)
const orders = ref([])

const pagination = ref({
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
      current: pagination.value.current,
      size: pagination.value.size
    }
    
    const response = await orderApi.page(params)
    
    if (response.code === 200 && response.data) {
      orders.value = response.data.records || []
      pagination.value.total = response.data.total || 0
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

// 分页处理
const handleSizeChange = (val) => {
  pagination.value.size = val
  fetchOrders()
}

const handleCurrentChange = (val) => {
  pagination.value.current = val
  fetchOrders()
}

// 生命周期
onMounted(() => {
  fetchOrders()
})
</script>

<style scoped>
</style>