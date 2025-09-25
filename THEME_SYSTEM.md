# 主题系统说明

## 🎨 主题系统特性

### 1. **全局样式管理**
- **CSS变量系统**: 使用 CSS 自定义属性统一管理颜色、尺寸、间距等设计令牌
- **模块化样式**: 样式文件分离，便于维护和扩展
- **响应式设计**: 内置多种屏幕尺寸的响应式布局

### 2. **主题切换功能**
- **白天/夜间模式**: 支持亮色和暗色两种主题
- **一键切换**: 提供多种切换方式（按钮、开关、下拉选择等）
- **状态持久化**: 主题选择自动保存到本地存储
- **平滑过渡**: 主题切换时的动画效果

### 3. **设计系统**
- **颜色系统**: 主色调、成功色、警告色、错误色、信息色
- **字体系统**: 多级字体大小和层级
- **间距系统**: 标准化的内外边距
- **阴影系统**: 统一的阴影效果

## 📁 文件结构

```
src/
├── styles/
│   ├── variables.css          # CSS 变量定义
│   ├── global.css            # 全局基础样式
│   └── pages/
│       └── home.css          # 页面特定样式
├── composables/
│   └── useTheme.ts           # 主题管理逻辑
├── components/
│   └── ThemeToggle.vue       # 主题切换组件
└── views/
    └── ThemeDemo.vue         # 主题演示页面
```

## 🚀 使用方法

### 1. 引入全局样式

在 `main.js` 中引入：

```javascript
// 引入全局样式系统
import './styles/variables.css'
import './styles/global.css'

// 引入主题系统
import './composables/useTheme'
```

### 2. 使用主题切换组件

```vue
<template>
  <!-- 按钮模式 -->
  <ThemeToggle mode="button" :show-text="true" />
  
  <!-- 开关模式 -->
  <ThemeToggle mode="switch" :show-text="true" />
  
  <!-- 图标模式 -->
  <ThemeToggle mode="icon" :show-text="false" />
  
  <!-- 下拉选择模式 -->
  <ThemeToggle mode="select" />
</template>

<script setup>
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>
```

### 3. 使用CSS变量

```css
.my-component {
  background-color: var(--bg-color);
  color: var(--text-color-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-base);
  padding: var(--spacing-medium);
  box-shadow: var(--box-shadow-light);
}
```

### 4. 使用工具类

```html
<!-- 背景色 -->
<div class="bg-primary">主色背景</div>
<div class="bg-white">白色背景</div>
<div class="bg-gradient-primary">渐变背景</div>

<!-- 文字颜色 -->
<p class="text-primary">主要文字</p>
<p class="text-regular">常规文字</p>
<p class="text-secondary">次要文字</p>

<!-- 间距 -->
<div class="p-large">大内边距</div>
<div class="m-auto">自动外边距</div>

<!-- 阴影和圆角 -->
<div class="shadow rounded">带阴影和圆角</div>
```

### 5. 独立样式文件

为页面创建独立的样式文件：

```css
/* src/styles/pages/my-page.css */
.my-page {
  background: var(--bg-color-page);
}

.my-page .header {
  background: var(--gradient-primary);
  color: white;
  padding: var(--spacing-large);
}
```

在组件中引入：

```vue
<script setup>
import '../../styles/pages/my-page.css'
</script>
```

## 🎯 CSS变量说明

### 颜色变量
```css
/* 主色调 */
--primary-color: #409eff;
--primary-light: #79bbff;
--primary-dark: #337ecc;

/* 状态色 */
--success-color: #67c23a;
--warning-color: #e6a23c;
--danger-color: #f56c6c;
--info-color: #909399;

/* 背景色 */
--bg-color: #ffffff;              /* 白天: 白色, 夜间: 深灰 */
--bg-color-page: #f5f7fa;         /* 页面背景 */

/* 文字色 */
--text-color-primary: #303133;    /* 主要文字 */
--text-color-regular: #606266;    /* 常规文字 */
--text-color-secondary: #909399;  /* 次要文字 */
```

### 尺寸变量
```css
/* 字体大小 */
--font-size-base: 14px;
--font-size-large: 18px;
--font-size-small: 12px;

/* 间距 */
--spacing-base: 12px;
--spacing-medium: 16px;
--spacing-large: 20px;

/* 圆角 */
--border-radius-base: 4px;
--border-radius-round: 20px;
```

## 🌙 主题切换API

### 基础API
```javascript
import { useTheme, toggleTheme, setTheme } from '@/composables/useTheme'

// 获取主题状态
const { theme, isDark } = useTheme()

// 切换主题
toggleTheme()

// 设置指定主题
setTheme('dark')  // 或 'light'
```

### 高级功能
```javascript
import { 
  detectSystemTheme,
  followSystemTheme,
  themeTransition 
} from '@/composables/useTheme'

// 检测系统主题
const systemTheme = detectSystemTheme()

// 跟随系统主题
const unwatch = followSystemTheme()

// 添加切换动画
themeTransition()
```

## 📱 响应式断点

```css
/* 手机端 */
@media (max-width: 768px) {
  .container {
    padding: 0 var(--container-padding-small);
  }
}

/* 平板和PC */
@media (min-width: 1200px) and (max-width: 1599px) {
  .container {
    max-width: var(--container-max-width);
  }
}

/* 大屏幕 */
@media (min-width: 1600px) {
  .container {
    max-width: var(--container-max-width-large);
    padding: 0 var(--container-padding-large);
  }
}
```


## 🛠️ 自定义主题

### 1. 修改CSS变量

在 `variables.css` 中修改现有变量或添加新变量：

```css
:root {
  --my-custom-color: #ff6b6b;
  --my-custom-spacing: 24px;
}

[data-theme="dark"] {
  --my-custom-color: #ff8e8e;
}
```

### 2. 添加新的工具类

在 `global.css` 中添加：

```css
.bg-custom {
  background-color: var(--my-custom-color);
}

.p-custom {
  padding: var(--my-custom-spacing);
}
```

### 3. 扩展主题系统

可以在 `useTheme.ts` 中添加更多主题选项或功能。

## 📝 最佳实践

1. **优先使用CSS变量**: 所有颜色、尺寸都应该使用CSS变量
2. **样式文件分离**: 页面特定样式使用独立文件
3. **响应式优先**: 设计时考虑不同屏幕尺寸
4. **主题适配**: 确保所有组件在两种主题下都有良好表现
5. **语义化命名**: 使用有意义的变量和类名

这个主题系统为花卉市场项目提供了完整的视觉设计解决方案，支持灵活的主题切换和响应式布局。