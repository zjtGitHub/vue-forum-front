<template>
<div class="edit-wrap">
  <div class="layui-form-item layui-form-text">
    <div class="layui-input-block">
      <div class="layui-unselect fly-edit">
        <span>
          <i class="iconfont icon-yxj-expression"></i>
        </span>
        <span>
          <i class="iconfont icon-tupian"></i>
        </span>
        <span>
          <i class="iconfont icon-lianjie"></i>
        </span>
        <span>
          <span class="quote">"</span>
        </span>
        <span>
          <i class="iconfont icon-emwdaima"></i>
        </span>
        <span>hr</span>
        <span>
          <i class="iconfont icon-yulan1"></i>
        </span>
      </div>
      <textarea class="layui-textarea fly-editor" name="content"></textarea>
    </div>
  </div>
  <face></face>
</div>
</template>

<script>
import face from './face'
export default {
  name: 'Editor',
  components: {
    face
  }
}
</script>

<style scoped lang="scss">
.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}
.fly-editor {
  height: 260px;
}

</style>
