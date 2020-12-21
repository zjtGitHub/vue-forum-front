<template>
  <div>
    <div class="layui-layer layui-layer-tips layui-edit-face">
      <div class="layui-layer-content">
        <ul class="layui-clear">
          <li v-for="(value, key) in list" :key="key">
            <img :src="value" alt="">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import face from '@/assets/js/face'
export default {
  name: 'face',
  data () {
    return {
      list: face
    }
  }
}
</script>

<style scoped lang="scss">

</style>
