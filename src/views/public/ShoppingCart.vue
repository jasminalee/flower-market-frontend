<template>
  <div class="page-header">
    <div class="page-header-content">
      <h1>购物车</h1>
      <p>查看和管理您的购物车商品</p>
    </div>
  </div>
  <div class="shopping-cart-page">
    <el-card class="cart-card">
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="5" animated />
      </div>
      
      <div v-else-if="cartItems.length === 0" class="empty-cart">
        <el-empty description="购物车为空">
          <el-button type="primary" @click="goToProducts">去选购商品</el-button>
        </el-empty>
      </div>
      
      <div v-else>
        <el-table 
          :data="cartItems" 
          class="cart-table"
          @selection-change="handleSelectionChange"
        >
          <!-- 选择列 -->
          <el-table-column type="selection" width="55" align="center" />
          
          <!-- 图片列 -->
          <el-table-column prop="mainImage" label="商品图片" width="120" align="center">
            <template #default="{ row }">
              <div class="product-image-container">
                <el-image 
                  :src="row.mainImage" 
                  :alt="row.productName"
                  fit="cover"
                  class="product-image"
                  lazy
                  :preview-src-list="[row.mainImage]"
                  preview-teleported
                >
                  <template #placeholder>
                    <div class="image-slot">
                      <el-skeleton :rows="1" animated />
                    </div>
                  </template>
                  <template #error>
                    <div class="image-slot">
                      <el-icon><Picture /></el-icon>
                    </div>
                  </template>
                </el-image>
              </div>
            </template>
          </el-table-column>
          
          <!-- 商品名称列 -->
          <el-table-column prop="productName" label="商品名称" min-width="200">
            <template #default="{ row }">
              <el-link type="primary" @click="goToProductDetail(row.merchantProductId)">
                {{ row.productName }}
              </el-link>
            </template>
          </el-table-column>
          
          <!-- SKU信息列 -->
          <el-table-column prop="skuName" label="SKU信息" min-width="150" />
          
          <!-- 商家列 -->
          <el-table-column prop="merchantName" label="商家" min-width="150" />
          
          <!-- 单价列 -->
          <el-table-column prop="price" label="单价" width="120" align="center">
            <template #default="{ row }">
              ¥{{ row.price }}
            </template>
          </el-table-column>
          
          <!-- 数量列 -->
          <el-table-column label="数量" width="150" align="center">
            <template #default="{ row }">
              <el-input-number 
                v-model="row.quantity" 
                :min="1" 
                :max="999" 
                size="small"
                @change="handleQuantityChange(row)"
              />
            </template>
          </el-table-column>
          
          <!-- 小计列 -->
          <el-table-column prop="subtotal" label="小计" width="120" align="center">
            <template #default="{ row }">
              ¥{{ (row.price * row.quantity).toFixed(2) }}
            </template>
          </el-table-column>
          
          <!-- 操作列 -->
          <el-table-column label="操作" width="100" align="center">
            <template #default="{ row }">
              <el-button type="danger" size="small" text @click="removeItem(row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <div class="cart-footer">
          <div class="cart-summary">
            <span>已选 {{ selectedItemsCount }} 件商品</span>
            <span class="total-price">总计: ¥{{ selectedItemsTotal.toFixed(2) }}</span>
          </div>
          <div class="cart-actions">
            <el-button @click="continueShopping">继续购物</el-button>
            <el-button type="primary" size="large" @click="checkout" :disabled="selectedItems.length === 0">
              去结算
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Picture } from '@element-plus/icons-vue'
import shoppingCartApi from '@/api/shoppingCart.js'
import productApi from '@/api/product.js'
import { useAuthStore } from '@/config/store.js'

// 响应式数据
const loading = ref(false)
const cartItems = ref([])
const selectedItems = ref([])

// 路由
const router = useRouter()
const authStore = useAuthStore()

/**
 * 跳转到产品详情页
 */
const goToProductDetail = (merchantProductId) => {
  console.log('尝试跳转到产品详情页，merchantProductId:', merchantProductId)
  if (merchantProductId) {
    router.push(`/products/${merchantProductId}`)
  } else {
    ElMessage.warning('无法跳转到产品详情页: 缺少产品ID')
    console.warn('跳转失败，merchantProductId为空或无效:', merchantProductId)
  }
}

/**
 * 计算属性
 */
const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0)
})

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

// 选中商品的数量
const selectedItemsCount = computed(() => {
  return selectedItems.value.reduce((total, item) => total + item.quantity, 0)
})

