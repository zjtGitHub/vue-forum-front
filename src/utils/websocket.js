import store from '@/store'
class WebsocketClient {
  constructor (config = {}) {
    const defaultConfig = {
      url: '127.0.0.1',
      port: '3001',
      protocol: 'ws',
      timeInterval: 3 * 1000
    }
    const finalConfig = { ...defaultConfig, ...config }
    this.ws = {}
    this.url = finalConfig.url
    this.port = finalConfig.port
    this.protocol = finalConfig.protocol
    this.handle = null
    this.timeInterval = finalConfig.timeInterval
  }

  init () {
    this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
    this.ws.onopen = () => this.onOpen()
    this.ws.onmessage = (msg) => this.onMessage(msg)
    this.ws.onclose = () => this.onClose()
    this.ws.onerror = () => this.onError()
  }

  onOpen () {
    // 发起鉴权请求
    this.send(JSON.stringify({
      event: 'auth',
      message: 'Bearer ' + store.state.token
    }))
    // this.checkServer()
  }

  send (msg) {
    this.ws.send(msg)
  }

  onMessage (event) {
    // 接收服务端发送过来的消息
    var obj = JSON.parse(event.data)
    switch (obj.event) {
      case 'noauth':
        // 鉴权失败
        // 路由跳转到 /login 重新获取token
        this.$router.push({ name: '404' })
        break
      case 'heartbeat':
        this.checkServer() // timeInterval + t
        // 可以注释掉以下心跳状态，主动测试服务端是否会断开客户端的连接
        this.send(JSON.stringify({
          event: 'heartbeat',
          message: 'pong'
        }))
        break
      default:
        store.dispatch('message', obj)
    }
  }

  onClose () {
    // 当链接主动断开的时候触发close事件
    this.ws.close()
  }

  onError () {
    // 当连接失败时，触发error事件
    // 连接失败之后，1s进行断线重连！
    console.log(888888)
    setTimeout(() => {
      this.init()
    }, 1000)
  }

  checkServer () {
    clearTimeout(this.handle)
    this.handle = setTimeout(() => {
      this.onClose()
      this.onError()
    // 设置1ms的时延，调试在服务器测未及时响应时，客户端的反应
    }, this.timeInterval + 1000)
  }
}

export default WebsocketClient
