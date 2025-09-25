<script setup>
// App.vue 作为根组件，只需要传递路由视图
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'

// 初始化主题系统
const { getCurrentTheme } = useTheme()

onMounted(() => {
  // 确保主题正确应用
  const currentTheme = getCurrentTheme()
  document.documentElement.setAttribute('data-theme', currentTheme)
})
</script>

<template>
  <!-- 路由视图，由路由配置决定加载哪个布局 -->
  <router-view />
</template>

<style>
/* Element Plus 主题变量自定义 - 使用 CSS 变量 */
:root {
  --el-color-primary: var(--primary-color);
  --el-color-success: var(--success-color);
  --el-color-warning: var(--warning-color);
  --el-color-danger: var(--danger-color);
  --el-color-info: var(--info-color);
  
  --el-bg-color: var(--bg-color);
  --el-bg-color-page: var(--bg-color-page);
  --el-bg-color-overlay: var(--bg-color-overlay);
  
  --el-text-color-primary: var(--text-color-primary);
  --el-text-color-regular: var(--text-color-regular);
  --el-text-color-secondary: var(--text-color-secondary);
  --el-text-color-placeholder: var(--text-color-placeholder);
  --el-text-color-disabled: var(--text-color-disabled);
  
  --el-border-color: var(--border-color);
  --el-border-color-light: var(--border-color-light);
  --el-border-color-lighter: var(--border-color-lighter);
  --el-border-color-extra-light: var(--border-color-extra-light);
  
  --el-box-shadow: var(--box-shadow-base);
  --el-box-shadow-light: var(--box-shadow-light);
  --el-box-shadow-dark: var(--box-shadow-dark);
  
  --el-border-radius-base: var(--border-radius-base);
  --el-border-radius-small: var(--border-radius-small);
  --el-border-radius-round: var(--border-radius-round);
  --el-border-radius-circle: var(--border-radius-circle);
}

/* 暗黑主题下的 Element Plus 组件优化 */
[data-theme="dark"] {
  /* Element Plus 组件在暗黑主题下的优化 */
  .el-card {
    background-color: var(--bg-color);
    border-color: var(--border-color);
  }
  
  .el-menu {
    background-color: var(--bg-color);
    border-color: var(--border-color);
  }
  
  .el-menu-item {
    color: var(--text-color-regular);
  }
  
  .el-menu-item:hover {
    background-color: var(--primary-extra-light);
  }
  
  .el-input__wrapper {
    background-color: var(--bg-color);
    border-color: var(--border-color);
  }
  
  .el-button--default {
    background-color: var(--bg-color);
    border-color: var(--border-color);
    color: var(--text-color-primary);
  }
}
</style>