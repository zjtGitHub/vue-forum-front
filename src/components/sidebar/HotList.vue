<template>
  <div>
    <dl class="fly-panel fly-list-one">
      <dt class="fly-panel-title">本周热议</dt>
      <dd v-for="(item, index) in list" :key="index">
        <!-- <router-link :to="{name: 'detail', params: {tid: item._id}}">{{item.title}}</router-link> -->
        <router-link :to="{name: 'detail', params: {tid: item.href}}">{{item.title}}</router-link>
        <a :href="item.href">{{item.title}}</a>
        <!-- <span>
          <i class="iconfont icon-pinglun1"></i>
          {{item.title}}
        </span>-->
      </dd>
    </dl>
  </div>
</template>

<script>
import { getTop } from '@/api/content'
import axios from '@/utils/request'
export default {
  name: 'hotlist',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getList1()
  },
  methods: {
    getList1 () {
      axios.get('/test/news').then((res) => {
        this.list = res
      // if (res.code === 200) {
      //   this.list = res
      // }
      })
    },
    getList () {
      getTop().then((res) => {
        if (res.code === 200) {
          this.list = res
        }
      })
    }
  }
}
</script>

<style>
</style>
