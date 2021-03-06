import axios from 'axios'
import errorHandle from './errorHandle'
import store from '../store'
import publicConfig from '@/config'
const CancelToken = axios.CancelToken

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    // 取消重复请求需要用到的对象
    this.pending = {}
  }

  // 获取axios配置
  getInsideConfig () {
    // console.log(this.baseUrl)
    const config = {
      baseUrl: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  removePending (key, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]('取消重复请求')
    }
    delete this.pending[key]
  }

  // 设置拦截器
  interceptors (instance) {
    // 请求拦截
    instance.interceptors.request.use((config) => {
      // 判断token是否存在并且是否是公共路径，如果是，在请求头中加入token
      let isPublic = false
      publicConfig.publicPath.map(path => {
        isPublic = isPublic || path.test(config.url)
      })
      if (!isPublic && store.state.token) {
        config.headers.Authorization = 'Bearer ' + store.state.token
      }
      // 拼接一个请求的key，每次请求先执行以下清空方法，如果是重复请求，pending中就会存在key，这个key实际就是canceltoken重的回调方法，可以传入字符串，执行这个方法取消请求
      const key = config.url + '&' + config.method
      this.removePending(key, true)
      config.CancelToken = new CancelToken((c) => {
        this.pending[key] = c
      })
      // console.log(this.pending)
      return config
    }, (err) => {
      errorHandle(err)
      return Promise.reject(err)
    })

    instance.interceptors.response.use((res) => {
      const key = res.config.url + '&' + res.config.method
      this.removePending(key)
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
    // 每次请求的时候都会创建实例，这样就能保证获取的config里面如果有变量的话，那么这个变量的值都是实时变化的
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    // console.log(newOptions)
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
