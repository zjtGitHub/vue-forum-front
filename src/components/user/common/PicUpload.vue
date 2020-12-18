<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
        <label for="pic" class="layui-btn upload-img">
          <i class="layui-icon">&#xe67c;</i>上传头像
          <input id="pic" type="file" name="file" accept="image/png,image/gif,image/jpg"  style="display: none" @change="upload">
        </label>
        <img :src="pic" />
        <span class="loading"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/User'
import { uploadImg } from '@/api/content'
import config from '@/config'
export default {
  name: 'upload',
  data () {
    return {
      pic: typeof this.$store.state.userInfo.pic !== 'undefined' ? this.$store.state.userInfo.pic : '/img/logo.png',
      formData: ''
    }
  },
  methods: {
    upload (e) {
      const file = e.target.files
      const formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }

      // 上传图片后

      // 更新用户信息
      uploadImg(formData).then(res => {
        if (res.code === 200) {
          const baseUrl = process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev
          this.pic = baseUrl + res.path

          updateUserInfo({ pic: this.pic }).then(res => {
            const user = this.$store.state.userInfo
            user.pic = this.pic
            this.$store.commit('setUserInfo', user)
            this.$alert('图片上传成功！')
          })
        }
        document.getElementById('#pic').value = ''
      })
    }
  }
}
</script>

<style>
</style>
