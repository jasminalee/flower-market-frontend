<template>
  <div class="order-preview-page">
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
        <el-breadcrumb-item v-if="fromCart">
          <el-icon><ShoppingCart /></el-icon>
          购物车
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-icon><Document /></el-icon>
          订单预览
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-card class="preview-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>订单预览</span>
          </div>
        </template>

        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="8" animated />
        </div>

        <div v-else class="order-preview-content">
          <el-row :gutter="20">
            <!-- 商品信息 -->
            <el-col :span="24">
              <div class="product-info-section">
                <h3>商品信息</h3>
                <el-card class="product-card" shadow="never">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <el-image 
                        :src="product.mainImage" 
                        :alt="product.merchantName"
                        fit="cover"
                        class="product-image"
                      >
                        <template #error>
                          <div class="image-error">
                            <el-icon size="30"><Picture /></el-icon>
                          </div>
                        </template>
                      </el-image>
                    </el-col>
                    <el-col :span="18">
                      <div class="product-details">
                        <h4>{{ product.merchantName }}</h4>
                        <p class="product-description">{{ product.description }}</p>
                        <div class="product-price">
                          <span class="price">¥{{ product.minPrice }}</span>
                          <span class="quantity">数量: {{ quantity }}</span>
                        </div>
                        <div class="product-total">
                          小计: <span class="total-amount">¥{{ (product.minPrice * quantity).toFixed(2) }}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="mt-20">
            <!-- 收货地址 -->
            <el-col :span="24">
              <div class="shipping-address-section">
                <div class="section-header">
                  <h3>收货地址</h3>
                  <el-button type="primary" size="small" @click="showAddressDialog">
                    {{ selectedAddress ? '更换地址' : '添加地址' }}
                  </el-button>
                </div>
                
                <div v-if="selectedAddress" class="address-display">
                  <el-descriptions :column="1" border>
                    <el-descriptions-item label="收货人">{{ selectedAddress.receiverName }}</el-descriptions-item>
                    <el-descriptions-item label="联系电话">{{ selectedAddress.receiverPhone }}</el-descriptions-item>
                    <el-descriptions-item label="收货地址">
                      {{ selectedAddress.province }}{{ selectedAddress.city }}{{ selectedAddress.district }}{{ selectedAddress.detailAddress }}
                    </el-descriptions-item>
                  </el-descriptions>
                </div>
                
                <div v-else class="no-address">
                  <el-alert
                    title="请选择收货地址"
                    type="warning"
                    description="您还没有选择收货地址，请添加或选择一个地址"
                    show-icon
                  />
                </div>
              </div>
            </el-col>
          </el-row>

          <!-- 订单汇总 -->
          <el-row :gutter="20" class="mt-20">
            <el-col :span="24">
              <div class="order-summary">
                <h3>订单汇总</h3>
                <el-descriptions :column="1" border>
                  <el-descriptions-item label="商品总额">¥{{ (product.minPrice * quantity).toFixed(2) }}</el-descriptions-item>
                  <el-descriptions-item label="运费">¥0.00</el-descriptions-item>
                  <el-descriptions-item label="优惠金额">¥0.00</el-descriptions-item>
                  <el-descriptions-item label="应付总额">
                    <span class="total-amount">¥{{ (product.minPrice * quantity).toFixed(2) }}</span>
                  </el-descriptions-item>
                </el-descriptions>
              </div>
            </el-col>
          </el-row>

          <!-- 操作按钮 -->
          <el-row :gutter="20" class="mt-30">
            <el-col :span="24">
              <div class="action-buttons">
                <el-button @click="goBack">返回</el-button>
                <el-button 
                  type="success" 
                  @click="confirmOrder" 
                  :disabled="!selectedAddress || confirmLoading"
                  :loading="confirmLoading"
                >
                  提交订单
                </el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    
    <!-- 收货地址选择对话框 -->
    <el-dialog v-model="addressDialogVisible" title="选择收货地址" width="600">
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
  HomeFilled, Goods, Document, Picture, ShoppingCart
} from '@element-plus/icons-vue'
import merchantProduct from '@/api/merchantProduct'
import receiverAddressApi from '@/api/receiverAddress'
import orderApi from '@/api/order'
import { useAuthStore } from '@/config/store.js'

