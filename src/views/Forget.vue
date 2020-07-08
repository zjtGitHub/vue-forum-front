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
            找回密码<!--重置密码-->
          </li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0;"
        >
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmit)">
                  <validation-provider
                    rules="required|email"
                    v-slot="{ errors }"
                    name="邮箱"
                  >
                    <div class="layui-form-item">
                      <label
                        for="L_email"
                        class="layui-form-label"
                      >邮箱</label>
                      <div class="layui-input-inline">
                        <input
                          v-model="email"
                          type="text"
                          id="L_email"
                          name="email"
                          class="layui-input"
                        >
                      </div>
                      <div class="error layui-form-mid">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </validation-provider>
                  <ValidationProvider
                    rules="required|length:4"
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
                          name="vercode"
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
                      提交
                    </button>
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
import { getCode, forget } from '@/api/login'
import { v4 as uuid } from 'uuid'
export default {
  name: 'Forget',
  data () {
    return {
      email: '',
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
      forget({
        username: this.email
      }).then(res => {
        if (res.code === 200) {
          alert('发送成功！！！')
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
