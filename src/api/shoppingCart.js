import apiClient from './apiClient'

/**
 * 购物车相关API
 */

export default {
  /**
   * 通过用户ID查询用户所有购物车
   * @param {Object} params - 查询参数
   * @param {number} params.userId - 用户ID
   * @returns {Promise} 返回购物车列表
   */
  list(params) {
    return apiClient.get('/shoppingCart/list', { params })
  }
}