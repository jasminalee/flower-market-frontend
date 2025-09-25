<template>
  <div class="home-view">
    <!-- 首页横幅区域 -->
    <section class="hero-section">
      <h1>欢迎来到花卉市场</h1>
      <p>精选优质鲜花，为您传递美好情感</p>
      <el-button type="primary" size="large" @click="browseProducts">
        浏览花卉
      </el-button>
    </section>

    <!-- 特色花卉推荐 -->
    <section class="featured-products">
      <h2>特色花卉推荐</h2>
      <div class="product-grid">
        <el-card 
          v-for="product in featuredProducts" 
          :key="product.id" 
          class="product-card"
          shadow="hover"
        >
          <img :src="product.image" :alt="product.name" class="product-image" />
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-price">¥{{ product.price }}</div>
            <el-button type="primary" @click="addToCart(product)">
              加入购物车
            </el-button>
          </div>
        </el-card>
      </div>
    </section>

    <!-- 服务特色 -->
    <section class="features">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="feature-item">
            <el-icon size="40"><Ship /></el-icon>
            <h3>快速配送</h3>
            <p>全国范围内快速配送，保证鲜花新鲜</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="feature-item">
            <el-icon size="40"><Medal /></el-icon>
            <h3>品质保证</h3>
            <p>严格筛选供应商，确保花卉品质</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="feature-item">
            <el-icon size="40"><Service /></el-icon>
            <h3>贴心服务</h3>
            <p>专业花艺师提供定制服务</p>
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Ship, Medal, Service } from '@element-plus/icons-vue'

// 模拟产品数据
const featuredProducts = ref([
  {
    id: 1,
    name: '红玫瑰',
    description: '经典爱情之花，表达热烈爱意',
    price: 99,
    image: 'https://images.unsplash.com/photo-1518661394241-0d2da51ad4ae?w=300&h=200&fit=crop'
  },
  {
    id: 2,
    name: '白百合',
    description: '纯洁高雅，象征百年好合',
    price: 128,
    image: 'https://images.unsplash.com/photo-1518661394241-0d2da51ad4ae?w=300&h=200&fit=crop'
  },
  {
    id: 3,
    name: '康乃馨',
    description: '温馨母爱，感恩之情',
    price: 68,
    image: 'https://images.unsplash.com/photo-1518661394241-0d2da51ad4ae?w=300&h=200&fit=crop'
  },
  {
    id: 4,
    name: '向日葵',
    description: '积极阳光，追逐梦想',
    price: 88,
    image: 'https://images.unsplash.com/photo-1518661394241-0d2da51ad4ae?w=300&h=200&fit=crop'
  }
])

const router = useRouter()

const browseProducts = () => {
  // 这里可以跳转到产品列表页面
  console.log('浏览产品')
}

const addToCart = (product: any) => {
  // 添加到购物车逻辑
  console.log('添加到购物车:', product.name)
}
</script>

<style scoped>
.home-view {
  padding: 20px 0;
}

.hero-section {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  margin-bottom: 40px;
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.featured-products h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  color: #333;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.product-card {
  border-radius: 8px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

.product-info h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
}

.product-description {
  color: #666;
  margin-bottom: 10px;
  min-height: 40px;
}

.product-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #e64545;
  margin: 10px 0;
}

.features {
  margin-top: 40px;
}

.feature-item {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.3s;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-item h3 {
  margin: 15px 0 10px 0;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 15px;
  }
  
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  
  .features {
    margin-top: 20px;
  }
}
</style>