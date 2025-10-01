import api from './apiClient'

export default {
  /**
   * 上传图片文件
   * formData: FormData object containing the file
   */
  async uploadImage(formData) {
    return api.post('/api/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}