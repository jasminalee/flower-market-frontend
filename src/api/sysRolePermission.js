// filepath: e:\IdeaProjects\flower-market-frontend\src\api\sysRolePermission.js
import api from './apiClient'

export default {
  /**
   * 新增或更新
   */
  async save(data = {}) {
    return api.post('/sysRolePermission', data)
  },

  /**
   * 分页查询
   */
  async page(params = {}) {
    return api.get('/sysRolePermission/page', { params })
  },

  /**
   * 通过 id 查询
   */
  async getById(id) {
    return api.get(`/sysRolePermission/${id}`)
  },

  /**
   * 删除
   */
  async remove(id) {
    return api.delete(`/sysRolePermission/${id}`)
  }
}

