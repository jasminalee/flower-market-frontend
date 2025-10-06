import api from './apiClient'

export default {
  /**
   * 直接购买生成订单
   * merchantProductId: 商户产品ID
   * quantity: 购买数量
   * receiverAddressId: 收货信息ID
   * userId: 用户ID
   */
  async createOrderFromDirectPurchase(merchantProductId, quantity, receiverAddressId, userId) {
    return api.post('/order/createOrderFromDirectPurchase', null, {
      params: { merchantProductId, quantity, receiverAddressId, userId }
    })
  },

  /**
   * 新增或更新订单
   * data: object
   */
  async save(data = {}) {
    return api.post('/order', data)
  },

  /**
   * 分页查询订单
   * params: { current, size, merchantId, orderNo, payAmount, status, totalAmount, userId, ... }
   */
  async page(params = {}) {
    return api.get('/order/page', { params })
  },

  /**
   * 根据 id 查询订单
   */
  async getById(id) {
    return api.get(`/order/${id}`)
  },

  /**
   * 删除订单（单个 id）
   */
  async remove(id) {
    return api.delete(`/order/${id}`)
  }
}