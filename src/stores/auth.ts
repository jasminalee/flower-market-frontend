import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockUsers } from '@/services/mockData'

export const useAuthStore = defineStore('auth', () => {
  // 用户状态
  const user = ref<any>(null)
  const token = ref<string | null>(null)
  const permissions = ref<string[]>([])
  
  // 初始化认证状态
  const initAuth = () => {
    const savedToken = localStorage.getItem('authToken')
    if (savedToken) {
      token.value = savedToken
      // 在实际应用中，这里应该从后端获取用户信息和权限
      // 现在我们使用模拟数据
      user.value = mockUsers[0] // 默认使用管理员用户
      permissions.value = [
        'user.view',
        'user.edit',
        'user.delete',
        'role.view',
        'role.edit',
        'role.delete'
      ]
    }
  }
  
  // 登录
  const login = (userData: any, userToken: string) => {
    user.value = userData
    token.value = userToken
    localStorage.setItem('authToken', userToken)
    
    // 设置权限（在实际应用中应该从后端获取）
    if (userData.role === '管理员') {
      permissions.value = [
        'user.view',
        'user.edit',
        'user.delete',
        'role.view',
        'role.edit',
        'role.delete'
      ]
    } else if (userData.role === '运营人员') {
      permissions.value = [
        'user.view',
        'user.edit'
      ]
    } else {
      permissions.value = [
        'user.view'
      ]
    }
  }
  
  // 登出
  const logout = () => {
    user.value = null
    token.value = null
    permissions.value = []
    localStorage.removeItem('authToken')
  }
  
  // 检查是否已认证
  const isAuthenticated = computed(() => !!token.value)
  
  // 检查是否有特定权限
  const hasPermission = (permission: string) => {
    return permissions.value.includes(permission)
  }
  
  // 检查是否有角色
  const hasRole = (role: string) => {
    return user.value?.role === role
  }
  
  return {
    user,
    token,
    permissions,
    initAuth,
    login,
    logout,
    isAuthenticated,
    hasPermission,
    hasRole
  }
})