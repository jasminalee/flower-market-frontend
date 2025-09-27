import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:18091'
// http请求工具封装, 默认封装请求服务前缀
const client = axios.create({
  baseURL: API_BASE_URL,
  // 可以在这里设置全局头（例如 token）
  // headers: { 'Content-Type': 'application/json' }
})

async function handle(promise) {
  try {
    const res = await promise
    return res.data
  } catch (err) {
    // 统一错误格式：尽量返回后端错误体，否则返回消息
    // 直接抛出后端错误体或构造的错误对象，调用方可在界面层捕获处理
    throw (err && err.response && err.response.data) ? err.response.data : { message: err.message || 'Network Error' }
  }
}

export default {
  get(url, config) { return handle(client.get(url, config)) },
  post(url, data, config) { return handle(client.post(url, data, config)) },
  put(url, data, config) { return handle(client.put(url, data, config)) },
  delete(url, config) { return handle(client.delete(url, config)) },
  // 如果需要低层 axios 功能，可以通过 raw 访问
  raw: client,
}
