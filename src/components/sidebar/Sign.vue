<template>
  <div class="fly-panel fly-signin">
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a href="javascript:;" class="fly-link" @click="showInfo">说明</a>
      <i class="fly-mid"></i>
      <a href="javascript:;" class="fly-link" @click="showTop">
        活跃榜
        <span class="layui-badge-dot"></span>
      </a>
      <span class="fly-signin-days" v-if="isSign || isLogin">
        已连续签到
        <cite>{{ count }}</cite>天
      </span>
    </div>
    <div class="fly-panel-main fly-signin-main">
      <template v-if="!isSign">
        <button class="layui-btn layui-btn-danger" @click="signIn">今日签到</button>
        <span>
          可获得
          <cite>{{ score }}</cite>飞吻
        </span>
      </template>
      <!-- 已签到状态 -->
      <template v-else>
        <button class="layui-btn layui-btn-disabled">今日已签到 倒计时：{{ countDown }}</button>
        <span>获得了<cite>{{ score }}</cite>飞吻</span>
      </template>

    </div>
    <sign-info :isShow="isShow" @closeModal="close"></sign-info>
    <sign-list :isShow="showList" @closeModal="close"></sign-list>
  </div>
</template>

<script>
import SignInfo from './SignInfo'
import SignList from './SignList'
import { signIn } from '@/api/User'
import moment from 'dayjs'
export default {
  name: 'sign',
  components: {
    SignInfo,
    SignList
  },
  data () {
    return {
      isShow: false,
      showList: false,
      current: 0,
      isLogin: this.$store.state.isLogin,
      isSign: false, // 是否签到
      countDown: '666'
    }
  },
  mounted () {
    const isSign = this.$store.state.userInfo.isSign
    const lastSign = this.$store.state.userInfo.lastSign
    const nowDate = moment().format('YYYY-MM-DD')
    // moment()传入undefined会返回当前时间，所以没有签到过也没有关系，不会报错
    const lastDate = moment(lastSign).format('YYYY-MM-DD')
    // 如果签到时间和当前时间相差一天并且当前isSign为true，说明是昨天签的到，当前时间过了十二点，刷新签到状态，可以签到。
    // 否则是没有签到或是当天签过到，签到状态和userInfo中的isSign相同。这种情况下，还要做区分，如果当前签过到要显示签到倒计时，没签过到则不显示。
    const diff = moment(nowDate).diff(moment(lastDate), 'day')
    if (diff > 0 && isSign) {
      this.isSign = false
    } else {
      if (isSign) {
        this.signCountdown()
      }
      this.isSign = isSign
    }
  },
  computed: {
    score () {
      const count = this.isSign ? this.count : this.count + 1
      let result = 0
      if (count < 5) {
        result = 5
      } else if (count >= 5 && count < 15) {
        result = 10
      } else if (count >= 15 && count < 30) {
        result = 20
      } else if (count >= 30 && count < 100) {
        result = 30
      } else if (count >= 100 && count < 365) {
        result = 40
      } else if (count >= 365) {
        result = 50
      }
      return result
    },
    count () {
      if (JSON.stringify(this.$store.state.userInfo) !== '{}' && typeof this.$store.state.userInfo.count !== 'undefined') {
        return this.$store.state.userInfo.count
      } else {
        return 0
      }
    }
  },
  watch: {
    isSign (n, o) {
      if (n) {
        this.signCountdown()
      }
    }
  },
  methods: {
    showInfo () {
      this.isShow = true
    },
    showTop () {
      this.showList = true
    },
    close () {
      this.isShow = false
      this.showList = false
    },
    signIn () {
      if (this.isLogin) {
        signIn().then((res) => {
          const userInfo = this.$store.state.userInfo
          if (res.code === 200) {
            this.$pop('签到成功！')
            userInfo.count = res.count
            userInfo.favs = res.favs
          } else {
            this.$pop('今日已签到！')
          }
          userInfo.isSign = true
          userInfo.lastSign = res.lastSign
          this.isSign = true
          this.$store.commit('setUserInfo', userInfo)
        }).catch((err) => {
          console.log(err)
        })
      } else {
        this.$pop('请先登录！', 'shake')
      }
    },
    // 签到倒计时
    signCountdown () {
      // 获取当前时间与当天最后时间的差值
      const nextDay = moment().add(1, 'day').format('YYYY-MM-DD')
      // const nextDay = moment('2020-11-27 17:03:00')
      const diff = moment(nextDay + '00:00:00').diff(moment(), 'second')
      const hour = Math.floor(diff / 3600)
      const min = Math.floor(diff % 3600 / 60)
      const second = diff % 60
      this.countDown = `${hour}:${min < 10 ? '0' + min : min}:${second < 10 ? '0' + second : second}`
      if (diff <= 0) {
        this.isSign = false
      }
      requestAnimationFrame(this.signCountdown)
    }

  }
}
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5)
  }
  100% {
    opacity: 1;
    transform: scale(1)
  }
}
.mask {
  background-color: rgba(0,0,0,0.8);
  z-index: 20000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.layui-layer {
  position: fixed;
  width: 300px;
  top: 50%;
  left: 50%;
  margin-top: -240px;
  margin-left: -150px;
  background: #fff;
  z-index: 20001;
  &.active {
    animation-fill-mode: both;
    animation-duration: 0.2s;
    animation-name: bounceIn;
  }
  .layui-layer-title {
    height: 42px;
    line-height: 42px;
    padding: 0 20px;
    color: #333;
    background-color: #f8f8f8;
  }
  .layui-layer-content {
    padding: 20px;
  }
  .layui-tab-content {
    padding: 0 10px;
  }
  .layui-tab-item {
    line-height: 45px;
    li {
      border-bottom: 1px dotted #dcdcdc;
      &:last-child {
        border-bottom: none;
      }
    }
    img {
      width: 30px;
      height: 30px;
      border-radius: 3px;
    }
  }
}
</style>
