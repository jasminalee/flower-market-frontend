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
        
        <div class="product-grid">
          <el-card 
            v-for="product in featuredProducts" 
            :key="product.id"
            class="product-card"
            @click="viewProduct(product)"
            :body-style="{ padding: '0' }"
            shadow="hover"
          >
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
              <div class="product-overlay">
                <el-button type="primary" circle>
                  <el-icon><View /></el-icon>
                </el-button>
              </div>
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-price">
                <span class="current-price">¥{{ product.price }}</span>
                <span v-if="product.originalPrice" class="original-price">
                  ¥{{ product.originalPrice }}
                </span>
              </div>
              <div class="product-rating">
                <el-rate v-model="product.rating" disabled show-score />
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { 
  View, ArrowRight
} from '@element-plus/icons-vue'

// 引入样式文件
import '@/assets/home.css'

// import local images to avoid external network requests
import roseImg from '@/assets/placeholders/rose.svg'
import sunflowerImg from '@/assets/placeholders/sunflower.svg'
import lilyImg from '@/assets/placeholders/lily.svg'
import carnationImg from '@/assets/placeholders/carnation.svg'

const router = useRouter()

// 特色产品数据
const featuredProducts = ref([
  {
    id: 1,
    name: '玫瑰花束',
    description: '精选红玫瑰，表达浓情蜜意',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    image: roseImg
  },
  {
    id: 2,
    name: '向日葵花束',
    description: '阳光向日葵，传递正能量',
    price: 199,
    rating: 4.9,
    image: sunflowerImg
  },
  {
    id: 3,
    name: '百合花束',
    description: '纯洁百合，祝福美好',
    price: 259,
    rating: 4.7,
    image: lilyImg
  },
  {
    id: 4,
    name: '康乃馨花束',
    description: '温馨康乃馨，感恩母爱',
    price: 179,
    originalPrice: 229,
    rating: 4.6,
    image: carnationImg
  }
])

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
 * 跳转到产品页面
 */
const goToProducts = () => {
  router.push('/products')
}

/**
 * 查看产品详情
 */
const viewProduct = (product) => {
  ElMessage.success(`查看产品：${product.name}`)
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
</script>