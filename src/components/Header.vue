<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a class="fly-logo" href="/">
        <img src="@/assets/logo.png" alt="layui" />
      </a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <!-- <li class="layui-nav-item layui-this">
          <a href="/"><i class="iconfont icon-jiaoliu"></i>交流</a>
        </li>
        <li class="layui-nav-item">
          <a href="case/case.html"><i class="iconfont icon-iconmingxinganli"></i>案例</a>
        </li>
        <li class="layui-nav-item">
          <a href="/" target="_blank"><i class="iconfont icon-ui"></i>框架</a>
        </li>-->
      </ul>

      <ul class="layui-nav fly-nav-user">
        <template v-if="!isLogin">
          <!-- 未登入的状态 -->
          <li class="layui-nav-item">
            <a class="iconfont icon-touxiang layui-hide-xs"></a>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name: 'login'}">登入</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name: 'reg'}">注册</router-link>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href
              onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
              title="QQ登入"
              class="iconfont icon-qq"
            ></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href
              onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
              title="微博登入"
              class="iconfont icon-weibo"
            ></a>
          </li>
        </template>

        <template v-else>
          <!-- 登入后的状态 -->
          <li class="layui-nav-item" v-if="isLogin" @mouseover="show()" @mouseleave="hide()">
            <a class="fly-nav-avatar" href="javascript:;" >
              <cite class="layui-hide-xs">{{ userInfo.name }}</cite>
              <i
                class="layui-badge fly-badge-vip layui-hide-xs"
                v-show="userInfo.isVip !== '0'"
              >{{ 'VIP' + userInfo.isVip }}</i>
              <img :src="userInfo.pic" />
            </a>
            <dl
              class="layui-nav-child layui-anim layui-anim-scaleSpring"
              :class="{'layui-show': isHover}"
            >
              <dd>
                <router-link :to="{ name: 'center' }">
                  <i class="layui-icon">&#xe620;</i>基本设置
                </router-link>
              </dd>
              <dd>
                <router-link :to="{ name: 'center' }">
                  <i class="iconfont icon-tongzhi" style="top: 4px;"></i>我的消息
                </router-link>
              </dd>
              <dd>
                <router-link :to="{ name: 'center' }">
                  <i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页
                </router-link>
              </dd>
              <hr style="margin: 5px 0;" />
              <dd>
                <a href="javascript:;" @click="logout" style="text-align: center;">退出</a>
              </dd>
            </dl>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      isHover: false,
      hoverCtrl: {}
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    show () {
      console.log('show')
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = true
      }, 200)
    },
    hide () {
      console.log('hide')
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = false
      }, 300)
    },
    logout () {
      this.$confirm('确定退出?', () => {
        localStorage.clear()
        this.$store.commit('setToken', '')
        this.$store.commit('setLogin', false)
        this.$store.commit('setUserInfo', '')
        this.$router.push('/')
        location.reload()
      })
    }
  }
}
</script>

<style scoped>
.fly-logo img {
  width: 45px;
}
</style>
