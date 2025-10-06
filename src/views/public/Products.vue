<template>
  <div class="page-header">
    <div class="page-header-content">
      <h1>花卉产品</h1>
      <p>发现我们精心挑选的优质花卉产品</p>
    </div>
  </div>

  <!-- 筛选和搜索区域 -->
  <div class="filters-section">
    <div class="container">
      <div class="filters-bar">
        <!-- 搜索框区域 -->
        <div class="filters-left">
          <div class="search-group">
            <div class="search-box">
              <el-input
                v-model="searchQuery"
                placeholder="搜索花卉产品..."
                @input="handleSearch"
                clearable
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
            </div>
          </div>

          <!-- 分类筛选 -->
          <div class="filter-group">
            <span class="filter-label">分类：</span>
            <el-radio-group v-model="selectedCategory" @change="handleCategoryChange">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="rose">玫瑰</el-radio-button>
              <el-radio-button label="lily">百合</el-radio-button>
              <el-radio-button label="sunflower">向日葵</el-radio-button>
              <el-radio-button label="carnation">康乃馨</el-radio-button>
            </el-radio-group>
          </div>

          <!-- 价格筛选 -->
          <div class="filter-group">
            <span class="filter-label">价格：</span>
            <el-radio-group v-model="selectedPriceRange" @change="handlePriceChange">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="0-100">¥0-100</el-radio-button>
              <el-radio-button label="100-300">¥100-300</el-radio-button>
              <el-radio-button label="300-500">¥300-500</el-radio-button>
              <el-radio-button label="500+">¥500+</el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <!-- 排序区域 -->
        <div class="filters-right">
          <div class="filter-group">
            <span class="filter-label">排序：</span>
            <el-select v-model="sortBy" placeholder="选择排序方式" @change="handleSort">
              <el-option label="默认" value="default" />
              <el-option label="价格从低到高" value="price-asc" />
              <el-option label="价格从高到低" value="price-desc" />
              <el-option label="评分最高" value="rating-desc" />
              <el-option label="最新上架" value="newest" />
            </el-select>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 产品列表区域 -->
  <div class="products-section">
    <div class="container">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="8" animated />
      </div>

      <!-- 产品网格 -->
      <div v-else-if="products.length > 0">
        <el-row :gutter="20" class="products-grid">
          <el-col 
            v-for="product in products" 
            :key="product.id"
            :xs="24"
            :sm="12"
            :md="6"
            :lg="6"
            :xl="4"
          >
            <el-card
              class="product-card"
              @click="viewProduct(product)"
              :body-style="{ padding: '0' }"
              shadow="hover"
            >
              <div class="product-image-container">
                <el-image 
                  :src="product.mainImage" 
                  :alt="product.productName"
                  fit="cover"
                  class="product-image"
                  lazy
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
                <div class="product-overlay">
                  <el-button type="primary" circle>
                    <el-icon><View /></el-icon>
                  </el-button>
                  <el-button type="success" circle>
                    <el-icon><ShoppingCart /></el-icon>
                  </el-button>
                </div>
                <!-- 标签 -->
                <div class="product-tags">
                  <el-tag v-if="product.isNew" type="success" size="small">新品</el-tag>
                  <el-tag v-if="product.isHot" type="danger" size="small">热销</el-tag>
                  <el-tag v-if="product.discount" type="warning" size="small">{{ product.discount }}折</el-tag>
                </div>
              </div>
              <div class="product-info">
                <div class="product-header">
                  <h3 class="product-title">{{ product.productName }}</h3>
                  <div class="product-category">
                    <el-tag size="small">{{ getCategoryName(getCategoryKey(product.categoryId)) }}</el-tag>
                  </div>
                </div>
                <p class="product-description">{{ product.description }}</p>
                <div class="product-price-section">
                  <div class="product-price">
                    <span class="current-price">¥{{ product.price || 0 }}</span>
                  </div>
                  <div class="product-meta">
                    <div class="product-rating">
                      <el-rate v-model="product.rating" disabled show-score />
                    </div>
                    <div class="sales-count">(已售{{ product.salesCount }})</div>
                  </div>
                </div>
                <div class="product-actions">
                  <el-button type="primary" size="small" @click.stop="addToCart(product)">
                    <el-icon><ShoppingCart /></el-icon>
                    加入购物车
                  </el-button>
                  <el-button size="small" @click.stop="addToFavorites(product)">
                    <el-icon><Star /></el-icon>
                    收藏
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 无结果状态 -->
      <div v-else class="no-results">
        <el-empty description="没有找到相关产品">
          <el-button type="primary" @click="clearFilters">清除筛选条件</el-button>
        </el-empty>
      </div>

      <!-- 分页 -->
      <div v-if="products.length > 0" class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[12, 24, 48, 96]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, View, ShoppingCart, Star, Picture } from '@element-plus/icons-vue'
