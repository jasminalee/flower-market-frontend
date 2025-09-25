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
/* 已移除 Element Plus 主题变量和组件样式优化 */
</style>