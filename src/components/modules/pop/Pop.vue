<template>
  <div v-show="isShow" class="tips animation" :class="{'shake': type === 'shake'}" ref="tips">
    <div class="content">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: 'Pop',
  data () {
    return {

    }
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isShow (n, o) {
      if (n !== o && n === true) {
        setTimeout(() => {
          const height = this.$refs.tips.clientHeight
          const width = this.$refs.tips.clientWidth
          this.$refs.tips.style.marginLeft = -(width / 2) + 'px'
          this.$refs.tips.style.marginTop = -(height / 2) + 'px'
        }, 0)
        setTimeout(() => {
          this.msg = ''
          this.type = ''
          this.isShow = false
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }

  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px)
  }

  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
}

.tips {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
}
.animation {
  animation-duration: .3s;
  animation-fill-mode: both;
}
.content {
  background: rgba(0,0,0,0.4);
  color: #ffffff;
  padding: 10px 15px;
  border-radius: 6px;
}
.shake {
  animation-name: shake;
}
</style>
