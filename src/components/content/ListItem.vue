<template>
  <div>
    <ul class="fly-list">
      <li v-for="(item, index) in listItem" :key="'item'+ index">
        <a href="user/home.html" class="fly-avatar">
          <img
            src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"
            alt="贤心"
          />
        </a>
        <h2>
          <a class="layui-badge">{{ catalog }}</a>
          <a href="jie/detail.html">{{ item.title }}</a>
        </h2>
        <div class="fly-list-info">
          <a href="user/home.html" link>
            <cite>{{ item.user.id }}</cite>
            <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
            <i class="layui-badge fly-badge-vip">{{ 'VIP' + item.user.isVip }}</i>
          </a>
          <span>{{ item.created }}</span>

          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻">
              <i class="iconfont icon-kiss"></i>{{ item.fav }}
            </span>
            <span class="layui-badge fly-badge-accept layui-hide-xs" v-show="item.status !== '0'">已结</span>
          <span class="fly-list-nums">
              <i class="iconfont icon-pinglun1" title="回答"></i> {{ item.answer }}
            </span>
        </div>
        <div class="fly-list-badge">
          <span class="layui-badge layui-bg-red" v-for="(item, index) in item.tags" :key="'tag'+ index">{{ item.name }}</span>
        </div>
      </li>
    </ul>
    <div style="text-align: center" v-show="isShow">
      <div class="laypage-main">
        <a href="jie/index.html" class="laypage-next" @click="more">更多求解</a>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'dayjs'
export default {
  name: 'ListItem',
  props: {
    list: {
      default: () => [],
      type: Array
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    listItem () {
      return this.list
    },
    catalog () {
      const item = this.list.catalog
      switch (item) {
        case 'ask':
          return '提问'
        case 'share':
          return '分享'
        case 'logs':
          return '动态'
        case 'discuss':
          return '交流'
        case 'advise':
          return '建议'
        case 'notice':
          return '公告'
        default:
          return '全部'
      }
    }
  },
  methods: {
    more () {
      this.$emit('nextPage')
    }
  },
  filters: {
    moment (date) {
      if (moment(date).isBefore(moment().subtract()(7, 'days'))) {
        return moment(date).format('YYYY-MM-DD')
      } else {
        return moment(date).from(date)
      }
    }
  }
}
</script>

<style scoped>

</style>
