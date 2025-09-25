import axios from 'axios'
import { API_BASE_URL } from '@/api/baseUrl.js'

export default {
  /**
   * 分页查询用户
   * params: { current, size, keyword, status }
   */
  async page(params = {}) {
    const url = `${API_BASE_URL}/sysUser/page`
    const res = await axios.get(url, { params })
    // 返回后端原始数据对象（records, total, current, size 等）
    return res.data
  }
}