// filepath: e:\IdeaProjects\flower-market-frontend\src\api\sysPermission.js
import api from './apiClient'

export default {
  /**
   * 新增或更新 sysPermission
   * data: object
   */
  async save(data = {}) {
    return api.post('/sysPermission', data)
  },

  /**
   * 分页查询
   * params: { current, size, permissionName, permissionCode, permissionType, ... }
   */
  async page(params = {}) {
    return api.get('/sysPermission/page', { params })
  },

  /**
   * 根据 id 查询
   */
  async getById(id) {
    return api.get(`/sysPermission/${id}`)
  },

  /**
   * 删除（单个 id）
   */
  async remove(id) {
    return api.delete(`/sysPermission/${id}`)
  }
}

