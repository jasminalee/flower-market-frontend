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
  },

  /**
   * 添加商品到购物车
   * @param {Object} shoppingCart - 购物车信息
   * @returns {Promise} 返回添加结果
   */
  add(shoppingCart) {
    return apiClient.post('/shoppingCart/add', shoppingCart)
  }
}