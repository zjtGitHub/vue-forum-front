<template>
  <div>
    <my-panel></my-panel>
    <router-view></router-view>
  </div>
</template>

<script>
import Panel from '@/components/Panel'

export default {
  name: 'home',
  components: {
    'my-panel': Panel
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
