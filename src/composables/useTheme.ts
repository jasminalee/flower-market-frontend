import { ref, watch } from 'vue'

// 主题类型定义
export type Theme = 'light' | 'dark'

// 主题状态
const theme = ref<Theme>('light')

// 从localStorage读取保存的主题
const savedTheme = localStorage.getItem('theme') as Theme
if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
  theme.value = savedTheme
}

// 应用主题到DOM
const applyTheme = (newTheme: Theme) => {
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
}

// 初始化应用主题
applyTheme(theme.value)

// 监听主题变化
watch(theme, (newTheme) => {
  applyTheme(newTheme)
}, { immediate: true })

// 切换主题
export const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// 设置指定主题
export const setTheme = (newTheme: Theme) => {
  theme.value = newTheme
}

// 获取当前主题
export const getCurrentTheme = () => theme.value

// 检查是否为暗黑主题
export const isDark = () => theme.value === 'dark'

// 响应式主题状态
export const useTheme = () => {
  return {
    theme: theme.value,
    isDark: isDark(),
    toggleTheme,
    setTheme,
    getCurrentTheme
  }
}

// 主题切换动画效果
export const themeTransition = () => {
  const css = document.createElement('style')
  css.type = 'text/css'
  css.appendChild(document.createTextNode(
    `* {
      transition: 
        background-color 0.3s ease,
        color 0.3s ease,
        border-color 0.3s ease,
        box-shadow 0.3s ease !important;
    }`
  ))
  document.head.appendChild(css)
  
  // 动画完成后移除过渡样式
  setTimeout(() => {
    document.head.removeChild(css)
  }, 300)
}

// 检测系统主题偏好
export const detectSystemTheme = (): Theme => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

// 监听系统主题变化
export const watchSystemTheme = (callback: (theme: Theme) => void) => {
  if (!window.matchMedia) return

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  
  const handleChange = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light')
  }

  mediaQuery.addEventListener('change', handleChange)
  
  // 返回清理函数
  return () => {
    mediaQuery.removeEventListener('change', handleChange)
  }
}

// 自动跟随系统主题
export const followSystemTheme = () => {
  const systemTheme = detectSystemTheme()
  setTheme(systemTheme)
  
  return watchSystemTheme((newTheme) => {
    setTheme(newTheme)
  })
}

export default {
  theme,
  toggleTheme,
  setTheme,
  getCurrentTheme,
  isDark,
  useTheme,
  themeTransition,
  detectSystemTheme,
  watchSystemTheme,
  followSystemTheme
}