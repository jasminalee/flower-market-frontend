<template>
  <el-page-header class="page-header" title="商户管理">
    <template #content>
      商户管理仪表板
    </template>
  </el-page-header>

  <el-row :gutter="20" class="stat-cards">
    <el-col :span="6">
      <el-card class="stat-card">
        <div class="stat-content">
          <div class="stat-info">
            <div class="stat-title">上架产品</div>
            <div class="stat-value">{{ stats.onShelfProducts }}</div>
          </div>
          <div class="stat-icon" style="background-color: #ecf5ff;">
            <el-icon color="#409eff" size="24"><Goods /></el-icon>
          </div>
        </div>
      </el-card>
    </el-col>
    
    <el-col :span="6">
      <el-card class="stat-card">
        <div class="stat-content">
          <div class="stat-info">
            <div class="stat-title">总销售额</div>
            <div class="stat-value">¥{{ stats.totalSales }}</div>
          </div>
          <div class="stat-icon" style="background-color: #f0f9ff;">
            <el-icon color="#67c23a" size="24"><Coin /></el-icon>
          </div>
        </div>
      </el-card>
    </el-col>
    
    <el-col :span="6">
      <el-card class="stat-card">
        <div class="stat-content">
          <div class="stat-info">
            <div class="stat-title">待处理订单</div>
            <div class="stat-value">{{ stats.pendingOrders }}</div>
          </div>
          <div class="stat-icon" style="background-color: #fdf6ec;">
            <el-icon color="#e6a23c" size="24"><Document /></el-icon>
          </div>
        </div>
      </el-card>
    </el-col>
    
    <el-col :span="6">
      <el-card class="stat-card">
        <div class="stat-content">
          <div class="stat-info">
            <div class="stat-title">新评论</div>
            <div class="stat-value">{{ stats.newComments }}</div>
          </div>
          <div class="stat-icon" style="background-color: #f4f4f5;">
            <el-icon color="#909399" size="24"><ChatLineRound /></el-icon>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-row :gutter="20" style="margin-top: 20px;">
    <el-col :span="16">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>最近销售趋势</span>
          </div>
        </template>
        <div ref="salesChartRef" style="height: 300px;"></div>
      </el-card>
    </el-col>
    
    <el-col :span="8">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>热门产品</span>
          </div>
        </template>
        <el-table :data="hotProducts" style="width: 100%">
          <el-table-column prop="productName" label="产品名称" />
          <el-table-column prop="sales" label="销量" width="80" />
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { Goods, Coin, Document, ChatLineRound } from '@element-plus/icons-vue'

// 响应式数据
const salesChartRef = ref()
const salesChart = ref(null)

// 统计数据
const stats = ref({
  onShelfProducts: 24,
  totalSales: 12800,
  pendingOrders: 5,
  newComments: 12
})

// 热门产品数据
const hotProducts = ref([
  { productName: '红玫瑰花束', sales: 128 },
  { productName: '白百合花束', sales: 96 },
  { productName: '向日葵花束', sales: 85 },
  { productName: '康乃馨花束', sales: 72 },
  { productName: '满天星花束', sales: 63 }
])

/**
 * 初始化销售图表
 */
const initSalesChart = () => {
  if (salesChartRef.value) {
    salesChart.value = echarts.init(salesChartRef.value)
    
    const option = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'line',
          smooth: true,
          itemStyle: { color: '#409eff' },
          areaStyle: { color: 'rgba(64, 158, 255, 0.1)' }
        }
      ]
    }
    
    salesChart.value.setOption(option)
  }
}

/**
 * 窗口大小改变时重置图表
 */
const handleResize = () => {
  if (salesChart.value) {
    salesChart.value.resize()
  }
}

// 生命周期
onMounted(() => {
  initSalesChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (salesChart.value) {
    salesChart.value.dispose()
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.stat-cards {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-card {
  background: var(--bg-color);
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  box-shadow: var(--card-shadow);
  height: 120px;
  transition: var(--transition-transform), var(--transition-box-shadow);
  border: 1px solid var(--border-color-extra-light);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--card-shadow-hover);
}

.stat-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.stat-info {
  flex: 1;
}

.stat-title {
  font-size: var(--font-size-base);
  color: var(--text-color-regular);
  margin-bottom: var(--spacing-small);
}

.stat-value {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-color-primary);
  margin-bottom: var(--spacing-mini);
}
</style>