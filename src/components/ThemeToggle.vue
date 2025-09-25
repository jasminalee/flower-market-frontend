<template>
  <div class="theme-toggle">
    <!-- 简单按钮模式 -->
    <el-button 
      v-if="mode === 'button'"
      :type="isDark ? 'warning' : 'primary'"
      :icon="isDark ? Sunny : Moon"
      @click="handleToggle"
      :title="isDark ? '切换到白天模式' : '切换到夜间模式'"
    >
      {{ buttonText }}
    </el-button>

    <!-- 开关模式 -->
    <div v-else-if="mode === 'switch'" class="theme-switch">
      <el-icon class="theme-icon">
        <Sunny />
      </el-icon>
      <el-switch
        v-model="isDark"
        @change="handleToggle"
        :active-text="showText ? '夜间' : ''"
        :inactive-text="showText ? '白天' : ''"
        active-color="#1f2937"
        inactive-color="#fbbf24"
      />
      <el-icon class="theme-icon">
        <Moon />
      </el-icon>
    </div>

    <!-- 图标按钮模式 -->
    <el-button 
      v-else-if="mode === 'icon'"
      type="text"
      :icon="isDark ? Sunny : Moon"
      @click="handleToggle"
      class="theme-icon-btn"
      :title="isDark ? '切换到白天模式' : '切换到夜间模式'"
    />

    <!-- 下拉选择模式 -->
    <el-select 
      v-else-if="mode === 'select'"
      v-model="currentTheme"
      @change="handleThemeChange"
      class="theme-select"
      placeholder="选择主题"
    >
      <el-option
        v-for="option in themeOptions"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      >
        <div class="theme-option">
          <el-icon>
            <component :is="option.icon" />
          </el-icon>
          <span>{{ option.label }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElButton, ElSwitch, ElSelect, ElOption, ElIcon } from 'element-plus'
import { Sunny, Moon, Monitor } from '@element-plus/icons-vue'
import { useTheme, toggleTheme, setTheme, type Theme } from '../composables/useTheme'

// 组件属性
interface Props {
  mode?: 'button' | 'switch' | 'icon' | 'select'
  showText?: boolean
  size?: 'large' | 'default' | 'small'
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'button',
  showText: true,
  size: 'default'
})

// 主题状态
const { theme, isDark } = useTheme()
const currentTheme = ref<Theme | 'system'>(theme)

// 计算属性
const buttonText = computed(() => {
  if (!props.showText) return ''
  return isDark.value ? '🌞 白天模式' : '🌙 夜间模式'
})

// 主题选项
const themeOptions = [
  {
    value: 'light',
    label: '白天模式',
    icon: Sunny
  },
  {
    value: 'dark', 
    label: '夜间模式',
    icon: Moon
  },
  {
    value: 'system',
    label: '跟随系统',
    icon: Monitor
  }
]

// 方法
const handleToggle = () => {
  toggleTheme()
  // 添加切换动画效果
  addToggleAnimation()
}

const handleThemeChange = (value: Theme | 'system') => {
  if (value === 'system') {
    // 跟随系统主题
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setTheme(systemTheme)
    
    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }
    mediaQuery.addEventListener('change', handleSystemChange)
  } else {
    setTheme(value as Theme)
  }
}

// 切换动画效果
const addToggleAnimation = () => {
  const body = document.body
  body.style.transition = 'background-color 0.3s ease, color 0.3s ease'
  
  setTimeout(() => {
    body.style.transition = ''
  }, 300)
}

// 发射事件
const emit = defineEmits<{
  change: [theme: Theme]
}>()

// 监听主题变化并发射事件
const handleThemeChangeEvent = (newTheme: Theme) => {
  emit('change', newTheme)
}
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
}

.theme-switch {
  display: flex;
  align-items: center;
  gap: 8px;
}

.theme-icon {
  color: var(--text-color-regular);
  font-size: 16px;
}

.theme-icon-btn {
  font-size: 18px;
  color: var(--text-color-regular);
  transition: all 0.3s ease;
}

.theme-icon-btn:hover {
  color: var(--primary-color);
  transform: scale(1.1);
}

.theme-select {
  min-width: 120px;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 主题切换动画 */
.theme-toggle .el-button {
  transition: all 0.3s ease;
}

.theme-toggle .el-switch {
  --el-switch-on-color: #1f2937;
  --el-switch-off-color: #fbbf24;
}

/* 暗黑主题下的图标颜色调整 */
[data-theme="dark"] .theme-icon {
  color: var(--text-color-regular);
}

[data-theme="dark"] .theme-icon-btn {
  color: var(--text-color-regular);
}

[data-theme="dark"] .theme-icon-btn:hover {
  color: var(--primary-color);
}
</style>