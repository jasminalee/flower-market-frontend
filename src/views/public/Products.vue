<template>
  <div class="products">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="container">
        <h1>花卉产品</h1>
        <p>发现我们精心挑选的优质花卉产品</p>
      </div>
    </div>

    <!-- 筛选和搜索区域 -->
    <div class="filters-section">
      <div class="container">
        <div class="filters-bar">
          <!-- 搜索框 -->
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

          <!-- 排序 -->
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

    <!-- 产品列表区域 -->
    <div class="products-section">
      <div class="container">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="8" animated />
        </div>

        <!-- 产品网格 -->
        <div v-else-if="filteredProducts.length > 0" class="products-grid">
          <div 
            v-for="product in paginatedProducts" 
            :key="product.id"
            class="product-card"
            @click="viewProduct(product)"
          >
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
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
                <span v-if="product.isNew" class="tag tag-new">新品</span>
                <span v-if="product.isHot" class="tag tag-hot">热销</span>
                <span v-if="product.discount" class="tag tag-discount">{{ product.discount }}折</span>
              </div>
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-category">
                <el-tag size="small">{{ getCategoryName(product.category) }}</el-tag>
              </div>
              <div class="product-rating">
                <el-rate v-model="product.rating" disabled show-score />
                <span class="sales-count">(已售{{ product.salesCount }})</span>
              </div>
              <div class="product-price">
                <span class="current-price">¥{{ product.price }}</span>
                <span v-if="product.originalPrice" class="original-price">
                  ¥{{ product.originalPrice }}
                </span>
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
          </div>
        </div>

        <!-- 无结果状态 -->
        <div v-else class="no-results">
          <el-empty description="没有找到相关产品">
            <el-button type="primary" @click="clearFilters">清除筛选条件</el-button>
          </el-empty>
        </div>

        <!-- 分页 -->
        <div v-if="filteredProducts.length > 0" class="pagination-container">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[12, 24, 48, 96]"
            :total="filteredProducts.length"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, View, ShoppingCart, Star } from '@element-plus/icons-vue'

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

// 模拟产品数据
const mockProducts = [
  {
    id: 1,
    name: '红玫瑰花束',
    description: '精选进口红玫瑰，象征热烈的爱情',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    salesCount: 1520,
    category: 'rose',
    image: '/src/assets/placeholders/rose.svg',
    isNew: false,
    isHot: true,
    discount: 7.5
  },
  {
    id: 2,
    name: '白玫瑰花束',
    description: '纯洁白玫瑰，表达纯真的爱意',
    price: 279,
    rating: 4.7,
    salesCount: 980,
    category: 'rose',
    image: '/src/assets/placeholders/rose.svg',
    isNew: true,
    isHot: false
  },
  {
    id: 3,
    name: '粉玫瑰花束',
    description: '浪漫粉玫瑰，传递温柔的情感',
    price: 259,
    originalPrice: 329,
    rating: 4.9,
    salesCount: 2100,
    category: 'rose',
    image: '/src/assets/placeholders/rose.svg',
    isNew: false,
    isHot: true,
    discount: 8
  },
  {
    id: 4,
    name: '白百合花束',
    description: '高雅百合，祝福美好与纯洁',
    price: 219,
    rating: 4.6,
    salesCount: 760,
    category: 'lily',
    image: '/src/assets/placeholders/lily.svg',
    isNew: false,
    isHot: false
  },
  {
    id: 5,
    name: '香水百合',
    description: '芳香怡人的香水百合',
    price: 359,
    rating: 4.8,
    salesCount: 1200,
    category: 'lily',
    image: '/src/assets/placeholders/lily.svg',
    isNew: true,
    isHot: true
  },
  {
    id: 6,
    name: '向日葵花束',
    description: '阳光向日葵，带来正能量与希望',
    price: 199,
    rating: 4.5,
    salesCount: 890,
    category: 'sunflower',
    image: '/src/assets/placeholders/sunflower.svg',
    isNew: false,
    isHot: false
  },
  {
    id: 7,
    name: '康乃馨花束',
    description: '温馨康乃馨，表达感恩与关爱',
    price: 179,
    originalPrice: 229,
    rating: 4.4,
    salesCount: 1100,
    category: 'carnation',
    image: '/src/assets/placeholders/carnation.svg',
    isNew: false,
    isHot: false,
    discount: 8
  },
  {
    id: 8,
    name: '彩色康乃馨',
    description: '缤纷色彩的康乃馨组合',
    price: 239,
    rating: 4.7,
    salesCount: 650,
    category: 'carnation',
    image: '/src/assets/placeholders/carnation.svg',
    isNew: true,
    isHot: false
  }
]

// 计算属性
const filteredProducts = computed(() => {
  let result = [...products.value]

  // 搜索筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  }

  // 分类筛选
  if (selectedCategory.value) {
    result = result.filter(product => product.category === selectedCategory.value)
  }

  // 价格筛选
  if (selectedPriceRange.value) {
    const [min, max] = selectedPriceRange.value.split('-').map(Number)
    if (selectedPriceRange.value === '500+') {
      result = result.filter(product => product.price >= 500)
    } else {
      result = result.filter(product => product.price >= min && product.price <= max)
    }
  }

  // 排序
  switch (sortBy.value) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating-desc':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
      result.sort((a, b) => b.isNew - a.isNew)
      break
    default:
      // 默认排序：热销商品在前
      result.sort((a, b) => b.isHot - a.isHot || b.salesCount - a.salesCount)
  }

  return result
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredProducts.value.slice(start, end)
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

const handleSearch = () => {
  currentPage.value = 1
}

const handleCategoryChange = () => {
  currentPage.value = 1
}

const handlePriceChange = () => {
  currentPage.value = 1
}

const handleSort = () => {
  currentPage.value = 1
}

const handleSizeChange = (newSize) => {
  pageSize.value = newSize
  currentPage.value = 1
}

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedPriceRange.value = ''
  sortBy.value = 'default'
  currentPage.value = 1
}

const viewProduct = (product) => {
  ElMessage.success(`查看产品：${product.name}`)
  // 这里可以跳转到产品详情页
}

const addToCart = (product) => {
  ElMessage.success(`已将 ${product.name} 加入购物车`)
}

const addToFavorites = (product) => {
  ElMessage.success(`已收藏 ${product.name}`)
}

// 生命周期
onMounted(async () => {
  // 模拟加载数据
  setTimeout(() => {
    products.value = mockProducts
    loading.value = false
  }, 1000)
})
</script>

<!-- 引入首页样式以使用统一的 product-card 样式 -->
<style src="@/assets/home.css"></style>
<!-- 引入产品页面专用样式 -->
<style src="@/assets/products.css"></style>