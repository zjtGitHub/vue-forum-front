<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="layui-form-item">
          <ValidationProvider
            rules="required"
            v-slot="{ errors }"
            name="oldpassword"
          >
            <div class="layui-row">
              <label for="L_nowpass" class="layui-form-label">当前密码</label>
              <div class="layui-input-inline">
                <input
                  v-model="oldpassword"
                  type="password"
                  id="L_nowpass"
                  class="layui-input"
                />
              </div>
            </div>
            <div class="error layui-row">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
        </div>
        <div class="layui-form-item">
          <ValidationProvider
            rules="required|min:6|max:16"
            v-slot="{ errors }"
            name="newpassword"
            vid="newpassword"
          >
            <div class="layui-row">
              <label for="L_pass" class="layui-form-label">新密码</label>
              <div class="layui-input-inline">
                <input
                  v-model="newpassword"
                  type="password"
                  id="L_pass"
                  class="layui-input"
                />
              </div>
              <div class="layui-form-mid layui-word-aux">6到16个字符</div>
            </div>

            <div class="error layui-row">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
        </div>
        <div class="layui-form-item">
          <ValidationProvider
            rules="required|confirmed:newpassword"
            v-slot="{ errors }"
            name="repassword"
          >
            <div class="layui-row">
              <label for="L_repass" class="layui-form-label">确认密码</label>
              <div class="layui-input-inline">
                <input
                  v-model="repassword"
                  type="password"
                  id="L_repass"
                  class="layui-input"
                />
              </div>
            </div>

            <div class="error layui-row">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
        </div>
        <div class="layui-form-item">
          <button class="layui-btn" type="submit">确认修改</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from '@/utils/utils'
import { updatePassword } from '@/api/User'
export default {
  name: 'password',
  data () {
    return {
      oldpassword: '',
      repassword: '',
      newpassword: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    onSubmit () {
      const data = {
        oldpwd: this.oldpassword,
        newpwd: this.newpassword
      }
      if (this.oldpassword === this.newpassword) {
        this.$alert('新旧密码不得相同！')
        return
      }
      updatePassword(data).then(res => {
        this.$alert(res.msg)
        this.oldpassword = ''
        this.newpassword = ''
        this.repassword = ''
        requestAnimationFrame(() => {
          this.$refs.observer.reset()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  color: red;
}
</style>