import productApi from '@/api/product'

// 响应式数据
const loading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedPriceRange = ref('')
const sortBy = ref('default')
const currentPage = ref(1)
const pageSize = ref(12)

// 产品数据
const products = ref([])
const total = ref(0)

// 计算属性
const filteredProducts = computed(() => {
  // 由于我们直接从API获取数据，这里不再需要前端过滤
  return products.value
})

const paginatedProducts = computed(() => {
  // 由于我们直接从API获取分页数据，这里直接返回产品数据
  return filteredProducts.value
})

// 方法
const getCategoryName = (category) => {
  const categoryMap = {
    rose: '玫瑰',
    lily: '百合',
    sunflower: '向日葵',
    carnation: '康乃馨'
  }
  return categoryMap[category] || '其他'
}

// 根据分类ID获取分类键名
const getCategoryKey = (categoryId) => {
  const categoryKeyMap = {
    1: 'rose',
    2: 'lily',
    3: 'sunflower',
    4: 'carnation'
  }
  return categoryKeyMap[categoryId] || 'other'
}

const handleSearch = () => {
  currentPage.value = 1
  fetchProducts()
}

const handleCategoryChange = () => {
  currentPage.value = 1
  fetchProducts()
}

const handlePriceChange = () => {
  currentPage.value = 1
  fetchProducts()
}

const handleSort = () => {
  currentPage.value = 1
  fetchProducts()
}

const handleSizeChange = (newSize) => {
  pageSize.value = newSize
  currentPage.value = 1
  fetchProducts()
}

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
  fetchProducts()
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedPriceRange.value = ''
  sortBy.value = 'default'
  currentPage.value = 1
  fetchProducts()
}

const viewProduct = (product) => {
  ElMessage.success(`查看产品：${product.productName}`)
  // 这里可以跳转到产品详情页
}

const addToCart = (product) => {
  ElMessage.success(`已将 ${product.productName} 加入购物车`)
}

const addToFavorites = (product) => {
  ElMessage.success(`已收藏 ${product.productName}`)
}

const goToCart = () => {
  ElMessage.info('跳转到购物车页面')
  // 这里可以跳转到购物车页面
}

/**
 * 获取产品数据
 */
const fetchProducts = async () => {
  try {
    loading.value = true
    
    // 构建请求参数
    const params = {
      current: currentPage.value,
      size: pageSize.value
    }
    
    // 添加搜索关键字
    if (searchQuery.value) {
      params.keyword = searchQuery.value
    }
    
    // 添加分类筛选
    if (selectedCategory.value) {
      // 这里需要根据实际的分类ID进行映射
      params.categoryId = getCategoryId(selectedCategory.value)
    }
    
    // 调用API获取产品数据
    const response = await productApi.homepage(params)
    
    if (response.code === 200) {
      // 从API响应中提取产品数据
      products.value = response.data.records
      total.value = response.data.total
      
      // 为每个产品添加模拟的销售数量和评分（实际应用中应从API获取）
      products.value.forEach(product => {
        product.salesCount = Math.floor(Math.random() * 2000) + 500
        product.rating = (Math.random() * 4 + 1).toFixed(1) // 1-5之间的评分
        product.isNew = Math.random() > 0.7
        product.isHot = Math.random() > 0.5
        if (Math.random() > 0.8) {
          product.discount = Math.floor(Math.random() * 5) + 5 // 5-9折
        }
        // 添加价格字段（实际应从SKU中获取最低价格）
        product.price = Math.floor(Math.random() * 300) + 100
      })
    } else {
      ElMessage.error(response.message || '获取产品数据失败')
    }
  } catch (error) {
    console.error('获取产品数据失败:', error)
    ElMessage.error('获取产品数据失败')
  } finally {
    loading.value = false
  }
}

/**
 * 根据分类名称获取分类ID
 */
const getCategoryId = (categoryName) => {
  // 这里需要根据实际的分类映射关系进行调整
  const categoryMap = {
    rose: 1,
    lily: 2,
    sunflower: 3,
    carnation: 4
  }
  return categoryMap[categoryName] || null
}

// 生命周期
onMounted(() => {
  fetchProducts()
})
</script>

<!-- 引入产品页面专用样式 -->
<style src="@/assets/publicProducts.css"></style>