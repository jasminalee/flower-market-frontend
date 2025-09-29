import api from './apiClient'

export default {
  /**
   * 新增或更新商户产品
   * data: object
   */
  async save(data = {}) {
    return api.post('/merchantProduct', data)
  },

  /**
   * 分页查询商户产品
   * params: { current, size, merchantId, productId, skuId, price, stock, status, createTime, updateTime, ... }
   */
  async page(params = {}) {
    return api.get('/merchantProduct/page', { params })
  },

  /**
   * 查询商品在各商户的价格和库存
   * productId: 产品ID
   */
  async listByProduct(productId) {
    return api.get(`/merchantProduct/product/${productId}`)
  },

  /**
   * 根据 id 查询商户产品
   */
  async getById(id) {
    return api.get(`/merchantProduct/${id}`)
  },

  /**
   * 删除商户产品（单个 id）
   */
  async remove(id) {
    return api.delete(`/merchantProduct/${id}`)
  },

  /**
   * 商户产品列表
   * merchantId: 商户ID
   * params: { current, size }
   */
  async getMyProducts(merchantId, params = {}) {
    return api.get(`/merchant/myProducts`, { 
      params: { 
        merchantId,
        ...params 
      } 
    })
  },

  /**
   * 商户下架产品
   * merchantProductId: 商户产品ID
   */
  async offShelf(merchantProductId) {
    return api.post(`/merchant/product/offShelf/${merchantProductId}`)
  },

  /**
   * 商户上架产品
   * data: object
   */
  async onShelf(data = {}) {
    return api.post('/merchant/product/onShelf', data)
  },

  /**
   * 更新产品库存
   * data: object
   */
  async updateStock(data = {}) {
    return api.post('/merchant/product/updateStock', data)
  },

  /**
   * 查询产品的SKU列表
   * productId: 产品ID
   */
  async getSkusByProduct(productId) {
    return api.get(`/merchant/product/${productId}/skus`)
  },

  /**
   * 查询所有可上架的产品
   * params: { current, size }
   */
  async getAvailableProducts(params = {}) {
    return api.get('/merchant/products', { params })
  }
}