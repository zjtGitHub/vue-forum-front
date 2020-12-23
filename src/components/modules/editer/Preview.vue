<template>
  <transition name="bounce">
    <div id="preview" class="layui-layer-page layui-layer-prompt edit-content" v-show="isShow" ref="links">
      <div class="layui-layer-title">预览</div>
      <div class="layui-layer-content">
        <div class="detailBody" v-html="replaceContent"></div>
      </div>
      <span class="layui-layer-setwin" @click="close">
        <a href="javascript:void(0)" class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
    </div>
  </transition>
</template>

<script>
import { escapeHtml } from '@/utils/escapeHtml'
export default {
  name: 'Preview',
  data () {
    return {

    }
  },
  props: ['isShow', 'content'],
  methods: {
    close () {
      this.$emit('closeEvent')
    }
  },
  computed: {
    replaceContent () {
      if (typeof this.content === 'undefined' || this.content.trim() === '') {
        return
      }
      return escapeHtml(this.content)
    }
  }
}
</script>

<style scoped lang="scss">
#preview {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #ffffff;
  top: 60px;
  left: 0;
}

</style>
