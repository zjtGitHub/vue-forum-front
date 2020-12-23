<template>
  <transition name="bounce">
    <div class="layui-layer-page layui-layer-prompt edit-content" v-show="isShow" ref="quote">
      <div class="layui-layer-title">请输入引用内容</div>
      <div class="layui-layer-content">
        <textarea
          class="layui-layer-input"
          id="quoteInput"
          v-model="quote"
          style="width: 300px; height: 100px;"
        ></textarea>
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
      <div class="layui-layer-btn">
        <a class="layui-layer-btn0" @click.prevent="submit()">确定</a>
        <a class="layui-layer-btn" @click.prevent="cancel()">取消</a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Quote',
  props: ['isShow', 'ctrl'],
  data () {
    return {
      quote: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
  },
  methods: {
    handleBodyClick (e) {
      e.stopPropagation()
      if (typeof this.ctrl === 'undefined') { return }
      if (!this.ctrl.contains(e.target) && !this.$refs.quote.contains(e.target)) {
        this.quote = ''
        this.$emit('closeEvent')
      }
    },
    submit () {
      if (this.quote === '') {
        document.getElementById('quoteInput').focus()
        this.$pop('请输入引用内容', 'shake')
        return
      }
      this.$emit('addEvent', this.quote)
      setTimeout(() => {
        this.quote = ''
        this.$emit('closeEvent')
      }, 0)
    },
    cancel () {
      this.quote = ''
      this.$emit('closeEvent')
    }
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style lang="scss" scoped>
</style>
