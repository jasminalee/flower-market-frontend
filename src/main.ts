import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import { useThemeStore } from './stores/theme'
import { useAuthStore } from './stores/auth'
import PermissionDirective from './directives/permission'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

// 初始化主题
const themeStore = useThemeStore()
themeStore.initTheme()

// 初始化认证状态
const authStore = useAuthStore()
authStore.initAuth()

app.use(router)
app.use(ElementPlus)
app.use(PermissionDirective)

app.mount('#app')