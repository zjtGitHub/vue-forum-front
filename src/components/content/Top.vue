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
      list: [
        {
          tid: '1',
          title: '帖子的标题',
          catalog: 'index',
          fav: '888',
          created: '2020-06-15 00:00:00',
          isEnd: '0',
          isTop: '1',
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
          isTop: '1',
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
          isTop: '1',
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
          isTop: '1',
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
