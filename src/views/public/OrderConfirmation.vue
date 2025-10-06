<template>
  <div class="order-confirmation-page">
    <!-- 面包屑导航 -->
    <div class="public-breadcrumb-banner">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          <el-icon><HomeFilled /></el-icon>
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/products' }">
          <el-icon><Goods /></el-icon>
          产品展示
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-icon><Document /></el-icon>
          订单确认
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-card class="confirmation-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon size="20" color="#67C23A"><SuccessFilled /></el-icon>
            <span>订单提交成功</span>
          </div>
        </template>

        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="8" animated />
        </div>

        <div v-else-if="order.id" class="order-details">
          <div class="success-message">
            <el-icon size="60" color="#67C23A"><SuccessFilled /></el-icon>
            <h2>订单创建成功！</h2>
            <p>您的订单编号是：{{ order.orderNo }}</p>
          </div>

          <el-row :gutter="20" class="mt-30">
            <el-col :span="24">
              <div class="order-summary">
                <h3>订单信息</h3>
                <el-descriptions :column="1" border>
                  <el-descriptions-item label="订单编号">{{ order.orderNo }}</el-descriptions-item>
                  <el-descriptions-item label="订单状态">
                    <el-tag :type="getOrderStatusType(order.status)">
                      {{ getOrderStatusText(order.status) }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="创建时间">{{ formatDate(order.createTime) }}</el-descriptions-item>
                  <el-descriptions-item label="订单总额">¥{{ order.totalAmount }}</el-descriptions-item>
                  <el-descriptions-item label="实际支付">¥{{ order.payAmount }}</el-descriptions-item>
                </el-descriptions>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="mt-30">
            <el-col :span="24">
              <div class="action-buttons">
                <el-button type="primary" @click="goToPayment">去支付</el-button>
                <el-button @click="viewOrderList">查看订单列表</el-button>
                <el-button @click="continueShopping">继续购物</el-button>
              </div>
            </el-col>
          </el-row>
        </div>

        <div v-else class="no-data">
          <el-empty description="订单信息不存在">
            <el-button type="primary" @click="continueShopping">继续购物</el-button>
          </el-empty>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { 
  HomeFilled, Goods, Document, SuccessFilled
} from '@element-plus/icons-vue'
import orderApi from '@/api/order'

// 路由相关
const route = useRoute()
const router = useRouter()

// 响应式数据
const order = ref({})
const loading = ref(true)

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
 * 获取订单详情
 */
const fetchOrderDetail = async () => {
  try {
    loading.value = true
    const orderId = route.params.id
    
    if (!orderId) {
      ElMessage.error('订单ID不能为空')
      router.push('/products')
      return
    }
    
    // 调用API获取订单详情
    const response = await orderApi.getById(orderId)
    
    if (response.code === 200 && response.data) {
      order.value = response.data
    } else {
      ElMessage.error(response.message || '获取订单详情失败')
    }
  } catch (error) {
    console.error('获取订单详情失败:', error)
    ElMessage.error('获取订单详情失败')
  } finally {
    loading.value = false
  }
}

// 按钮操作
const goToPayment = () => {
  ElMessage.info('支付功能开发中...')
  // 这里可以跳转到支付页面
}

const viewOrderList = () => {
  router.push('/admin/personal/orders')
}

const continueShopping = () => {
  router.push('/products')
}

// 生命周期
onMounted(() => {
  fetchOrderDetail()
})
</script>

<style scoped>
.order-confirmation-page {
  padding: 20px 0;
}

.confirmation-card {
  max-width: 600px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 500;
}

.success-message {
  text-align: center;
  padding: 30px 0;
}

.success-message h2 {
  margin: 20px 0 10px 0;
  color: #67C23A;
}

.success-message p {
  font-size: 16px;
  color: #606266;
}

.order-details {
  padding: 20px 0;
}

.order-summary h3 {
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.mt-30 {
  margin-top: 30px;
}
</style>