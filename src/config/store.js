import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockApi } from '@/config/mock.js'

/**
 * 用户认证状态管理
 * 处理登录、登出、权限验证等功能
 */
export const useAuthStore = defineStore('auth', () => {
  // 状态
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || '')
  const permissions = ref([])
  const roles = ref([])

  // 计算属性
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const userInfo = computed(() => user.value)

  /**
   * 登录
   * @param {Object} credentials - 登录凭据 {username, password}
   * @returns {Promise<Boolean>} 登录是否成功
   */
  const login = async (credentials) => {
    try {
      const response = await mockApi.auth.login(credentials)
      
      if (response.success) {
        token.value = response.data.token
        user.value = response.data.user
        permissions.value = response.data.permissions || []
        roles.value = response.data.roles || []
        
        // 保存到本地存储
        localStorage.setItem('token', token.value)
        localStorage.setItem('user', JSON.stringify(user.value))
        localStorage.setItem('permissions', JSON.stringify(permissions.value))
        localStorage.setItem('roles', JSON.stringify(roles.value))
        
        return true
      }
      return false
    } catch (error) {
      console.error('登录失败:', error)
      return false
    }
  }

  /**
   * 登出
   */
  const logout = () => {
    token.value = ''
    user.value = null
    permissions.value = []
    roles.value = []
    
    // 清除本地存储
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('permissions')
    localStorage.removeItem('roles')
  }

  /**
   * 检查是否有指定权限
   * @param {String} permission - 权限标识
   * @returns {Boolean}
   */
  const hasPermission = (permission) => {
    if (!permission) return true
    return permissions.value.includes(permission)
  }

  /**
   * 检查是否有指定角色
   * @param {String} role - 角色标识
   * @returns {Boolean}
   */
  const hasRole = (role) => {
    if (!role) return true
    return roles.value.includes(role)
  }

  /**
   * 从本地存储恢复用户信息
   */
  const restoreUserInfo = () => {
    try {
      const savedUser = localStorage.getItem('user')
      const savedPermissions = localStorage.getItem('permissions')
      const savedRoles = localStorage.getItem('roles')
      
      if (savedUser) {
        user.value = JSON.parse(savedUser)
      }
      if (savedPermissions) {
        permissions.value = JSON.parse(savedPermissions)
      }
      if (savedRoles) {
        roles.value = JSON.parse(savedRoles)
      }
    } catch (error) {
      console.error('恢复用户信息失败:', error)
      logout()
    }
  }

  // 初始化时恢复用户信息
  if (token.value) {
    restoreUserInfo()
  }

  return {
    // 状态
    user: userInfo,
    token,
    permissions,
    roles,
    isAuthenticated,
    
    // 方法
    login,
    logout,
    hasPermission,
    hasRole,
    restoreUserInfo
  }
})