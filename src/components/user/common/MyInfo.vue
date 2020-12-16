<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit, validate }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="layui-form-item">
          <validation-provider
            rules="required|email"
            v-slot="{ errors }"
            name="username"
          >
            <label for="L_email" class="layui-form-label">邮箱</label>
            <div class="layui-input-inline">
              <input
                type="text"
                name="email"
                required
                autocomplete="off"
                class="layui-input"
                v-model="form.username"
              />
            </div>
            <div class="error layui-form-mid">
              {{ errors[0] }}
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <validation-provider
            rules="required"
            v-slot="{ errors }"
            name="nickname"
          >
            <label for="L_username" class="layui-form-label">昵称</label>
            <div class="layui-input-inline">
              <input
                type="text"
                name="username"
                required
                autocomplete="off"
                class="layui-input"
                v-model="form.name"
              />
            </div>
            <div class="error layui-form-mid">
              {{ errors[0] }}
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <label for="L_city" class="layui-form-label">城市</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="city"
              autocomplete="off"
              class="layui-input"
              v-model="form.location"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label for="L_city" class="layui-form-label">性别</label>
          <div class="layui-inline" style="margin-top: 10px; margin-left: 10px">
            <div class="layui-input-inline">
              <label for="gender1">
                <input
                  id="gender1"
                  v-model="form.gender"
                  type="radio"
                  name="sex"
                  value="0"
                  title="男"
                />
                <i
                  class="layui-icon layui-icon-circle"
                  :class="{ 'layui-icon-radio': form.gender === '0' }"
                ></i>
                男
              </label>
              <label for="gender2" style="margin-left: 10px">
                <input
                  id="gender2"
                  v-model="form.gender"
                  type="radio"
                  name="sex"
                  value="1"
                  title="女"
                />
                <i
                  class="layui-icon layui-icon-circle"
                  :class="{ 'layui-icon-radio': form.gender === '1' }"
                ></i>
                女
              </label>
            </div>
          </div>
        </div>
        <div class="layui-form-item layui-form-text">
          <label for="L_sign" class="layui-form-label">签名</label>
          <div class="layui-input-block">
            <textarea
              placeholder="随便写些什么刷下存在感"
              name="sign"
              autocomplete="off"
              class="layui-textarea"
              style="height: 80px"
              v-model="form.regmark"
            ></textarea>
          </div>
        </div>
        <div class="layui-form-item">
          <button
            class="layui-btn"
            type="button"
            @click="validate().then(onSubmit)"
          >
            确认修改
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from '@/utils/utils'
import { updateUserInfo } from '@/api/User'
export default {
  name: 'myinfo',
  data () {
    return {
      form: {
        gender: '',
        username: '',
        name: '',
        location: '',
        regmark: ''
      }
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    const { username, name, gender, location, regmark } = this.$store.state.userInfo
    this.form.username = username || ''
    this.form.name = name || ''
    this.form.gender = gender || ''
    this.form.location = location || ''
    this.form.regmark = regmark || ''
  },
  methods: {
    onSubmit () {
      const form = this.form
      updateUserInfo(form).then(res => {
        if (res.code === 200) { this.$alert(res.msg) }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.error {
    color: red;
  }
</style>
