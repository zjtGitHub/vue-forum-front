<template>
  <div class="fly-panel" v-show="this.list.length > 0">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a
        href="#signin"
        class="layui-hide-sm layui-show-xs-block fly-right"
        id="LAY_goSignin"
        style="color: #FF5722;"
      >去签到</a>
    </div>
    <list-item :list="list" @nextPage="nextPage" :isShow="false"></list-item>
  </div>
</template>

<script>
import ListItem from './ListItem'
export default {
  name: 'Top',
  data () {
    return {
      status: 0,
      tags: '精华',
      sort: 'created',
      page: 0,
      limit: 20,
      catalog: '',
      list: []
    }
  },
  components: {
    ListItem
  },
  methods: {
    nextPage () {
      this.page++
      this._getList()
    },
    _getList () {

    }
  }
}
</script>

<style scoped>

</style>
