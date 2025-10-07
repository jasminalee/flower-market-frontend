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

        <div v-else-if="orderDetail.order && orderDetail.order.id" class="order-details">
          <div class="success-message">
            <el-icon size="60" color="#67C23A"><SuccessFilled /></el-icon>
            <h2>订单创建成功！</h2>
            <p>您的订单编号是：{{ orderDetail.order.orderNo }}</p>
          </div>

          <el-row :gutter="20" class="mt-30">
            <el-col :span="24">
              <div class="order-summary">
                <h3>订单信息</h3>
                <el-descriptions :column="1" border>
                  <el-descriptions-item label="订单编号">{{ orderDetail.order.orderNo }}</el-descriptions-item>
                  <el-descriptions-item label="订单状态">
                    <el-tag :type="getOrderStatusType(orderDetail.order.status)">
                      {{ getOrderStatusText(orderDetail.order.status) }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="创建时间">{{ formatDate(orderDetail.order.createTime) }}</el-descriptions-item>
                  <el-descriptions-item label="订单总额">¥{{ orderDetail.order.totalAmount }}</el-descriptions-item>
                  <el-descriptions-item label="实际支付">¥{{ orderDetail.order.payAmount }}</el-descriptions-item>
                </el-descriptions>
              </div>
            </el-col>
          </el-row>

          <!-- Shipping Information -->
          <el-row :gutter="20" class="mt-30">
            <el-col :span="24">
              <div class="shipping-information">
                <div class="section-header">
                  <h3>收货信息</h3>
                  <el-button type="primary" size="small" @click="showAddressDialog">
                    {{ selectedAddress ? '更换地址' : '选择地址' }}
                  </el-button>
                </div>
                <el-card>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="info-item">
                        <span class="label">收货人：</span>
                        <span>{{ orderDetail.order.receiverName }}</span>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="info-item">
                        <span class="label">联系电话：</span>
                        <span>{{ orderDetail.order.receiverPhone }}</span>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div class="info-item">
                        <span class="label">收货地址：</span>
                        <span>{{ orderDetail.order.receiverAddress }}</span>
                      </div>
                    </el-col>
                    <!-- 显示更多收货地址详情 -->
                    <el-col :span="24" v-if="selectedAddress">
                      <div class="info-item">
                        <span class="label">地址详情：</span>
                        <span>{{ selectedAddress.province }}{{ selectedAddress.city }}{{ selectedAddress.district }}{{ selectedAddress.detailAddress }}</span>
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
              </div>
            </el-col>
          </el-row>

          <!-- Order Items -->
          <el-row :gutter="20" class="mt-30">
            <el-col :span="24">
              <div class="order-items">
                <h3>商品明细</h3>
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
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="mt-30">
            <el-col :span="24">
              <div class="action-buttons">
                <!-- 只有在订单状态为待付款时才显示去支付按钮 -->
                <el-button 
                  type="primary" 
                  @click="goToPayment" 
                  v-if="orderDetail.order.status === 1"
                >
                  去支付
                </el-button>
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

    <!-- Payment Method Dialog -->
    <el-dialog
      title="选择支付方式"
      v-model="paymentDialogVisible"
      width="800px"
      :close-on-click-modal="false"
    >
      <div v-if="paymentMethodsLoading" class="loading-container">
        <el-skeleton :rows="5" animated />
      </div>
      
      <div v-else>
        <!-- Order Items -->
        <el-card class="mb-20" v-if="orderDetail.orderItems && orderDetail.orderItems.length > 0">
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
        
        <el-alert
          :title="`支付金额: ¥${orderDetail.order ? orderDetail.order.payAmount : 0}`"
          type="success"
          show-icon
          :closable="false"
          class="mb-20"
        />
        
        <el-table 
          :data="availablePaymentMethods" 
          stripe
          style="width: 100%"
          @row-click="selectPaymentMethod"
          :row-class-name="rowClassName"
        >
          <el-table-column prop="methodName" label="支付方式" min-width="150" />
          <el-table-column prop="accountName" label="账户名称" min-width="150" />
          <el-table-column prop="accountNumber" label="账户号码/卡号" min-width="200" />
          <el-table-column label="操作" width="80">
            <template #default="scope">
              <el-button 
                type="primary" 
                size="small" 
                text
                v-if="selectedPaymentMethod && selectedPaymentMethod.id === scope.row.id"
              >
                已选择
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="paymentDialogVisible = false">取消</el-button>
          <el-button 
            type="primary" 
            @click="confirmPayment"
            :loading="paymentLoading"
            :disabled="!selectedPaymentMethod"
          >
            确认支付
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- Address Selection Dialog -->
    <el-dialog
      title="选择收货地址"
      v-model="addressDialogVisible"
      width="600px"
      :close-on-click-modal="false"
    >
      <div v-if="receiverAddresses.length > 0">
        <el-table :data="receiverAddresses" style="width: 100%" max-height="300">
          <el-table-column prop="receiverName" label="收货人" width="100" />
          <el-table-column prop="receiverPhone" label="联系电话" width="120" />
          <el-table-column prop="province" label="地址">
            <template #default="scope">
              {{ scope.row.province }}{{ scope.row.city }}{{ scope.row.district }}{{ scope.row.detailAddress }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template #default="scope">
              <el-button 
                type="primary" 
                size="small" 
                @click="selectAddress(scope.row)"
                :disabled="selectedAddress && selectedAddress.id === scope.row.id"
              >
                {{ selectedAddress && selectedAddress.id === scope.row.id ? '已选择' : '选择' }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <el-empty description="暂无收货地址">
          <el-button type="primary" @click="goToAddressManagement">去添加</el-button>
        </el-empty>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addressDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  HomeFilled, Goods, Document, SuccessFilled
} from '@element-plus/icons-vue'
import orderApi from '@/api/order'
import paymentMethodApi from '@/api/paymentMethod'
import receiverAddressApi from '@/api/receiverAddress'
import { useAuthStore } from '@/config/store.js'

// 路由相关
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// 响应式数据
const orderDetail = ref({
  order: {},
  orderItems: []
})
const loading = ref(true)

// Payment related data
const paymentDialogVisible = ref(false)
const paymentMethodsLoading = ref(false)
const paymentLoading = ref(false)
const selectedPaymentMethod = ref(null)
const availablePaymentMethods = ref([])

// 添加收货地址相关数据
const receiverAddresses = ref([])  // 收货地址列表
const selectedAddress = ref(null) // 选中的收货地址
const addressDialogVisible = ref(false) // 地址选择对话框可见性

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
 * 获取用户的收货地址
 */
const fetchReceiverAddresses = async () => {
  try {
    // 获取当前用户ID
    const userId = authStore.user?.id || authStore.user?.userId
    
    // 获取用户的收货地址
    const addressResponse = await receiverAddressApi.listByUserId(userId)
    
    if (addressResponse.code === 200 && addressResponse.data) {
      receiverAddresses.value = addressResponse.data
      // 根据订单中的地址ID找到对应的收货地址
      if (orderDetail.value.order && orderDetail.value.order.receiverAddressId) {
        selectedAddress.value = addressResponse.data.find(
          addr => addr.id === orderDetail.value.order.receiverAddressId
        ) || null
      } else {
        // 如果订单中没有地址ID，则选择默认地址
        selectedAddress.value = addressResponse.data.find(addr => addr.isDefault === 1) || null
      }
    }
  } catch (error) {
    console.error('获取收货地址失败:', error)
    ElMessage.error('获取收货地址失败: ' + (error.message || '未知错误'))
  }
}

/**
 * 显示地址选择对话框
 */
const showAddressDialog = () => {
  addressDialogVisible.value = true
}

/**
 * 选择收货地址
 */
const selectAddress = (address) => {
  selectedAddress.value = address
  addressDialogVisible.value = false
  // 更新订单中的收货地址信息
  orderDetail.value.order.receiverName = address.receiverName
  orderDetail.value.order.receiverPhone = address.receiverPhone
  orderDetail.value.order.receiverAddress = `${address.province}${address.city}${address.district}${address.detailAddress}`
  orderDetail.value.order.receiverAddressId = address.id
}

/**
 * 去地址管理页面
 */
const goToAddressManagement = () => {
  addressDialogVisible.value = false
  router.push('/admin/personal/shipping-address')
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
    
    // 调用API获取订单详情（包含订单项）
    const response = await orderApi.getDetailById(orderId)
    
    if (response.code === 200 && response.data) {
      orderDetail.value = response.data
      // 获取收货地址信息
      await fetchReceiverAddresses()
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

/**
 * 获取支付方式列表
 */
const fetchPaymentMethods = async () => {
  try {
    paymentMethodsLoading.value = true
    
    // 获取当前用户ID
    const userId = authStore.user?.id || authStore.user?.userId
    
    // 调用API获取用户的支付方式列表
    const response = await paymentMethodApi.listByUserId(userId)
    
    if (response.code === 200 && response.data) {
      availablePaymentMethods.value = response.data.filter(method => method.status === 1) || []
      if (availablePaymentMethods.value.length === 0) {
        ElMessage.warning('您还没有可用的支付方式，请先添加支付方式')
      }
    } else {
      ElMessage.error(response.message || '获取支付方式列表失败')
    }
  } catch (error) {
    console.error('获取支付方式列表失败:', error)
    ElMessage.error('获取支付方式列表失败')
  } finally {
    paymentMethodsLoading.value = false
  }
}

/**
 * 选择支付方式
 */
const selectPaymentMethod = (row) => {
  selectedPaymentMethod.value = row
}

/**
 * 表格行样式
 */
const rowClassName = ({ row }) => {
  if (selectedPaymentMethod.value && selectedPaymentMethod.value.id === row.id) {
    return 'selected-row'
  }
  return ''
}

/**
 * 确认支付
 */
const confirmPayment = async () => {
  if (!selectedPaymentMethod.value) {
    ElMessage.warning('请选择支付方式')
    return
  }
  
  ElMessageBox.confirm(
    `确定要使用 ${selectedPaymentMethod.value.methodName} 支付订单 ${orderDetail.value.order.orderNo} 吗？`,
    '确认支付',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      paymentLoading.value = true
      
      // 更新订单状态为已付款 (状态码2)
      // 只发送必要的字段，不包含时间相关的字段
      const orderData = {
        id: orderDetail.value.order.id,
        orderNo: orderDetail.value.order.orderNo,
        totalAmount: orderDetail.value.order.totalAmount,
        payAmount: orderDetail.value.order.payAmount,
        status: 2, // 已付款
        paymentMethod: selectedPaymentMethod.value.id, // 设置支付方式
        // paymentTime: new Date().toISOString(), // 设置支付时间
        receiverName: orderDetail.value.order.receiverName,
        receiverPhone: orderDetail.value.order.receiverPhone,
        receiverAddress: orderDetail.value.order.receiverAddress,
        userId: orderDetail.value.order.userId,
        merchantId: orderDetail.value.order.merchantId
        // 不包含 createTime, updateTime 等只读字段
      }
      
      const response = await orderApi.save(orderData)
      
      if (response.code === 200) {
        ElMessage.success('支付成功')
        paymentDialogVisible.value = false
        // 重新加载订单详情以显示更新后的状态
        await fetchOrderDetail()
        // 不再跳转到订单列表页面，保持在当前页面
        // router.push('/admin/personal/orders')
      } else {
        ElMessage.error(response.message || '支付失败')
      }
    } catch (error) {
      console.error('支付失败:', error)
      ElMessage.error('支付失败: ' + (error.message || '未知错误'))
    } finally {
      paymentLoading.value = false
    }
  }).catch(() => {
    // 用户取消操作
  })
}

// 按钮操作
const goToPayment = async () => {
  // 显示支付对话框
  paymentDialogVisible.value = true
  selectedPaymentMethod.value = null
  await fetchPaymentMethods()
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

<style src="@/assets/order-confirmation.css" scoped>
</style>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-header h3 {
  margin: 0;
}
</style>
