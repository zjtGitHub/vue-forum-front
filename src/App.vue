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
  @import "assets/css/global.css";
  @for $i from 0 to 5 {
    .pd#{$i} {
      padding: $i * 10 + px!important;
    }
    .pl#{$i} {
      padding-left: $i * 10 + px!important;
    }
    .pr#{$i} {
      padding-right: $i * 10 + px!important;
    }
    .mr#{$i} {
      margin-right: $i * 10 + px!important;
    }
  }

  .gray {
    color: #999;
  }
  .orange {
    color: #ff5722;
  }
  .pull-right {
    float: right!important;
  }
</style>
