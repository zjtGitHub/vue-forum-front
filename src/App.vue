<template>
  <div id="app">
    <imooc-header></imooc-header>
    <router-view></router-view>
    <imooc-footer></imooc-footer>
  </div>
</template>

<script>
// import axios from 'axios'
// import { ValidationProvider, extend } from 'vee-validate'
// import * as rules from 'vee-validate/dist/rules'
// import zh from 'vee-validate/dist/locale/zh_CN.json'
//
// for (const rule in rules) {
//   extend(rule, {
//     ...rules[rule],
//     message: zh.messages[rule]
//   })
// }
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    'imooc-header': Header,
    'imooc-footer': Footer
  }
}
</script>

<style lang="scss">
  @import "assets/layui/css/layui.css";
  @import "assets/css/global.css";
  @import "assets/layui/css/modules/layer/default/layer.css";
</style>
