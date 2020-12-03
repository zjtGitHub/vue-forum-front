<template>
  <div class="layui-container flex">
    <img src="" alt="">
    <p>找不到页面</p>
    <router-link class="layui-btn" to="/">回到首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'notFound'
}
</script>

<style scoped lang="scss">
.flex {
  width: 100%;
  height: 400px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
p {
  padding-bottom: 15px;
  padding-top: 10px;
}
</style>
