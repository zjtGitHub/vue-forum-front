<template>
  <div>
    <table class="layui-table">
      <thead>
        <tr>
          <th class="title">
            <div class="layui-table-cell pl0">
              <span>帖子标题</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell text-right pr0">
              <span>收藏时间</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in list" :key="index">
          <td class="title">
            <router-link class="link" :to="{name: 'detail', params: {tid: item.tid}}">{{item.title}}</router-link>
          </td>
          <td class="text-right">{{item.created | moment}}</td>
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
</template>

<script>
import { getCollect } from '@/api/User'
import Pagination from '@/components/modules/pagination/Page'
export default {
  name: 'my-collection',
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
      getCollect({
        page: this.current,
        limit: this.limit
      }).then(res => {
        if (res.code === 200) {
          this.list = res.data
          this.total = res.total
        }
      })
    },
    handleChange (val) {
      this.current = val
      this.getCollectList()
    }

  }
}
</script>

<style>

</style>
