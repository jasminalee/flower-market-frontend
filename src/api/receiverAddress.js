import api from './apiClient'

export default {
  /**
   * 新增收货地址或更新收货地址
   * data: object
   */
  async save(data = {}) {
    return api.post('/receiverAddress', data)
  },

  /**
   * 根据用户ID查询收货地址列表
   * userId: integer
   */
  async listByUserId(userId) {
    return api.get('/receiverAddress/listByUserId', { params: { userId } })
  },

  /**
   * 分页查询收货地址
   * params: { current, size, city, detailAddress, isDefault, province, receiverName, receiverPhone, userId, ... }
   */
  async page(params = {}) {
    return api.get('/receiverAddress/page', { params })
  },

  /**
   * 根据 id 查询收货地址
   */
  async getById(id) {
    return api.get(`/receiverAddress/${id}`)
  },

  /**
   * 删除收货地址（单个 id）
   */
  async remove(id) {
    return api.delete(`/receiverAddress/${id}`)
  }
}