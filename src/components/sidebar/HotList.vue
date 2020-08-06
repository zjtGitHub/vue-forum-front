<template>
  <div>
    <dl class="fly-panel fly-list-one">
      <dt class="fly-panel-title">本周热议</dt>
      <dd v-for="(item, index) in list" :key="index">
        <a>{{item.title}}</a>
        <span>
          <i class="iconfont icon-pinglun1"></i> {{item.answer}}
        </span>
      </dd>
    </dl>
  </div>
</template>

<script>
import { getTop } from '@/api/content'
export default {
  name: 'hotlist',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    getTop().then((res) => {
      if (res.code === 200) {
        this.list = res.data
      }
    })
  }
}
</script>

<style>
</style>
