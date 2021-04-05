<template>
  <div>
    <div class="overflow">
      <table class="layui-table" border="0">
        <thead>
          <tr class="layui-table-header">
            <th>
              <div class="layui-table-cell pl0">
                <span>帖子标题</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell">
                <span>状态</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell">
                <span>结帖</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell">
                <span>发表时间</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell">
                <span>数据</span>
              </div>
            </th>
            <th class="min-cell">
              <div class="layui-table-cell">
                <span>操作</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" >
            <td class="text-left">a
              <a>asd</a>
            </td>
            <td>打开</td>
            <td class="success">未结</td>
            <td>666</td>
            <td>5阅/5答</td>
            <td>
              <div
                class="layui-btn layui-btn-xs"
              >编辑</div>
              <div class="layui-btn layui-btn-xs layui-btn-danger">删除</div>
            </td>
          </tr>
        </tbody>
      </table>
      <my-pagination
        v-show="total > 0"
        :total="total"
        :current="current"
        :align="'left'"
        :hasTotal="true"
        :hasSelect="true"
        @changeCurrent="handleChange"
    ></my-pagination>
    </div>

  </div>
</template>

<script>
import { getPostListByUid, deletePostByUid } from '@/api/User'
import Pagination from '@/components/modules/pagination/Page'
export default {
  name: 'MyPost',
  data () {
    return {
      list: [],
      total: 0,
      current: 0,
      page: 0,
      limit: 10
    }
  },
  components: {
    'my-pagination': Pagination
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      getPostListByUid({
        page: this.current,
        limit: this.limit
      }).then(res => {
        if (res.code === 200) {
          this.list = res.data
          this.total = res.total
        }
      })
    },
    deletePost (item) {
      this.$confirm('确定删除吗?', () => {
        if (item.isEnd !== '0') {
          this.$pop('帖子已结贴，无法删除！', 'shake')
          return
        }
        deletePostByUid({
          tid: item._id
        }).then((res) => {
          if (res.code === 200) {
            this.$pop('', '删除成功！')
            this.list.splice(this.list.indexOf(item), 1)
          } else {
            this.$pop(res.msg, 'shake')
          }
        })
      }, () => {

      })
    },
    handleChange (val) {
      this.current = val
      this.getCollectList()
    }

  }
}
</script>

<style lang="scss" scoped>
.overflow {
  overflow-y: auto;
}
.min-cell {
  min-width: 80px;
}
.layui-table-header {
  th {
    text-align: center;
    &:first-child {
      text-align: left;
    }
  }
}
</style>
