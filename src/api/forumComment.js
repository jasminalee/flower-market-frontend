import api from './apiClient'

export default {
  /**
   * 新增或更新论坛评论
   * data: object
   */
  async save(data = {}) {
    return api.post('/comment', data)
  },

  /**
   * 分页查询论坛评论
   * params: { current, size, content, sourceId, sourceType, parentId, ... }
   */
  async page(params = {}) {
    return api.get('/comment/page', { params })
  },

  /**
   * 根据帖子ID查询论坛评论列表（包含层级结构）
   */
  async getByPost(postId) {
    return api.get(`/comment/forum/${postId}`)
  },

  /**
   * 根据来源ID和类型查询评论列表
   */
  async getBySource(sourceId, sourceType, parentId = 0) {
    return api.get('/comment/source', { 
      params: { sourceId, sourceType, parentId } 
    })
  },

  /**
   * 根据 id 查询论坛评论
   */
  async getById(id) {
    return api.get(`/comment/${id}`)
  },

  /**
   * 删除论坛评论（单个 id）
   */
  async remove(id) {
    return api.delete(`/comment/${id}`)
  }
}