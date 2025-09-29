import api from './apiClient'

export default {
  /**
   * 新增或更新产品SKU
   * data: object
   */
  async save(data = {}) {
    return api.post('/productSku', data)
  },

  /**
   * 分页查询产品SKU
   * params: { current, size, skuName, skuCode, price, stock, productId, ... }
   */
  async page(params = {}) {
    return api.get('/productSku/page', { params })
  },

  /**
   * 列表查询产品SKU
   * params: { skuName, skuCode, price, stock, productId, ... }
   */
  async list(params = {}) {
    return api.get('/productSku/list', { params })
  },

  /**
   * 根据产品ID查询SKU列表
   */
  async listByProductId(productId) {
    return api.get(`/productSku/product/${productId}`)
  },

  /**
   * 根据 id 查询产品SKU
   */
  async getById(id) {
    return api.get(`/productSku/${id}`)
  },

  /**
   * 删除产品SKU（单个 id）
   */
  async remove(id) {
    return api.delete(`/productSku/${id}`)
  }
}