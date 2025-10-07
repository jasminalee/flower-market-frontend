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
                  fit="contain"
                  class="main-image"
                  :preview-src-list="productImages"
                  preview-teleported
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
                      :preview-src-list="productImages"
                      preview-teleported
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
                </el-descriptions>
              </div>
            </el-tab-pane>
            <el-tab-pane label="用户评价" name="reviews">
              <div class="reviews-content">
                <div class="review-summary">
                  <div class="rating-score">
                    <span class="score">{{ product.avgRating || 0 }}</span>
                    <el-rate v-model="product.avgRating" disabled />
                  </div>
                  <div class="rating-distribution">
                    <!-- 这里可以展示评分分布 -->
                  </div>
                </div>
                
                <div class="review-list">
                  <div v-if="reviews.length === 0" class="no-reviews">
                    <el-empty description="暂无评价" />
                  </div>
                  <div v-else>
                    <div v-for="review in reviews" :key="review.id" class="review-item">
                      <div class="review-header">
                        <el-avatar :src="review.userAvatar" size="small">{{ review.userName?.charAt(0) }}</el-avatar>
                        <span class="review-user">{{ review.userName }}</span>
                        <el-rate v-model="review.rating" disabled />
                        <span class="review-time">{{ formatDate(review.createTime) }}</span>
                      </div>
                      <div class="review-content">
                        {{ review.content }}
                      </div>
                      <div v-if="review.images && review.images.length > 0" class="review-images">
                        <el-image 
                          v-for="(image, index) in review.images" 
                          :key="index"
                          :src="image" 
                          fit="cover"
                          class="review-image"
                          :preview-src-list="review.images"
                          preview-teleported
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
    
    <!-- 产品不存在或加载失败 -->
    <div v-else class="product-not-found">
      <el-empty description="产品不存在或加载失败">
        <el-button type="primary" @click="goToProducts">返回产品列表</el-button>
      </el-empty>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { 
  HomeFilled, Goods, Document, Picture, ShoppingCart, Star, Share
} from '@element-plus/icons-vue'
import merchantProductApi from '@/api/merchantProduct.js'
import productCategoryApi from '@/api/productCategory.js'
import commentApi from '@/api/comment.js'

// 路由
const route = useRoute()
const router = useRouter()

// 响应式数据
const loading = ref(false)
const product = ref({})
const categories = ref([])
const currentImage = ref('')
const quantity = ref(1)
const activeTab = ref('detail')
const reviews = ref([])

/**
 * 计算属性：产品图片数组
 */
const productImages = computed(() => {
  if (!product.value.subImages) return []
  
  // 如果subImages是JSON字符串，则解析它
  if (typeof product.value.subImages === 'string') {
    try {
      // 尝试解析JSON字符串
      const parsed = JSON.parse(product.value.subImages)
      if (Array.isArray(parsed)) {
        return parsed.filter(url => url.trim() !== '')
      }
    } catch (e) {
      // 如果不是有效的JSON，按逗号分割处理
      return product.value.subImages.split(',').filter(url => url.trim() !== '')
    }
  }
  
  // 如果subImages是数组，直接返回
  if (Array.isArray(product.value.subImages)) {
    return product.value.subImages.filter(url => url.trim() !== '')
  }
  
  return []
})

/**
 * 获取分类名称
 */
const getCategoryName = (categoryId) => {
  if (!categoryId) return '未知分类'
  const category = categories.value.find(cat => cat.id === categoryId)
  return category ? category.name : '未知分类'
}

/**
 * 格式化日期
 */
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

/**
 * 获取产品详情
 */
const fetchProduct = async (id) => {
  loading.value = true
  try {
    const response = await merchantProductApi.getById(id)
    if (response && response.code === 200) {
      product.value = response.data
      
      // 设置默认图片
      if (productImages.value.length > 0) {
        currentImage.value = productImages.value[0]
      } else {
        currentImage.value = product.value.mainImage || ''
      }
      
      // 获取评论
      fetchReviews(id)
    } else {
      ElMessage.error('获取产品信息失败')
    }
  } catch (error) {
    console.error('获取产品信息失败:', error)
    ElMessage.error('获取产品信息失败: ' + (error.message || '未知错误'))
  } finally {
    loading.value = false
  }
}

/**
 * 获取产品分类
 */
const fetchCategories = async () => {
  try {
    const response = await productCategoryApi.list()
    if (response && response.code === 200) {
      categories.value = response.data || []
    }
  } catch (error) {
    console.error('获取产品分类失败:', error)
  }
}

/**
 * 获取产品评论
 */
const fetchReviews = async (productId) => {
  console.log('获取产品评论...', productId)
  try {
    const response = await commentApi.listBySource({
      sourceId: productId,
      sourceType: 'product'
    })
    if (response && response.code === 200) {
      reviews.value = response.data || []
    }
  } catch (error) {
    console.error('获取产品评论失败:', error)
  }
}

/**
 * 加入购物车
 */
const addToCart = () => {
  ElMessage.success('已加入购物车')
}

/**
 * 立即购买
 */
const buyNow = () => {
  ElMessage.info('跳转到购买页面')
}

/**
 * 添加到收藏
 */
const addToFavorites = () => {
  ElMessage.success('已添加到收藏')
}

/**
 * 分享产品
 */
const shareProduct = () => {
  ElMessage.info('分享功能开发中')
}

/**
 * 返回产品列表
 */
const goToProducts = () => {
  router.push('/products')
}

// 监听路由变化
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchProduct(newId)
    }
  }
)

// 生命周期
onMounted(() => {
  const productId = route.params.id
  if (productId) {
    fetchProduct(productId)
  }
  fetchCategories()
})
</script>

<style src="@/assets/productDetail.css" scoped></style>