// 选中商品的总价
const selectedItemsTotal = computed(() => {
  return selectedItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

/**
 * 处理选择变化
 */
const handleSelectionChange = (selection) => {
  selectedItems.value = selection
}

/**
 * 加载购物车数据
 */
const loadCartItems = async () => {
  loading.value = true
  try {
    // 获取当前登录用户ID
    const userId = authStore.user?.id || authStore.user?.userId || 2; // 如果没有获取到用户ID，使用默认值2
    console.log('当前登录用户:', authStore.user)
    const response = await shoppingCartApi.list({ userId })

    if (response && response.code === 200) {
      cartItems.value = response.data || []
      console.log('response数据:', response.data) // 添加日志查看数据结构
      console.log('购物车数据:', cartItems.value) // 添加日志查看数据结构
      // Initialize _originalQuantity for each item
      cartItems.value.forEach(item => {
        item._originalQuantity = item.quantity
      })
      // 为每个商品添加模拟的图片URL（实际应从API获取）
      await enhanceCartItemsWithProductDetails()
    } else {
      ElMessage.error('获取购物车数据失败')
    }
  } catch (error) {
    console.error('加载购物车数据失败:', error)
    ElMessage.error('加载购物车数据失败: ' + (error.message || '未知错误'))
  } finally {
    loading.value = false
  }
}

/**
 * 通过产品API获取更多产品详情（包括图片）
 */
const enhanceCartItemsWithProductDetails = async () => {
  try {
    // 获取所有唯一的产品ID
    const merchantProductIds = [...new Set(cartItems.value.map(item => item.merchantProductId).filter(id => id))]
    
    // 批量获取产品详情
    const productDetails = {}
    for (const merchantProductId of merchantProductIds) {
      try {
        const productResponse = await productApi.getById(merchantProductId)
        if (productResponse && productResponse.code === 200) {
          productDetails[merchantProductId] = productResponse.data
        }
      } catch (error) {
        console.warn(`获取产品 ${merchantProductId} 详情失败:`, error)
      }
    }
    
    // 将产品详情合并到购物车项中
    cartItems.value = cartItems.value.map(item => {
      const productDetail = productDetails[item.merchantProductId]
      if (productDetail) {
        return {
          ...item,
          mainImage: productDetail.mainImage || 'https://via.placeholder.com/200x200?text=Product+Image',
          description: productDetail.description || ''
        }
      } else {
        return {
          ...item,
          mainImage: item.mainImage || 'https://via.placeholder.com/200x200?text=Product+Image'
        }
      }
    })
  } catch (error) {
    console.error('增强购物车数据失败:', error)
    // 如果获取产品详情失败，使用默认图片
    cartItems.value = cartItems.value.map(item => ({
      ...item,
      mainImage: item.mainImage || 'https://via.placeholder.com/200x200?text=Product+Image'
    }))
  }
}

/**
 * 处理数量变化
 */
const handleQuantityChange = async (item) => {
  // Store the original quantity in case we need to revert
  const originalQuantity = item._originalQuantity !== undefined ? item._originalQuantity : item.quantity;
  
  try {
    // Prepare the shopping cart data according to the API specification
    const shoppingCartData = {
      id: item.id,
      quantity: item.quantity,
    }

    // Call the API to update the shopping cart item
    const response = await shoppingCartApi.update(shoppingCartData)
    
    if (response && response.code === 200) {
      // Update successful, store the new quantity as original
      item._originalQuantity = item.quantity
      ElMessage.success('数量已更新')
    } else {
      ElMessage.error('更新失败: ' + (response?.message || '未知错误'))
      // Revert the quantity change if the API call failed
      item.quantity = originalQuantity
    }
  } catch (error) {
    console.error('更新购物车项数量失败:', error)
    ElMessage.error('更新失败: ' + (error.message || '网络错误'))
    // Revert the quantity change if the API call failed
    item.quantity = originalQuantity
  }
}

/**
 * 删除购物车项
 */
const removeItem = (item) => {
  ElMessageBox.confirm(
    `确定要删除商品 "${item.productName}" 吗？`,
    '确认删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    try {
      // 调用接口删除购物车项
      const response = await shoppingCartApi.delete(item.id)
      
      if (response && response.code === 200) {
        cartItems.value = cartItems.value.filter(cartItem => cartItem.id !== item.id)
        // 从选中列表中移除
        selectedItems.value = selectedItems.value.filter(selectedItem => selectedItem.id !== item.id)
        ElMessage.success('删除成功')
      } else {
        ElMessage.error('删除失败: ' + (response?.message || '未知错误'))
      }
    } catch (error) {
      console.error('删除购物车项失败:', error)
      ElMessage.error('删除失败: ' + (error.message || '网络错误'))
    }
  }).catch(() => {
    // 用户取消删除
  })
}

/**
 * 去结算
 */
const checkout = () => {
  ElMessage.info('跳转到结算页面')
  // 这里可以跳转到结算页面
}

/**
 * 继续购物
 */
const continueShopping = () => {
  router.push('/products')
}

/**
 * 去选购商品
 */
const goToProducts = () => {
  router.push('/products')
}

// 生命周期
onMounted(() => {
  loadCartItems()
})
</script>

<style src="@/assets/shoppingCart.css" scoped>
</style>