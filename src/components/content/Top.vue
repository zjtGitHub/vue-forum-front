<template>
  <div class="fly-panel">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a
        href="#signin"
        class="layui-hide-sm layui-show-xs-block fly-right"
        id="LAY_goSignin"
        style="color: #FF5722;"
      >去签到</a>
    </div>
    <list-item></list-item>
  </div>
</template>

<script>
import ListItem from './ListItem'
export default {
  name: 'Top',
  components: {
    ListItem
  }
}
</script>

<style scoped>

</style>
