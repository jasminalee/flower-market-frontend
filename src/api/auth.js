import api from './apiClient'

export default {
  /**
   * 用户登录
   * data: { username, password }
   */
  async login(data = {}) {
    return api.post('/auth/login', data)
  },

  /**
   * 获取用户信息
   * token: string
   */
  async getUserInfo(token) {
    // 在实际实现中，token通常通过请求头传递
    // 这里我们假设后端可以通过token参数或者从请求头中获取
    return api.get('/auth/userinfo', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}