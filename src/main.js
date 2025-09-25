// 引入全局样式
import './assets/variables.css'
import './assets/main.css'
import './assets/global.css'
// 公共 UI 辅助样式（按钮、表格、card、avatar 等）
import '@/assets/ui.css'

// 引入主题系统
import './composables/useTheme'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// @ts-ignore
import App from './App.vue'
import router from './config/router.js'

const app = createApp(App)
const pinia = createPinia()

// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
