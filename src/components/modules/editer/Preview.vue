<template>
  <transition name="bounce">
    <div
      id="preview"
      class="layui-layer-page layui-layer-prompt edit-content"
      v-show="isShow"
      ref="links"
    >
      <div class="layui-layer-title">预览</div>
      <div class="layui-layer-content">
        <div class="detailBody" v-html="replaceContent"></div>
      </div>
      <span class="layui-layer-setwin" @click="close">
        <a
          href="javascript:void(0)"
          class="layui-layer-ico layui-layer-close layui-layer-close1"
        ></a>
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
  watch: {
    isShow (newval, oldval) {
      if (newval) {
        this.$store.commit('setHide', true)
      } else {
        this.$store.commit('setHide', false)
      }
    }
  },
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

<style lang="scss">
#preview {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #ffffff;
  top: 60px;
  left: 0;
  overflow: auto;
}

pre {
  position: relative;
  margin: 10px 0;
  padding: 15px;
  line-height: 20px;
  background: #f2f2f2;
  color: #333;
  font-family: "Courier New", Courier, monospace, serif;
  font-size: 12px;
  border: none;
  border-left: 5px solid #ddd;
}
</style>
