<template>
  <transition name="bounce">
    <div class="layui-layer layui-layer-page layui-layer-border edit-content" v-show="isShow" ref="upload">
      <div class="layui-layer-title">插入图片</div>
      <div class="layui-layer-content">
        <ul class="layui-form layui-form-pane">
          <li class="layui-form-item">
            <label for="fileInput" class="layui-form-label">URL</label>
            <div class="layui-input-inline">
              <input type="text" id="fileInput" v-model="picUrl" class="layui-input" placeholder="粘贴图片或者点击上传" />
            </div>
            <button type="button" class="layui-btn layui-btn-primary">
              <label for="uploadImg">
                <i class="layui-icon layui-icon-upload"></i>上传图片
              </label>
            </button>
            <input type="file" name="file" id="uploadImg" @change="upload" class="layui-upload-file">
          </li>
          <li class="layui-form-item">
            <button type="button" class="layui-btn" @click="submit">确认</button>
          </li>
        </ul>
      </div>
      <span class="layui-layer-setwin" @click="close">
        <a href="javascript:void(0)" class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
    </div>
  </transition>
</template>

<script>
import { uploadImg } from '@/api/content'
import config from '@/config'
export default {
  name: 'imgUpload',
  data () {
    return {
      formData: '',
      picUrl: ''
    }
  },
  props: ['isShow', 'ctrl'],
  mounted () {
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
  },
  methods: {
    handleBodyClick (e) {
      e.stopPropagation()
      if (typeof this.ctrl === 'undefined') { return }
      if (!this.ctrl.contains(e.target) && !this.$refs.upload.contains(e.target)) {
        this.picUrl = ''
        this.formData = ''
        this.$emit('closeEvent')
      }
    },
    close () {
      this.picUrl = ''
      this.formData = ''
      this.$emit('closeEvent')
    },
    upload (e) {
      const file = e.target.files
      const formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }
      uploadImg(this.formData).then((res) => {
        if (res.code === 200) {
          const baseUrl = process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev
          this.picUrl = baseUrl + res.path
        }
      })
      document.getElementById('uploadImg').value = ''
    },
    submit () {
      if (this.picUrl === '') {
        document.getElementById('fileInput').focus()
        this.$pop('请上传图片或输入链接！', 'shake')
        return
      }
      this.$emit('addEvent', this.picUrl)
      setTimeout(() => {
        this.picUrl = ''
        this.formData = ''
        this.$emit('closeEvent')
      }, 0)
    }
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style scoped lang="scss">
.layui-form-item {
  text-align: center;
}
.layui-form-pane {
  margin: 20px;
}
</style>
