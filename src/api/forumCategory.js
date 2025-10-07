import api from './apiClient'

export default {
  /**
   * 新增或更新论坛板块
   * data: object
   */
  async save(data = {}) {
    return api.post('/forumCategory', data)
  },

  /**
   * 分页查询论坛板块
   * params: { current, size, name, level, status, ... }
   */
  async page(params = {}) {
    return api.get('/forumCategory/page', { params })
  },

  /**
   * 列表查询论坛板块
   * params: { name, level, status, ... }
   */
  async list(params = {}) {
    return api.get('/forumCategory/list', { params })
  },

  /**
   * 获取启用的板块列表（用于前端展示）
   */
  async getAvailable() {
    return api.get('/forumCategory/available')
  },

  /**
   * 根据父板块ID获取子板块列表
   */
  async getChildren(parentId) {
    return api.get(`/forumCategory/children/${parentId}`)
  },

  /**
   * 根据 id 查询论坛板块
   */
  async getById(id) {
    return api.get(`/forumCategory/${id}`)
  },

  /**
   * 删除论坛板块（单个 id）
   */
  async remove(id) {
    return api.delete(`/forumCategory/${id}`)
  }
}