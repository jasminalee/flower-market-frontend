import api from './apiClient'

export default {
  /**
   * 新增或更新产品分类
   * data: object
   */
  async save(data = {}) {
    return api.post('/productCategory', data)
  },

  /**
   * 分页查询产品分类
   * params: { current, size, categoryName, categoryLevel, status, parentId, ... }
   */
  async page(params = {}) {
    return api.get('/productCategory/page', { params })
  },

  /**
   * 列表查询产品分类
   * params: { categoryName, categoryLevel, status, parentId, ... }
   */
  async list(params = {}) {
    return api.get('/productCategory/list', { params })
  },

  /**
   * 获取主页用的分类列表（只包含启用的一级分类）
   */
  async getHomepageCategories() {
    return api.get('/productCategory/homepage')
  },

  /**
   * 获取分类树结构
   */
  async getTree() {
    return api.get('/productCategory/tree')
  },

  /**
   * 根据 id 查询产品分类
   */
  async getById(id) {
    return api.get(`/productCategory/${id}`)
  },

  /**
   * 删除产品分类（单个 id）
   */
  async remove(id) {
    return api.delete(`/productCategory/${id}`)
  }
}