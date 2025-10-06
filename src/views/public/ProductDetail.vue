<template>
  <div class="product-detail-page">
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
          {{ product.merchantName || '产品详情' }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="10" animated />
    </div>

    <!-- 产品详情内容 -->
    <div v-else-if="product.id" class="product-detail-container">
      <div class="container">
        <el-row :gutter="30" class="product-detail-row">
          <!-- 产品图片展示区 -->
          <el-col :xs="24" :sm="24" :md="12" :lg="10">
            <el-card class="product-images-section" shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>产品图片</span>
                </div>
              </template>
              
              <div class="main-image-container">
                <el-image 
                  :src="currentImage" 
                  :alt="product.merchantName"
                  fit="cover"
                  class="main-image"
                >
                  <template #error>
                    <div class="image-error">
                      <el-icon size="40"><Picture /></el-icon>
                      <p>图片加载失败</p>
                    </div>
                  </template>
                </el-image>
              </div>
              
              <!-- 缩略图 -->
              <div class="thumbnail-container">
                <el-scrollbar>
                  <div class="thumbnail-wrapper">
                    <el-image 
                      v-for="(image, index) in productImages" 
                      :key="index"
                      :src="image" 
                      :alt="`产品图片${index + 1}`"
                      fit="cover"
                      class="thumbnail-image"
                      :class="{ active: currentImage === image }"
                      @click="currentImage = image"
                    >
                      <template #error>
                        <div class="thumbnail-error">
                          <el-icon><Picture /></el-icon>
                        </div>
                      </template>
                    </el-image>
                  </div>
                </el-scrollbar>
              </div>
            </el-card>
          </el-col>
          
          <!-- 产品信息区 -->
          <el-col :xs="24" :sm="24" :md="12" :lg="14">
            <el-card class="product-info-section" shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>产品信息</span>
                </div>
              </template>
              
              <h1 class="product-title">{{ product.merchantName }}</h1>
              
              <div class="product-meta">
                <div class="product-rating">
                  <el-rate v-model="product.avgRating" disabled show-score />
                  <span class="sales-count">已售{{ product.totalSales }}件</span>
                </div>
                
                <div class="product-category">
                  <el-tag>{{ getCategoryName(product.categoryId) }}</el-tag>
                </div>
              </div>
              
              <div class="product-price-section">
                <div class="price-container">
                  <span class="current-price">¥{{ product.minPrice }}</span>
                  <span v-if="product.isDiscounted" class="original-price">¥{{ product.originalPrice }}</span>
                </div>
                
                <div class="detail-product-tags">
                  <el-tag v-if="product.isDiscounted" type="danger">特价</el-tag>
                  <el-tag v-if="product.isHot" type="danger">热销</el-tag>
                  <el-tag v-if="product.status === 1" type="success">上架</el-tag>
                  <el-tag v-else type="info">下架</el-tag>
                </div>
              </div>
              
              <div class="product-description">
                <p>{{ product.description }}</p>
              </div>
              
              <el-divider />
              
              <div class="product-actions-section">
                <el-row :gutter="15">
                  <el-col :span="8">
                    <div class="quantity-selector">
                      <span class="label">数量：</span>
                      <el-input-number 
                        v-model="quantity" 
                        :min="1" 
                        :max="99" 
                        size="large" 
                      />
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div class="action-buttons">
                      <el-button type="primary" size="large" @click="addToCart" class="action-btn">
                        <el-icon><ShoppingCart /></el-icon>
                        加入购物车
                      </el-button>
                      <el-button type="success" size="large" @click="buyNow" class="action-btn">
                        <el-icon><Goods /></el-icon>
                        立即购买
                      </el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
              
              <el-divider />
              
              <div class="product-social-actions">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-button type="info" plain @click="addToFavorites" class="tag-btn">
                      <el-icon><Star /></el-icon>
                      收藏商品
                    </el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="info" plain @click="shareProduct" class="tag-btn">
                      <el-icon><Share /></el-icon>
                      分享
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
        </el-row>
        
        <!-- 产品详情描述区 -->
        <el-card class="product-detail-section" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>详细信息</span>
            </div>
          </template>
          
          <el-tabs v-model="activeTab">
            <el-tab-pane label="产品详情" name="detail">
              <div class="detail-content" v-html="product.detail"></div>
            </el-tab-pane>
            <el-tab-pane label="规格参数" name="specs">
              <div class="specs-content">
                <el-descriptions :column="1" border>
                  <el-descriptions-item label="产品名称">{{ product.merchantName }}</el-descriptions-item>
                  <el-descriptions-item label="产品编码">{{ product.productCode }}</el-descriptions-item>
                  <el-descriptions-item label="品牌">{{ product.brand }}</el-descriptions-item>
                  <el-descriptions-item label="分类">{{ getCategoryName(product.categoryId) }}</el-descriptions-item>
                  <el-descriptions-item label="上架状态">
                    <el-tag :type="product.status === 1 ? 'success' : 'info'">
                      {{ product.status === 1 ? '上架' : '下架' }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="是否打折">
                    <el-tag :type="product.isDiscounted ? 'success' : 'info'">
                      {{ product.isDiscounted ? '是' : '否' }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="是否热销">
                    <el-tag :type="product.isHot ? 'success' : 'info'">
                      {{ product.isHot ? '是' : '否' }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="总销量">{{ product.totalSales }} 件</el-descriptions-item>
                  <el-descriptions-item label="平均评分">{{ product.avgRating }} 分</el-descriptions-item>
                </el-descriptions>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
    
    <!-- 无数据状态 -->
    <div v-else class="no-data-container">
      <el-empty description="产品不存在或已被删除">
        <el-button type="primary" @click="goBack">返回产品列表</el-button>
      </el-empty>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { 
  ShoppingCart, Goods, Star, Share, Picture,
  HomeFilled, Document
} from '@element-plus/icons-vue'
import merchantProduct from '@/api/merchantProduct'
import shoppingCartApi from '@/api/shoppingCart'
import { useAuthStore } from '@/config/store.js'

// 路由相关
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// 响应式数据
const loading = ref(true)
const product = ref({})
const quantity = ref(1)
const currentImage = ref('')
const activeTab = ref('detail')

// 计算属性 - 产品图片数组
const productImages = ref([])

// 方法
const getCategoryName = (categoryId) => {
  const categoryMap = {
    1: '玫瑰',
    2: '百合',
    3: '向日葵',
    4: '康乃馨'
  }
  return categoryMap[categoryId] || '其他'
}

/**
 * 获取产品详情
 */
const fetchProductDetail = async () => {
  try {
    loading.value = true
    const productId = route.params.id
    
    if (!productId) {
      ElMessage.error('产品ID不能为空')
      router.push('/products')
      return
    }
    
    // 调用API获取产品详情
    const response = await merchantProduct.getById(productId)
    
    if (response.code === 200 && response.data) {
      product.value = response.data
      
      // 处理图片
      productImages.value = []
      
      // 添加主图
      if (product.value.mainImage) {
        productImages.value.push(product.value.mainImage)
        currentImage.value = product.value.mainImage
      }
      
      // 添加子图
      if (product.value.subImages) {
        try {
          const subImages = JSON.parse(product.value.subImages)
          productImages.value.push(...subImages)
        } catch (e) {
          console.warn('解析子图数据失败:', e)
        }
      }
      
      // 如果没有图片，设置默认图片
      if (productImages.value.length === 0) {
        currentImage.value = ''
      }
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
 * 加入购物车
 */
const addToCart = async () => {
  try {
    // 获取当前登录用户ID
    const userId = authStore.user?.id || authStore.user?.userId || 2; // 如果没有获取到用户ID，使用默认值2
    console.log('product:', product)
    // 构造购物车对象
    const shoppingCart = {
      productId: product.value.id,
      skuId: product.value.skuId,
      merchantName: product.value.merchantName,
      price: product.value.minPrice,
      quantity: quantity.value,
      merchantId: product.value.merchantId || 1, // 默认商户ID，实际应从产品信息中获取
      userId: userId,
      status: 1 // 有效状态
    }
    
    // 调用API添加到购物车
    const response = await shoppingCartApi.add(shoppingCart)
    
    if (response.code === 200) {
      ElMessage.success(`已将 ${product.value.merchantName} 加入购物车`)
    } else {
      ElMessage.error(response.message || '添加到购物车失败')
    }
  } catch (error) {
    console.error('添加到购物车失败:', error)
    ElMessage.error('添加到购物车失败: ' + (error.message || '未知错误'))
  }
}

/**
 * 立即购买
 */
const buyNow = () => {
  ElMessage.success('立即购买功能开发中...')
  // 这里可以跳转到订单确认页面
}

/**
 * 收藏商品
 */
const addToFavorites = () => {
  ElMessage.success(`已收藏 ${product.value.merchantName}`)
}

/**
 * 分享商品
 */
const shareProduct = () => {
  ElMessage.success('分享功能开发中...')
}

// 生命周期
onMounted(() => {
  fetchProductDetail()
})
</script>

<style src="@/assets/productDetail.css"></style>