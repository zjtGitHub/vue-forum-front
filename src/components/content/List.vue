<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
        <a :class="{'layui-this': status === '' && tag === ''}" @click.prevent="search()">综合</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this': status === '0'}" @click.prevent="search(0)">未结</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this': status === '1'}" @click.prevent="search(1)">已结</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this': status === '' && tag === '精华'}" @click.prevent="search(2)">精华</a>
        <span class="fly-filter-right layui-hide-xs">
          <a :class="{'layui-this': sort === 'created'}" @click.prevent="search(3)">按最新</a>
          <span class="fly-mid"></span>
          <a :class="{'layui-this': sort === 'answer'}" @click.prevent="search(4)">按热议</a>
        </span>
      </div>
    <list-item :list="list" :isEnd="isEnd" @nextPage="nextPage"></list-item>
  </div>
</template>

<script>
import { getList } from '@/api/content'
import ListItem from './ListItem'
export default {
  name: 'list',
  data () {
    return {
      isEnd: false,
      isRepeat: false,
      status: '',
      tag: '',
      sort: 'created',
      page: 0,
      limit: 20,
      catalog: '',
      list: [],
      current: ''
    }
  },
  components: {
    ListItem
  },
  watch: {
    current (n, o) {
      this.init()
    },
    '$route' (n, o) {
      const catalog = this.$route.params.catalog
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }
      this.status = ''
      this.tag = ''
      this.init()
    }
  },
  mounted () {
    this._getList()
  },
  methods: {
    // 查询初始化
    init () {
      this.page = 0
      this.list = []
      this.isEnd = false
      this._getList()
    },
    nextPage () {
      this.page++
      this._getList()
    },
    _getList () {
      // 请求锁，每次请求时变为true，请求成功后变为false，只有为false时才发起请求
      // if (this.isRepeat) return
      if (this.isEnd) return
      this.isRepeat = true
      const options = {
        isTop: 0,
        page: this.page,
        catalog: this.catalog,
        status: this.status,
        tag: this.tag,
        sort: this.sort,
        limit: this.limit
      }
      getList(options).then((res) => {
        if (res.code === 200) {
          this.isRepeat = false
          // 如果小于20条则不向后台发送请求
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.list.length === 0) {
            console.log(res)
            this.list = res.data
          } else {
            this.list = this.list.concat(res.data)
          }
        }
      }).catch((err) => {
        if (err) {
          console.log(err.response)
          this.$alert(err.response.data.msg)
        }
      })
    },
    /**
     * 文章状态查询
     */
    search (val) {
      if (typeof val === 'undefined' && this.current === '') {
        return
      }
      this.current = val
      console.log(val)
      switch (val) {
        case 0: // 未结
          this.status = '0'
          this.tag = ''
          break
        case 1: // 已结
          this.status = '1'
          this.tag = ''
          break
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        case 3: // 按创建时间排序
          this.sort = 'created'
          break
        case 4: // 按热议排序
          this.sort = 'answer'
          break
        default:
          this.status = ''
          this.tag = ''
          this.current = ''
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
