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
    <list-item :list="list" @nextPage="nextPage"></list-item>
  </div>
</template>

<script>
import { getList } from '@/api/content'
import ListItem from './ListItem'
export default {
  name: 'list',
  data () {
    return {
      status: 0,
      tags: '精华',
      sort: 'created',
      page: 0,
      limit: 20,
      catalog: '',
      list: [
        {
          tid: '1',
          title: '帖子的标题',
          catalog: 'index',
          fav: '888',
          created: '2020-06-15 00:00:00',
          isEnd: '0',
          isTop: '0',
          sort: '0',
          answer: '666',
          status: '1',
          tags: [
            {
              name: '精品'
            },
            {
              name: 'asdads'
            }
          ],
          user: {
            id: '用户id',
            isVip: '2',
            name: '用户昵称',
            pic: '用户头像'
          }
        },
        {
          tid: '1',
          title: '帖子的标题',
          catalog: 'index',
          fav: '888',
          created: '2020-06-15 00:00:00',
          isEnd: '0',
          isTop: '0',
          sort: '0',
          answer: '666',
          status: '1',
          tags: [
            {
              name: '精品'
            },
            {
              name: 'asdads'
            }
          ],
          user: {
            id: '用户id',
            isVip: '2',
            name: '用户昵称',
            pic: '用户头像'
          }
        },
        {
          tid: '1',
          title: '帖子的标题',
          catalog: 'index',
          fav: '888',
          created: '2020-06-15 00:00:00',
          isEnd: '0',
          isTop: '0',
          sort: '0',
          answer: '666',
          status: '1',
          tags: [
            {
              name: '精品'
            },
            {
              name: 'asdads'
            }
          ],
          user: {
            id: '用户id',
            isVip: '2',
            name: '用户昵称',
            pic: '用户头像'
          }
        },
        {
          tid: '1',
          title: '帖子的标题',
          catalog: 'index',
          fav: '888',
          created: '2020-06-15 00:00:00',
          isEnd: '0',
          isTop: '0',
          sort: '0',
          answer: '666',
          status: '1',
          tags: [
            {
              name: '精品'
            },
            {
              name: 'asdads'
            }
          ],
          user: {
            id: '用户id',
            isVip: '2',
            name: '用户昵称',
            pic: '用户头像'
          }
        }

      ]
    }
  },
  components: {
    ListItem
  },
  mounted () {
    this._getList(options)
  },
  methods: {
    nextPage () {
      this.page++
      this._getList()
    },
    _getList (options) {
      getList(options).then((res) => {
        if (res.code === 200) {
          if (this.list.length === 0) {
            this.list = res.data
          } else {
            this.list = res.data.concat(res.data)
          }
        }
      }).catch((err) => {
        if (err) {
          this.$alert(err.msg)
        }
      })
    },
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
