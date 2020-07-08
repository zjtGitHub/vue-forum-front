<template>
  <div class="layui-container fly-marginTop">
    <div
      class="fly-panel fly-panel-user"
      pad20
    >
      <div
        class="layui-tab layui-tab-brief"
      >
        <ul class="layui-tab-title">
          <li class="layui-this">
            <router-link :to="{name: 'login'}">
              登入
            </router-link>
          </li>
          <li>
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
                  <validation-provider
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
                          autocomplete="off"
                          class="layui-input"
                        >
                      </div>
                      <div class="error layui-form-mid">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </validation-provider>
                  <validation-provider
                    rules="required|min:6"
                    v-slot="{ errors }"
                    name="密码"
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
                      <div class="error layui-form-mid">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </validation-provider>
                  <validation-provider
                    rules="required|length:4"
                    ref="codefield"
                    v-slot="{ errors }"
                    name="验证码"
                  >
                    <div class="layui-form-item">
                      <div class="layui-row">
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
                            autocomplete="off"
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
                            @click="_getCode()"
                            v-html="svg"
                          />
                        </div>
                      </div>
                      <div class="error layui-form-mid">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </validation-provider>
                  <div class="layui-form-item">
                    <button
                      class="layui-btn"
                      type="submit"
                    >
                      立即登录
                    </button>
                    <span style="padding-left:20px;">
                      <router-link :to="{name: 'forget'}">忘记密码？</router-link>
                    </span>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
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
import { getCode, login } from '@/api/login'
import { v4 as uuid } from 'uuid'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
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
      login({
        username: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          this.username = ''
          this.password = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          console.log(res)
        } else if (res.code === 401) {
          this.$refs.codefield.setErrors([res.msg])
        }
      }).catch((err) => {
        const data = err.response.data
        if (data.code === 500) {
          this.$alert('用户名密码校验失败，请检查！')
        } else {
          this.$alert('服务器错误')
        }
        console.log(err.response)
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
