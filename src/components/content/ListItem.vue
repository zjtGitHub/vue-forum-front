<template>
  <div>
    <ul class="fly-list">
      <li v-for="(item, index) in listItem" :key="'item' + index">
        <a class="fly-avatar">
          <img :src="item.uid.pic" alt="头像" />
        </a>
        <h2>
          <a class="layui-badge">{{ catalog }}</a>
          <a @click.prevent="toDetail(item)" class="pointer">
            {{
            item.title
            }}
          </a>
        </h2>
        <div class="fly-list-info">
          <router-link :to="{name: 'home', params: {uid: item.uid._id}}">
            <cite>{{ item.uid.id }}</cite>
            <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
            <i class="layui-badge fly-badge-vip">
              {{
              "VIP" + item.uid.isVip
              }}
            </i>
          </router-link>
          <span>{{ item.created | moment }}</span>

          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻">
            <i class="iconfont icon-kiss"></i>
            {{ item.fav }}
          </span>
          <span class="layui-badge fly-badge-accept layui-hide-xs" v-show="item.status === '1'">已结</span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i>
            {{ item.answer }}
          </span>
        </div>
        <div class="fly-list-badge" v-show="item.tags.length > 0 && item.tags[0].name !== ''">
          <span
            class="layui-badge layui-bg-red"
            v-for="(tag, index) in item.tags"
            :key="'tag' + index"
          >{{ tag.name }}</span>
        </div>
      </li>
    </ul>
    <div style="text-align: center" v-show="isShow">
      <div class="laypage-main" v-if="!isEnd">
        <a class="laypage-next pointer" @click.prevent="more">更多求解</a>
      </div>
      <div class="nomore gray" v-else>没有更多了</div>
    </div>
  </div>
</template>

<script>
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
    },
    isEnd: {
      type: Boolean,
      default: false
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
    },
    toDetail (item) {
      this.$router.push(`/detail/${item._id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.nomore {
  font-size: 16px;
  padding: 30px 0;
}
.pointer {
  cursor: pointer;
}
</style>
