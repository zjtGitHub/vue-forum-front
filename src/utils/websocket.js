import store from '@/store'
class WebsocketClient {
  constructor (config = {}) {
    const defaultConfig = {
      url: '127.0.0.1',
      port: '3001',
      protocol: 'ws'
    }
    const finalConfig = { ...defaultConfig, ...config }
    this.ws = {}
    this.url = finalConfig.url
    this.port = finalConfig.port
    this.protocol = finalConfig.protocol
  }

  init () {
    this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
    this.ws.onopen = this.onOpen
    this.ws.onmessage = this.onMessage
    this.ws.onclose = this.onClose
    this.ws.onerror = this.onError
  }

  onOpen () {
    // 发起鉴权请求
    this.send(JSON.stringify({
      event: 'auth',
      message: 'Bearer ' + store.state.token
    }))
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
        // this.checkServer() // timeInterval + t
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
    console.log('close:' + this.ws.readyState)
    console.log('已关闭websocket')
    this.ws.close()
  }

  onError () {
    // 当连接失败时，触发error事件
    console.log('error:' + this.ws.readyState)
    console.log('websocket连接失败！')
    // 连接失败之后，1s进行断线重连！
    var _this = this
    setTimeout(function () {
      _this.init()
    }, 1000)
  }
}

export default WebsocketClient