<template>
  <div class="dashboard">
    <!-- 欢迎区域 -->
    <div class="welcome-section">
      <div class="welcome-content">
        <div class="welcome-text">
          <h1>欢迎回来，{{ userInfo?.name || '管理员' }}！</h1>
          <p>今天是 {{ currentDate }}，祝您工作愉快</p>
        </div>
        <div class="welcome-image">
          <el-icon size="80" color="#409eff">
            <Sunny />
          </el-icon>
        </div>
      </div>
    </div>

    <!-- 统计卡片区域 -->
    <div class="stats-section">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :lg="6" v-for="stat in stats" :key="stat.key">
          <div class="stat-card" :style="{ borderLeft: `4px solid ${stat.color}` }">
            <div class="stat-content">
              <div class="stat-info">
                <div class="stat-title">{{ stat.title }}</div>
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-trend" :class="stat.trend">
                  <el-icon>
                    <component :is="stat.trend === 'up' ? 'TrendCharts' : 'Bottom'" />
                  </el-icon>
                  {{ stat.change }}
                </div>
              </div>
              <div class="stat-icon" :style="{ background: stat.color }">
                <el-icon size="24" color="white">
                  <component :is="stat.icon" />
                </el-icon>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 图表和快捷操作区域 -->
    <el-row :gutter="24" class="content-section">
      <!-- 销售趋势图 -->
      <el-col :xs="24" :lg="16">
        <el-card class="chart-card" header="销售趋势">
          <div class="chart-container" ref="salesChartRef">
            <!-- 这里本来应该是ECharts图表，暂时用占位内容 -->
            <div class="chart-placeholder">
              <el-icon size="60" color="#ddd">
                <TrendCharts />
              </el-icon>
              <p>销售趋势图表</p>
              <p class="chart-desc">显示最近30天的销售数据变化</p>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 快捷操作 -->
      <el-col :xs="24" :lg="8">
        <el-card header="快捷操作">
          <div class="quick-actions">
            <div 
              class="action-item" 
              v-for="action in quickActions" 
              :key="action.key"
              @click="handleQuickAction(action.key)"
            >
              <div class="action-icon" :style="{ background: action.color }">
                <el-icon size="20" color="white">
                  <component :is="action.icon" />
                </el-icon>
              </div>
              <div class="action-text">
                <div class="action-title">{{ action.title }}</div>
                <div class="action-desc">{{ action.description }}</div>
              </div>
              <el-icon class="action-arrow">
                <ArrowRight />
              </el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 最近活动和系统信息 -->
    <el-row :gutter="24" class="bottom-section">
      <!-- 最近活动 -->
      <el-col :xs="24" :lg="12">
        <el-card header="最近活动">
          <div class="activity-list">
            <div 
              class="activity-item" 
              v-for="activity in recentActivities" 
              :key="activity.id"
            >
              <div class="activity-icon" :style="{ background: activity.color }">
                <el-icon size="16" color="white">
                  <component :is="activity.icon" />
                </el-icon>
              </div>
              <div class="activity-content">
                <div class="activity-text">{{ activity.text }}</div>
                <div class="activity-time">{{ activity.time }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 系统信息 -->
      <el-col :xs="24" :lg="12">
        <el-card header="系统信息">
          <div class="system-info">
            <div class="info-item" v-for="info in systemInfo" :key="info.key">
              <span class="info-label">{{ info.label }}</span>
              <span class="info-value" :class="info.status">{{ info.value }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/config/store.js'
import { ElMessage } from 'element-plus'
import {
  Sunny, TrendCharts, Bottom, ArrowRight, User, Goods, 
  List, Setting, Plus, Edit, View, Delete
} from '@element-plus/icons-vue'

const router = useRouter()
const authStore = useAuthStore()

// 响应式数据
const currentDate = ref('')
const salesChartRef = ref()

// 计算属性
const userInfo = computed(() => authStore.user)

// 统计数据
const stats = ref([
  {
    key: 'users',
    title: '用户总数',
    value: '1,234',
    change: '+12%',
    trend: 'up',
    color: '#409eff',
    icon: 'User'
  },
  {
    key: 'products',
    title: '产品数量',
    value: '567',
    change: '+8%',
    trend: 'up',
    color: '#67c23a',
    icon: 'Goods'
  },
  {
    key: 'orders',
    title: '订单总数',
    value: '2,890',
    change: '+15%',
    trend: 'up',
    color: '#e6a23c',
    icon: 'List'
  },
  {
    key: 'revenue',
    title: '总收入',
    value: '¥89,012',
    change: '-3%',
    trend: 'down',
    color: '#f56c6c',
    icon: 'TrendCharts'
  }
])

// 快捷操作
const quickActions = ref([
  {
    key: 'add-user',
    title: '新增用户',
    description: '快速创建系统用户',
    color: '#409eff',
    icon: 'Plus'
  },
  {
    key: 'add-product',
    title: '新增产品',
    description: '添加新的花卉产品',
    color: '#67c23a',
    icon: 'Plus'
  },
  {
    key: 'view-orders',
    title: '查看订单',
    description: '管理所有订单信息',
    color: '#e6a23c',
    icon: 'View'
  },
  {
    key: 'system-settings',
    title: '系统设置',
    description: '配置系统参数',
    color: '#909399',
    icon: 'Setting'
  }
])

// 最近活动
const recentActivities = ref([
  {
    id: 1,
    text: '用户 张三 注册了新账户',
    time: '2分钟前',
    icon: 'User',
    color: '#409eff'
  },
  {
    id: 2,
    text: '产品 "红玫瑰花束" 被添加',
    time: '15分钟前',
    icon: 'Plus',
    color: '#67c23a'
  },
  {
    id: 3,
    text: '订单 #12345 状态更新为已发货',
    time: '1小时前',
    icon: 'Edit',
    color: '#e6a23c'
  },
  {
    id: 4,
    text: '系统进行了安全更新',
    time: '2小时前',
    icon: 'Setting',
    color: '#909399'
  },
  {
    id: 5,
    text: '角色权限配置已修改',
    time: '昨天',
    icon: 'Lock',
    color: '#f56c6c'
  }
])

// 系统信息
const systemInfo = ref([
  {
    key: 'version',
    label: '系统版本',
    value: 'v1.0.0',
    status: 'normal'
  },
  {
    key: 'uptime',
    label: '运行时间',
    value: '15天 8小时',
    status: 'normal'
  },
  {
    key: 'cpu',
    label: 'CPU使用率',
    value: '45%',
    status: 'normal'
  },
  {
    key: 'memory',
    label: '内存使用',
    value: '2.1GB / 8GB',
    status: 'normal'
  },
  {
    key: 'disk',
    label: '磁盘空间',
    value: '120GB / 500GB',
    status: 'normal'
  },
  {
    key: 'status',
    label: '系统状态',
    value: '正常运行',
    status: 'good'
  }
])

/**
 * 处理快捷操作
 */
const handleQuickAction = (actionKey) => {
  switch (actionKey) {
    case 'add-user':
      if (authStore.hasPermission('system:user:create')) {
        router.push('/admin/system/users')
        ElMessage.info('跳转到用户管理页面')
      } else {
        ElMessage.warning('您没有权限执行此操作')
      }
      break
    case 'add-product':
      ElMessage.info('产品管理功能开发中...')
      break
    case 'view-orders':
      ElMessage.info('订单管理功能开发中...')
      break
    case 'system-settings':
      ElMessage.info('系统设置功能开发中...')
      break
    default:
      ElMessage.info(`执行操作：${actionKey}`)
  }
}

/**
 * 初始化页面
 */
const initPage = () => {
  // 设置当前日期
  const now = new Date()
  currentDate.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
  
  // 这里可以加载真实的统计数据
  // loadDashboardData()
}

onMounted(() => {
  initPage()
})
</script>

<style scoped>
.dashboard {
  padding: 0;
}

/* 欢迎区域 */
.welcome-section {
  background: var(--gradient-primary);
  color: white;
  padding: 32px;
  border-radius: var(--card-border-radius);
  margin-bottom: var(--spacing-large);
}

.welcome-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.welcome-text h1 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: var(--spacing-small);
}

.welcome-text p {
  opacity: 0.9;
  font-size: 1rem;
}

/* 统计卡片 */
.stats-section {
  margin-bottom: var(--spacing-large);
}

/* 内容区域 */
.content-section {
  margin-bottom: var(--spacing-large);
}

.chart-card {
  height: 400px;
}

.chart-container {
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-placeholder {
  text-align: center;
  color: var(--text-color-placeholder);
}

.chart-placeholder p {
  margin: var(--spacing-small) 0;
}

.chart-desc {
  font-size: var(--font-size-small);
  color: var(--text-color-disabled);
}

/* 底部区域 */
.bottom-section {
  margin-bottom: var(--spacing-large);
}

/* 系统信息 */
.system-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-medium);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-small) 0;
}

.info-label {
  font-size: var(--font-size-base);
  color: var(--text-color-regular);
}

.info-value {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--text-color-primary);
}

.info-value.good {
  color: var(--success-color);
}

.info-value.warning {
  color: var(--warning-color);
}

.info-value.danger {
  color: var(--danger-color);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .welcome-content {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-medium);
  }

  .welcome-text h1 {
    font-size: 1.5rem;
  }

  .chart-card {
    height: 300px;
  }

  .chart-container {
    height: 220px;
  }
}

@media (max-width: 480px) {
  .dashboard {
    padding: 0;
  }

  .welcome-section {
    padding: var(--spacing-large) var(--spacing-medium);
    margin: 0 calc(0px - var(--spacing-large)) var(--spacing-large) calc(0px - var(--spacing-large));
  }
}
</style>