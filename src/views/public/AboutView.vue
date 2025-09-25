<template>
  <div class="about-view">
    <el-card class="about-card">
      <template #header>
        <h2>关于我们</h2>
      </template>
      <div class="about-content">
        <p>
          花卉市场是一个专业的花卉交易平台，致力于为用户提供优质的花卉产品和贴心的服务。
          我们拥有丰富的花卉品种，从经典的玫瑰、百合到稀有的进口花卉，应有尽有。
        </p>
        
        <p>
          我们的团队由专业的园艺师和花艺师组成，确保每一朵花都经过精心挑选和处理。
          无论是日常装饰、节日庆祝还是商务活动，我们都能为您提供最合适的花卉解决方案。
        </p>
        
        <div class="stats">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="stat-item">
                <div class="stat-number">1000+</div>
                <div class="stat-label">花卉品种</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="stat-item">
                <div class="stat-number">5000+</div>
                <div class="stat-label">满意客户</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="stat-item">
                <div class="stat-number">50+</div>
                <div class="stat-label">专业花艺师</div>
              </div>
            </el-col>
          </el-row>
        </div>
        
        <h3>我们的优势</h3>
        <ul>
          <li>新鲜直达：与各地花卉基地直接合作，保证鲜花新鲜度</li>
          <li>品质保证：严格的质量控制体系，确保每一朵花都符合标准</li>
          <li>快速配送：全国范围内快速配送，支持定时送达</li>
          <li>专业服务：提供花艺设计、活动布置等专业服务</li>
          <li>售后保障：完善的售后服务体系，让您购物无忧</li>
        </ul>
      </div>
    </el-card>
    
    <el-card class="contact-card">
      <template #header>
        <h2>联系我们</h2>
      </template>
      <div class="contact-info">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="contact-item">
              <el-icon><Location /></el-icon>
              <div>
                <h4>地址</h4>
                <p>北京市朝阳区花卉大街123号</p>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="contact-item">
              <el-icon><Phone /></el-icon>
              <div>
                <h4>电话</h4>
                <p>400-123-4567</p>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="contact-item">
              <el-icon><Message /></el-icon>
              <div>
                <h4>邮箱</h4>
                <p>info@flowermarket.com</p>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="contact-item">
              <el-icon><Clock /></el-icon>
              <div>
                <h4>营业时间</h4>
                <p>每天 9:00 - 21:00</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Location, Phone, Message, Clock } from '@element-plus/icons-vue'
</script>

<style scoped>
.about-view {
  padding: 20px 0;
}

.about-card, .contact-card {
  margin-bottom: 20px;
}

.about-content p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 15px;
}

.stats {
  margin: 30px 0;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #409eff;
}

.stat-label {
  font-size: 1rem;
  color: #666;
}

.about-content h3 {
  margin: 25px 0 15px 0;
}

.about-content ul {
  padding-left: 20px;
}

.about-content li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.contact-item .el-icon {
  font-size: 24px;
  color: #409eff;
  margin-right: 15px;
  margin-top: 3px;
}

.contact-item h4 {
  margin: 0 0 5px 0;
}

.contact-item p {
  margin: 0;
}
</style>