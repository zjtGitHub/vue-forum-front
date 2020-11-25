<template>
  <div v-if="isShow" class="tips animation">{{ msg }}</div>
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
  }
}
</script>

<style lang="scss" scope>
.tips {
  position: fixed;
  top: 50%;
  left: 50%;
}
</style>
