import api from './apiClient'

export default {
  /**
   * 新增支付方式
   * data: object
   */
  async save(data = {}) {
    return api.post('/paymentMethod', data)
  },

  /**
   * 修改支付方式
   * data: object
   */
  async update(data = {}) {
    return api.put('/paymentMethod', data)
  },

  /**
   * 分页查询支付方式
   * params: { current, size, methodCode, methodName, status, userId, ... }
   */
  async page(params = {}) {
    return api.get('/paymentMethod/page', { params })
  },

  /**
   * 查询所有支付方式
   */
  async list() {
    return api.get('/paymentMethod/list')
  },

  /**
   * 根据用户ID查询支付方式
   * userId: integer
   */
  async listByUserId(userId) {
    return api.get(`/paymentMethod/user/${userId}`)
  },

  /**
   * 根据 id 查询支付方式
   */
  async getById(id) {
    return api.get(`/paymentMethod/${id}`)
  },

  /**
   * 删除支付方式（单个 id）
   */
  async remove(id) {
    return api.delete(`/paymentMethod/${id}`)
  }
}