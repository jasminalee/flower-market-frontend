import api from './apiClient'

export default {
  /**
   * 新增或更新评论
   * data: object
   */
  async save(data = {}) {
    return api.post('/comment', data)
  },

  /**
   * 分页查询评论
   * params: { current, size, sourceId, sourceType, content, userId, ... }
   */
  async page(params = {}) {
    return api.get('/comment/page', { params })
  },

  /**
   * 根据来源ID和类型查询评论列表
   * sourceId: 来源ID
   * sourceType: 来源类型
   * parentId: 父评论ID（可选）
   */
  async listBySource(sourceId, sourceType, parentId = 0) {
    return api.get('/comment/source', { 
      params: { 
        sourceId, 
        sourceType, 
        parentId 
      } 
    })
  },

  /**
   * 根据 id 查询评论
   */
  async getById(id) {
    return api.get(`/comment/${id}`)
  },

  /**
   * 删除评论（单个 id）
   */
  async remove(id) {
    return api.delete(`/comment/${id}`)
  }
}