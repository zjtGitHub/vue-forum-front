<template>
  <div class="layui-container fly-marginTop">
    <div
      class="fly-panel fly-panel-user"
      pad20
    >
      <div
        class="layui-tab layui-tab-brief"
        lay-filter="user"
      >
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name: 'login'}">
              登入
            </router-link>
          </li>
          <li class="layui-this">
            <router-link :to="{name: 'reg'}">
              注册
            </router-link>
          </li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0;"
        >
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmit)">
                  <ValidationProvider
                    rules="required|email"
                    v-slot="{ errors }"
                    name="用户名"
                  >
                    <div class="layui-form-item">
                      <label
                        for="L_email"
                        class="layui-form-label"
                      >用户名</label>
                      <div class="layui-input-inline">
                        <input
                          v-model="username"
                          type="text"
                          id="L_email"
                          name="username"
                          class="layui-input"
                        >
                      </div>
                      <div class="layui-form-mid layui-word-aux">
                        将会成为您唯一的登入名
                      </div>
                      <div class="error layui-row">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="required|min:5"
                    v-slot="{ errors }"
                    name="昵称"
                  >
                    <div class="layui-form-item">
                      <label
                        for="L_username"
                        class="layui-form-label"
                      >昵称</label>
                      <div class="layui-input-inline">
                        <input
                          v-model="nickname"
                          type="text"
                          id="L_username"
                          name="nickname"
                          class="layui-input"
                        >
                      </div>
                      <div class="error layui-form-mid">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="required|min:6|max:16"
                    v-slot="{ errors }"
                    name="密码"
                    vid="password"
                  >
                    <div class="layui-form-item">
                      <label
                        for="L_pass"
                        class="layui-form-label"
                      >密码</label>
                      <div class="layui-input-inline">
                        <input
                          v-model="password"
                          type="password"
                          id="L_pass"
                          name="pass"
                          class="layui-input"
                        >
                      </div>
                      <div class="layui-form-mid layui-word-aux">
                        6到16个字符
                      </div>
                      <div class="error layui-row">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="confirmed:password"
                    v-slot="{ errors }"
                    name="密码"
                  >
                    <div class="layui-form-item">
                      <label
                        for="L_repass"
                        class="layui-form-label"
                      >确认密码</label>
                      <div class="layui-input-inline">
                        <input
                          v-model="repass"
                          type="password"
                          id="L_repass"
                          name="repass"
                          class="layui-input"
                        >
                      </div>
                      <div class="error layui-form-mid">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="required|length:4"
                    ref="codefiled"
                    v-slot="{ errors }"
                    name="验证码"
                  >
                    <div class="layui-form-item">
                      <label
                        for="L_vercode"
                        class="layui-form-label"
                      >验证码</label>
                      <div class="layui-input-inline">
                        <input
                          v-model="code"
                          type="text"
                          id="L_vercode"
                          name="code"
                          placeholder="请输入验证码"
                          class="layui-input"
                        >
                      </div>
                      <div
                        class="layui-form-mid"
                        style="padding: 0!important;"
                      >
                        <span
                          class="svg"
                          style="color: #c00;"
                          @click="_getCode"
                          v-html="svg"
                        />
                      </div>
                      <div class="error layui-row">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                  <div class="layui-form-item">
                    <button
                      class="layui-btn"
                      type="submit"
                    >
                      立即注册
                    </button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
                    <a
                      href=""
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="QQ登入"
                    />
                    <a
                      href=""
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-weibo"
                      title="微博登入"
                    />
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from '@/utils/utils'
import { getCode, reg } from '@/api/login'
import { v4 as uuid } from 'uuid'
export default {
  name: 'Reg',
  data () {
    return {
      username: '',
      nickname: '',
      password: '',
      repass: '',
      code: '',
      svg: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    this._getCode()
  },
  methods: {
    _getCode () {
      const sid = this.$store.state.sid
      getCode(sid).then(res => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    onSubmit () {
      reg({
        username: this.username,
        nickname: this.nickname,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          this.username = ''
          this.password = ''
          this.repassword = ''
          this.name = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else {
          this.$refs.codefiled.setErrors([res.msg])
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .svg {
    position: relative;
    top: -5px;
  }
  .error {
    color: red;
  }
</style>
