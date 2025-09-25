import { App, DirectiveBinding } from 'vue'
import { useAuthStore } from '@/stores/auth'

// 权限指令
export const permission = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const authStore = useAuthStore()
    const { value } = binding
    
    if (value && typeof value === 'string') {
      const hasPermission = authStore.hasPermission(value)
      
      // 如果没有权限，则隐藏元素
      if (!hasPermission) {
        el.style.display = 'none'
      }
    } else {
      throw new Error('权限指令需要一个字符串参数，例如 v-permission="\'user.edit\'"')
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const authStore = useAuthStore()
    const { value } = binding
    
    if (value && typeof value === 'string') {
      const hasPermission = authStore.hasPermission(value)
      
      // 如果没有权限，则隐藏元素
      if (!hasPermission) {
        el.style.display = 'none'
      } else {
        el.style.display = ''
      }
    }
  }
}

// 注册指令
export default {
  install(app: App) {
    app.directive('permission', permission)
  }
}