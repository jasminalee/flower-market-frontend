// filepath: e:\IdeaProjects\flower-market-frontend\src\api\sysRole.js
import api from './apiClient'

export default {
  /**
   * 分页查询角色
   * params: { current, size, keyword }
   */
  async page(params = {}) {
    // api 已经配置 baseURL 为 API_BASE_URL，所以只写相对路径
    return api.get('/sysRole/page', { params })
  },

  /**
   * 通过 id 查询单条
   */
  async getById(id) {
    return api.get(`/sysRole/${id}`)
  },

  /**
   * 创建角色
   */
  async create(data = {}) {
    return api.post('/sysRole', data)
  },

  /**
   * 更新角色
   */
  async update(id, data = {}) {
    return api.put(`/sysRole/${id}`, data)
  },

  /**
   * 删除角色（支持单个 id 或数组）
   */
  async remove(ids) {
    // 根据后端约定调整：这里假设 DELETE 接受 body（axios 支持在 config.data）
    if (Array.isArray(ids)) {
      return api.delete('/sysRole', { data: ids })
    }
    return api.delete(`/sysRole/${ids}`)
  }
}

