<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <my-list></my-list>
      </div>
      <div class="layui-col-md4">
        <my-hotlist></my-hotlist>
        <my-ads></my-ads>
        <my-links></my-links>
      </div>
    </div>
  </div>
</template>

<script>
import Ads from '@/components/sidebar/Ads'
import HotList from '@/components/sidebar/HotList'
import Links from '@/components/sidebar/Links'
import List from '@/components/content/List'
export default {
  name: 'template1',
  components: {
    'my-ads': Ads,
    'my-hotlist': HotList,
    'my-links': Links,
    'my-list': List
  }
}
</script>

<style scoped>

</style>
