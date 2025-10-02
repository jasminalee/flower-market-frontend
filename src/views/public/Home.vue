<template>
  <div class="home">
    <!-- 英雄区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">精美花卉</span>
          <br>
          为您的生活增添色彩
        </h1>
        <p class="hero-subtitle">
          发现最优质的花卉产品，让每一天都充满芬芳与美丽
        </p>
        <div class="hero-actions">
          <el-button type="primary" size="large" @click="goToProducts">
            <el-icon><View /></el-icon>
            浏览产品
          </el-button>
          <el-button size="large" plain @click="learnMore">
            了解更多
          </el-button>
        </div>
      </div>
    </section>

    <!-- 特色产品区域 -->
    <section class="featured-section">
      <div class="container">
        <div class="section-header">
          <h2>特色花卉</h2>
          <p>精心挑选的优质花卉产品</p>
        </div>
        
        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="8" animated />
        </div>
        
        <!-- 产品网格 -->
        <div v-else class="product-grid">
          <el-card 
            v-for="product in featuredProducts" 
            :key="product.id"
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
              </div>
            </div>
            <div class="product-info">
              <div class="product-header">
                <h3 class="product-title">{{ product.productName }}</h3>
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
            </div>
          </el-card>
        </div>

        <div class="section-footer">
          <el-button type="primary" @click="goToProducts">
            查看全部产品
            <el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>
      </div>
    </section>

    <!-- 服务优势区域 -->
    <section class="advantages-section">
      <div class="container">
        <div class="section-header">
          <h2>为什么选择我们</h2>
          <p>专业的服务，优质的产品</p>
        </div>
        
        <div class="advantages-grid">
          <div 
            v-for="advantage in advantages" 
            :key="advantage.id"
            class="advantage-card"
          >
            <div class="advantage-icon">
              <span class="emoji-icon" :style="{ color: advantage.color }">
                {{ advantage.icon }}
              </span>
            </div>
            <h3>{{ advantage.title }}</h3>
            <p>{{ advantage.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 统计数据区域 -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-item">
            <div class="stat-number">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { 
  View, ArrowRight, Picture
} from '@element-plus/icons-vue'
import productApi from '@/api/product'

// 引入样式文件
import '@/assets/home.css'

const router = useRouter()

// 响应式数据
const loading = ref(true)
const featuredProducts = ref([])

// 服务优势数据
const advantages = ref([
  {
    id: 1,
    icon: '🚚',
    title: '快速配送',
    description: '24小时内送达，保证花卉新鲜',
    color: '#409eff'
  },
  {
    id: 2,
    icon: '✅',
    title: '品质保证',
    description: '严选优质花卉，品质有保障',
    color: '#67c23a'
  },
  {
    id: 3,
    icon: '🛠️',
    title: '专业服务',
    description: '专业团队，贴心服务体验',
    color: '#e6a23c'
  },
  {
    id: 4,
    icon: '⭐',
    title: '客户满意',
    description: '98%客户满意度，值得信赖',
    color: '#f56c6c'
  }
])

// 统计数据
const stats = ref([
  { value: '10000+', label: '满意客户' },
  { value: '50000+', label: '花卉销售' },
  { value: '99.8%', label: '好评率' },
  { value: '24h', label: '配送时间' }
])

/**
 * 获取特色产品数据
 */
const fetchFeaturedProducts = async () => {
  try {
    loading.value = true
    // 调用主页商品列表接口，获取前4个产品作为特色产品
    const response = await productApi.homepage({
      current: 1,
      size: 4
    })
    
    if (response.code === 200) {
      // 从API响应中提取产品数据
      featuredProducts.value = response.data.records.map(product => ({
        ...product,
        // 为产品卡片添加价格字段（可以从SKU中获取最低价，这里简化处理）
        price: 0 // 实际应用中应从SKU中获取价格
      }))
      
      // 为每个产品添加模拟的销售数量和评分（实际应用中应从API获取）
      featuredProducts.value.forEach(product => {
        // 简化处理，实际应从SKU中获取最低价格
        product.price = Math.floor(Math.random() * 300) + 100
        product.salesCount = Math.floor(Math.random() * 2000) + 500
        product.rating = (Math.random() * 4 + 1).toFixed(1) // 1-5之间的评分
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
 * 跳转到产品页面
 */
const goToProducts = () => {
  router.push('/products')
}

/**
 * 查看产品详情
 */
const viewProduct = (product) => {
  ElMessage.success(`查看产品：${product.productName}`)
  // 这里可以跳转到产品详情页
}

/**
 * 了解更多
 */
const learnMore = () => {
  // 滚动到优势区域
  const advantagesSection = document.querySelector('.advantages-section')
  if (advantagesSection) {
    advantagesSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// 生命周期
onMounted(() => {
  fetchFeaturedProducts()
})
</script>