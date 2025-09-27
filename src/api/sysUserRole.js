import api from './apiClient'

export default {
  /**
   * 新增或更新
   */
  async save(data = {}) {
    return api.post('/sysUserRole', data)
  },

  /**
   * 分页查询
   */
  async page(params = {}) {
    return api.get('/sysUserRole/page', { params })
  },

  /**
   * 通过 id 查询
   */
  async getById(id) {
    return api.get(`/sysUserRole/${id}`)
  },

  /**
   * 删除
   */
  async remove(id) {
    return api.delete(`/sysUserRole/${id}`)
  }
}