<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <li class="layui-nav-item layui-nav-itemed" v-for="(item, index) in list" :key="index">
        <router-link :to="{name: item.link}" :active-class="item.activeClass">
          <i class="layui-icon" :class="item.icon"></i>
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Center',
  data () {
    return {
      list: [
        {
          name: '我的主页',
          icon: 'layui-icon-home',
          link: 'home'
        },
        {
          name: '用户中心',
          icon: 'layui-icon-friends',
          link: 'center'
        },
        {
          name: '基本设置',
          icon: 'layui-icon-set',
          link: 'info',
          activeClass: 'layui-this'
        },
        {
          name: '我的帖子',
          icon: 'layui-icon-form',
          link: 'mypost',
          activeClass: 'layui-this'
        },
        {
          name: '我的消息',
          icon: 'layui-icon-reply-fill',
          link: 'msg'
        },
        {
          name: '其他设置',
          icon: 'layui-icon-component',
          link: 'others'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-icon {
  margin-right: 10px;
}
</style>
