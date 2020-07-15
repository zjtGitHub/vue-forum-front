<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
        <a :class="{'layui-this': status === '' && tags === ''}" @click.prevent="search()">综合</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this': status === '0'}" @click.prevent="search(0)">未结</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this': status === '1'}" @click.prevent="search(1)">已结</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this': status === '' && tags === '精华'}" @click.prevent="search(2)">精华</a>
        <span class="fly-filter-right layui-hide-xs">
          <a :class="{'layui-this': sort === 'created'}" @click.prevent="search(3)">按最新</a>
          <span class="fly-mid"></span>
          <a :class="{'layui-this': sort === 'answer'}" @click.prevent="search(4)">按热议</a>
        </span>
      </div>
    <list-item></list-item>
  </div>
</template>

<script>
import ListItem from './ListItem'
export default {
  name: 'list',
  data () {
    return {
      status: 0,
      tags: '精华',
      sort: 'created'
    }
  },
  components: {
    ListItem
  },
  methods: {
    search (val) {
      switch (val) {
        case 0:
          this.status = '0'
          this.tags = ''
          break
        case 1:
          this.status = '1'
          this.tags = ''
          break
        case 2:
          this.status = ''
          this.tags = '精华'
          break
        case 3:
          this.sort = 'created'
          break
        case 4:
          this.sort = 'answer'
          break
        default:
          this.status = ''
          this.tags = ''
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .fly-panel-title {
    a {
      cursor: pointer!important;
    }
  }

</style>
