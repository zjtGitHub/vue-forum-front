<template>
  <div class="layui-container flex">
    <div class="layui-row font">确认更新账号为：{{ username }}吗？</div>
    <div class="layui-row">
      <button type="button" class="layui-btn" :class="{'layui-btn-disabled': isSend}" @click="submit">确认更新</button>
      <router-link class="layui-btn layui-btn-primary" to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script>
import { updateUsername } from '@/api/User'
export default {
  name: 'confirm',
  data () {
    return {
      username: '',
      obj: {},
      isSend: false
    }
  },
  mounted () {
    const queryStr = window.location.href.replace(/.*\?/, '')
    this.obj = Object.fromEntries(queryStr.split('&').map(v => v.split('=')))
    this.username = decodeURIComponent(this.obj.username)
  },
  methods: {
    submit () {
      this.obj.username = this.username
      updateUsername(this.obj).then((res) => {
        if (res.code === 200) {
          this.isSend = true
          this.$alert(res.msg)
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 260px;
}
.font {
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
}
</style>
