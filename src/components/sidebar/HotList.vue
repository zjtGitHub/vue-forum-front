<template>
  <div>
    <dl class="fly-panel fly-list-one">
      <dt class="fly-panel-title">本周热议</dt>
      <dd v-for="(item, index) in topList" :key="index">
        <router-link :to="{name: 'detail', params: {tid: item._id,type: 'post'}}">{{item.title}}</router-link>
        <span>
          <i class="iconfont icon-pinglun1"></i>
          {{item.title}}
        </span>
      </dd>
    </dl>
    <dl class="fly-panel fly-list-one">
      <dt class="fly-panel-title">前日头条</dt>
      <dd v-for="(item, index) in list" :key="index">
        <a href="javascript:;" @click="toDetail(item)">{{item.title}}</a>
        <!-- <router-link
          :to="{name: 'detail', params: {tid: { id: item._id,type: 'news'}}}"
        >{{item.title}}</router-link>-->
      </dd>
    </dl>
  </div>
</template>

<script>
import { getTop, getHeadlines } from '@/api/content'
// import axios from '@/utils/request'
export default {
  name: 'hotlist',
  data () {
    return {
      list: [],
      topList: []
    }
  },
  mounted () {
    this.getList1()
    this.getList()
  },
  methods: {
    getList1 () {
      getHeadlines().then((res) => {
        this.list = res.data.data
      // if (res.code === 200) {
      //   this.list = res
      // }
      })
    },
    getList () {
      getTop().then((res) => {
        if (res.code === 200) {
          this.topList = res.data
        }
      })
    },
    toDetail (item) {
      this.$router.push({
        name: 'detail',
        params: {
          tid: item._id,
          type: 'news'
        }

      })
    }
  }
}
</script>

<style>
</style>
