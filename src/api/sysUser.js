// filepath: e:\IdeaProjects\flower-market-frontend\src\api\sysUser.js
import api from './apiClient'

export default {
  /**
   * 分页查询用户
   * params: { current, size, keyword, status }
   */
  async page(params = {}) {
    // api 已经配置 baseURL 为 API_BASE_URL，所以只写相对路径
    return api.get('/sysUser/page', { params })
  },

  /**
   * 保存用户（新增或更新）
   * data: object
   */
  async save(data = {}) {
    return api.post('/sysUser', data)
  },

  /**
   * 删除用户
   * id: number
   */
  async remove(id) {
    return api.delete(`/sysUser/${id}`)
  }
}