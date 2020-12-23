<template>
  <transition name="bounce">
    <div class="layui-layer layui-layer-page layui-layer-prompt edit-content" v-show="isShow" ref="links">
      <div class="layui-layer-title">请输入合法链接</div>
      <div class="layui-layer-content">
        <input type="text" id="link" class="layui-layer-input" v-model="link">
      </div>
      <span class="layui-layer-setwin" @click="close">
        <a href="javascript:void(0)" class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
      <div class="layui-layer-btn">
        <button type="button" class="layui-btn layui-btn-primary" @click="close">取消</button>
        <button type="button" class="layui-btn" @click="submit">确认</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LinkAdd',
  data () {
    return {
      link: ''
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
      if (!this.ctrl.contains(e.target) && !this.$refs.links.contains(e.target)) {
        this.link = ''
        this.$emit('closeEvent')
      }
    },
    close () {
      this.link = ''
      this.$emit('closeEvent')
    },
    submit () {
      if (this.link === '') {
        document.getElementById('link').focus()
        this.$pop('请输入链接', 'shake')
        return
      }
      this.$emit('addEvent', this.link)
      setTimeout(() => {
        this.close()
      }, 0)
    }
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style scoped lang="scss">
</style>
