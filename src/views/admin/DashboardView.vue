<template>
  <div class="dashboard-view">
    <el-card class="welcome-card">
      <h3>欢迎回来，管理员！</h3>
      <p>今天是 {{ currentDate }}，祝您工作愉快！</p>
    </el-card>
    
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background-color: #409eff;">
              <el-icon><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">1,234</div>
              <div class="stat-label">用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background-color: #67c23a;">
              <el-icon><ShoppingBag /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">568</div>
              <div class="stat-label">商品总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background-color: #e6a23c;">
              <el-icon><Document /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">128</div>
              <div class="stat-label">订单总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background-color: #f56c6c;">
              <el-icon><TrendCharts /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">¥25,680</div>
              <div class="stat-label">今日销售额</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>销售趋势</span>
            </div>
          </template>
          <div class="chart-container">
            <div class="chart-placeholder">
              销售趋势图表
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="recent-card">
          <template #header>
            <div class="card-header">
              <span>最新订单</span>
            </div>
          </template>
          <el-table :data="recentOrders" style="width: 100%">
            <el-table-column prop="id" label="订单号" />
            <el-table-column prop="customer" label="客户" />
            <el-table-column prop="amount" label="金额" />
            <el-table-column prop="status" label="状态">
              <template #default="scope">
                <el-tag :type="getOrderStatusType(scope.row.status)">
                  {{ scope.row.status }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User, ShoppingBag, Document, TrendCharts } from '@element-plus/icons-vue'

// 当前日期
const currentDate = new Date().toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
})

// 最新订单数据
const recentOrders = ref([
  { id: 'ORD001', customer: '张三', amount: '¥299.00', status: '已发货' },
  { id: 'ORD002', customer: '李四', amount: '¥158.00', status: '待发货' },
  { id: 'ORD003', customer: '王五', amount: '¥450.00', status: '已完成' },
  { id: 'ORD004', customer: '赵六', amount: '¥89.00', status: '已取消' },
  { id: 'ORD005', customer: '钱七', amount: '¥320.00', status: '待付款' }
])

// 订单状态标签类型
const getOrderStatusType = (status: string) => {
  switch (status) {
    case '待付款': return 'info'
    case '待发货': return 'warning'
    case '已发货': return 'primary'
    case '已完成': return 'success'
    case '已取消': return 'danger'
    default: return 'info'
  }
}
</script>

<style scoped>
.dashboard-view {
  padding: 20px;
}

.welcome-card {
  margin-bottom: 20px;
}

.welcome-card h3 {
  margin: 0 0 10px 0;
}

.stats-row {
  margin-bottom: 20px;
}

.stat-card {
  border-radius: 8px;
  overflow: hidden;
}

.stat-content {
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.stat-icon .el-icon {
  font-size: 24px;
  color: white;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  color: #666;
  font-size: 14px;
}

.chart-card, .recent-card {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-placeholder {
  color: #999;
  font-size: 18px;
}
</style>