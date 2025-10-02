import api from './apiClient'

export default {
  /**
   * 新增或更新产品
   * data: object
   */
  async save(data = {}) {
    return api.post('/product', data)
  },

  /**
   * 分页查询产品
   * params: { current, size, productName, productCode, productType, status, categoryId, ... }
   */
  async page(params = {}) {
    return api.get('/product/page', { params })
  },

  /**
   * 主页商品列表（支持分类和搜索）
   * params: { current, size, categoryId, keyword }
   */
  async homepage(params = {}) {
    return api.get('/product/homepage', { params })
  },

  /**
   * 列表查询产品
   * params: { productName, productCode, productType, status, categoryId, ... }
   */
  async list(params = {}) {
    return api.get('/product/list', { params })
  },

  /**
   * 根据 id 查询产品详情（包括SKU信息）
   */
  async getDetail(id) {
    return api.get(`/product/detail/${id}`)
  },

  /**
   * 根据 id 查询产品
   */
  async getById(id) {
    return api.get(`/product/${id}`)
  },

  /**
   * 删除产品（单个 id）
   */
  async remove(id) {
    return api.delete(`/product/${id}`)
  }
}