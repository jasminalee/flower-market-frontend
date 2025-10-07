import api from './apiClient'

export default {
  /**
   * 新增或更新论坛帖子
   * data: object
   */
  async save(data = {}) {
    return api.post('/forumPost', data)
  },

  /**
   * 分页查询论坛帖子
   * params: { current, size, title, categoryId, postType, status, userId, ... }
   */
  async page(params = {}) {
    return api.get('/forumPost/page', { params })
  },

  /**
   * 根据板块ID分页查询帖子列表
   */
  async pageByCategory(categoryId, params = {}) {
    return api.get(`/forumPost/pageByCategory/${categoryId}`, { params })
  },

  /**
   * 列表查询论坛帖子
   * params: { title, categoryId, postType, status, userId, ... }
   */
  async list(params = {}) {
    return api.get('/forumPost/list', { params })
  },

  /**
   * 获取热门帖子列表（按浏览量排序）
   */
  async getHot(limit = 10) {
    return api.get('/forumPost/hot', { params: { limit } })
  },

  /**
   * 获取精华帖子列表
   */
  async getEssence(limit = 10) {
    return api.get('/forumPost/essence', { params: { limit } })
  },

  /**
   * 根据用户ID查询帖子列表
   */
  async getByUser(userId, params = {}) {
    return api.get(`/forumPost/byUser/${userId}`, { params })
  },

  /**
   * 根据 id 查询论坛帖子
   */
  async getById(id) {
    return api.get(`/forumPost/${id}`)
  },

  /**
   * 删除论坛帖子（单个 id）
   */
  async remove(id) {
    return api.delete(`/forumPost/${id}`)
  }
}