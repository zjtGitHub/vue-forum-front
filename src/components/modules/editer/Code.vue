<template>
  <transition name="bounce">
    <div class="layui-layer-border layui-layer-page layui-layer-prompt edit-content" v-show="isShow" ref="code">
      <div class="layui-layer-title">请贴入代码或任意文本</div>
      <div class="layui-layer-content">
        <textarea
          class="layui-layer-input"
          v-model="code"
          id="codeInput"
          v-on:keydown.enter="$event.stopPropagation()"
          :style="{'width': this.width + 'px', 'height': this.height + 'px'}"
        ></textarea>
      </div>
      <span class="layui-layer-setwin" @click="close">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
      </span>
      <div class="layui-layer-btn layui-layer-btn-">
        <button type="button" class="layui-btn layui-btn-primary" @click="close">取消</button>
        <button type="button" class="layui-btn" @click="submit">确认</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Code',
  data () {
    return {
      code: ''
    }
  },
  props: ['isShow', 'ctrl', 'width', 'height'],
  mounted () {
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
  },
  methods: {
    handleBodyClick (e) {
      e.stopPropagation()
      if (typeof this.ctrl === 'undefined') { return }
      if (!this.ctrl.contains(e.target) && !this.$refs.code.contains(e.target)) {
        this.code = ''
        this.$emit('closeEvent')
      }
    },
    close () {
      this.code = ''
      this.$emit('closeEvent')
    },
    submit () {
      if (this.code === '') {
        document.getElementById('codeInput').focus()
        this.$pop('请输入代码', 'shake')
        return
      }
      this.$emit('addEvent', this.code)
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
