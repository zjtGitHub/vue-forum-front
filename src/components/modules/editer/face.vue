<template>
  <transition name="bounce">
    <div
      class="layui-layer-tips layui-edit-face edit-content"
      v-if="isShow"
    >
      <div class="layui-layer-content">
        <ul class="layui-clear">
          <template v-for="(value, key) in list">
            <li :key="key" @click="handleFaceClick(key)">
              <img :src="value" alt=""  />
            </li>
          </template>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import face from '@/assets/js/face'
export default {
  name: 'face',
  data () {
    return {
      list: face
    }
  },
  props: ['isShow', 'ctrl'],
  mounted () {
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
  },
  methods: {
    handleFaceClick (key) {
      this.$emit('addFaceEvent', key)
    },
    handleBodyClick (e) {
      e.stopPropagation()
      if (typeof this.ctrl === 'undefined') { return }
      if (!this.ctrl.contains(e.target) && this.isShow) {
        this.$emit('closeEvent')
      }
    }
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style scoped lang="scss">

</style>