// 路由相关
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// 响应式数据
const loading = ref(true)
const confirmLoading = ref(false)
const product = ref({})
const quantity = ref(1)
const receiverAddresses = ref([])  // 收货地址列表
const selectedAddress = ref(null) // 选中的收货地址
const addressDialogVisible = ref(false) // 地址选择对话框可见性
const fromCart = ref(false) // 是否来自购物车

// 方法
/**
 * 获取产品详情
 */
const fetchProductDetail = async () => {
  try {
    loading.value = true
    const productId = route.query.productId
    
    if (!productId) {
      ElMessage.error('产品ID不能为空')
      router.push('/products')
      return
    }
    
    // 获取数量参数
    quantity.value = parseInt(route.query.quantity) || 1
    
    // 检查是否来自购物车
    fromCart.value = route.query.from === 'cart'
    
    // 调用API获取产品详情
    const response = await merchantProduct.getById(productId)
    
    if (response.code === 200 && response.data) {
      product.value = response.data
    } else {
      ElMessage.error(response.message || '获取产品详情失败')
    }
  } catch (error) {
    console.error('获取产品详情失败:', error)
    ElMessage.error('获取产品详情失败')
  } finally {
    loading.value = false
  }
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
      // 如果有默认地址，自动选择
      selectedAddress.value = addressResponse.data.find(addr => addr.isDefault === 1) || null
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
}

/**
 * 去地址管理页面
 */
const goToAddressManagement = () => {
  addressDialogVisible.value = false
  router.push('/admin/personal/shipping-address')
}

/**
 * 提交订单
 */
const confirmOrder = async () => {
  if (!selectedAddress.value) {
    ElMessage.warning('请选择收货地址')
    return
  }
  
  try {
    confirmLoading.value = true
    
    // 获取当前用户ID
    const userId = authStore.user?.id || authStore.user?.userId
    
    // 创建订单
    const shoppingCarts = [{
      merchantProductId: product.value.id,
      quantity: quantity.value,
      price: product.value.minPrice
    }];
    
    const orderResponse = await orderApi.cartPurchase(
      shoppingCarts,
      userId,
      selectedAddress.value.id
    )
    
    if (orderResponse.code === 200 && orderResponse.data) {
      ElMessage.success('订单创建成功')
      // 跳转到订单确认页面
      router.push(`/order-confirmation/${orderResponse.data.id}`)
    } else {
      ElMessage.error(orderResponse.message || '创建订单失败')
    }
  } catch (error) {
    console.error('创建订单失败:', error)
    ElMessage.error('创建订单失败: ' + (error.message || '未知错误'))
  } finally {
    confirmLoading.value = false
  }
}

/**
 * 返回上一页
 */
const goBack = () => {
  if (fromCart.value) {
    router.push('/shopping-cart')
  } else {
    router.go(-1)
  }
}

// 生命周期
onMounted(() => {
  fetchProductDetail()
  fetchReceiverAddresses()
})
</script>

<style scoped>
.order-preview-page {
  padding: 20px 0;
}

.preview-card {
  max-width: 800px;
  margin: 0 auto;
}

.card-header {
  font-size: 18px;
  font-weight: 500;
}

.product-card {
  border: 1px solid #ebeef5;
}

.product-image {
  width: 100%;
  height: 120px;
  border-radius: 4px;
}

.product-details h4 {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 500;
}

.product-description {
  color: #606266;
  font-size: 14px;
  margin: 10px 0;
}

.product-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.price {
  color: #fa4f4f;
  font-size: 18px;
  font-weight: 500;
}

.quantity {
  color: #909399;
}

.product-total {
  margin-top: 10px;
  font-size: 16px;
  font-weight: 500;
}

.total-amount {
  color: #fa4f4f;
  font-size: 18px;
  font-weight: 500;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-header h3 {
  margin: 0;
}

.address-display {
  margin-top: 10px;
}

.no-address {
  margin-top: 10px;
}

.order-summary {
  margin-top: 20px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.mt-20 {
  margin-top: 20px;
}

.mt-30 {
  margin-top: 30px;
}

.image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #909399;
}
</style>