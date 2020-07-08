import axios from 'axios'
import errorHandle from './errorHandle'

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }

  // 获取axios配置
  getInsideConfig () {
    console.log(this.baseUrl)
    const config = {
      baseUrl: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  // 设置拦截器
  interceptors (instance) {
    instance.interceptors.request.use((config) => {
      return config
    }, (err) => {
      errorHandle(err)
      return Promise.reject(err)
    })

    instance.interceptors.response.use((res) => {
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    })
  }

  // 创建实例
  request (options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    console.log(newOptions)
    return instance(newOptions)
  }

  // get
  get (url, config) {
    const options = Object.assign({
      methods: 'get',
      url: url
    }, config)
    return this.request(options)
  }

  post (url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}

export default HttpRequest
