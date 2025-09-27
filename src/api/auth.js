import api from '@/api/apiClient'

export default {
  /**
   * 用户登录
   * data: { username, password }
   */
  async login(data = {}) {
    return api.post('/auth/login', data)
  }
}