<template>
  <div>
    <my-panel></my-panel>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8 content detail">
          <div class="fly-panel detail-box">
            <h1>{{ page.title }}</h1>
            <div class="fly-detail-info">
              <!-- <span class="layui-badge">审核中</span> -->

              <span class="layui-badge layui-bg-green fly-detail-column">{{
                page.catalog
              }}</span>

              <span
                class="layui-badge"
                style="background-color: #999"
                v-if="page.isEnd"
                >未结</span
              >
              <!-- <span class="layui-badge" style="background-color: #5FB878;">已结</span> -->

              <span class="layui-badge layui-bg-black" v-if="page.isTop"
                >置顶</span
              >
              <span class="layui-badge layui-bg-red" v-if="page.isTop"
                >精帖</span
              >

              <!-- <div class="fly-admin-box">
                <span class="layui-btn layui-btn-xs jie-admin" type="del"
                  >删除</span
                >

                <span
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set"
                  field="stick"
                  rank="1"
                  >置顶</span
                >
                <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span>

                <span
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set"
                  field="status"
                  rank="1"
                  >加精</span
                >
                <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span>
              </div> -->
              <span class="fly-list-nums">
                <a href="#comment"
                  ><i class="iconfont" title="回答">&#xe60c;</i>
                  {{ page.answer }}</a
                >
                <i class="iconfont" title="人气">&#xe60b;</i> {{ page.reads }}
              </span>
            </div>
            <!-- 帖子信息 作者信息 -->
            <div class="detail-about">
              <a class="fly-avatar">
                <img
                  :src="
                    page.user ? page.user.pic : require('@/assets/logo.png')
                  "
                />
              </a>
              <div class="fly-detail-user">
                <a class="fly-link">
                  <cite>{{ page.user.name }}</cite>
                  <i
                    class="iconfont icon-renzheng"
                    v-if="page.user && page.user.isVip !== '0'"
                  ></i>
                  <i
                    class="layui-badge fly-badge-vip"
                    v-if="page.user && page.user.isVip !== '0'"
                    >VIP{{ page.user.isVip }}</i
                  >
                </a>
                <span>{{ page.created }}</span>
              </div>
              <div class="detail-hits">
                <span style="padding-right: 10px; color: #ff7200"
                  >悬赏：{{ page.fav }}飞吻</span
                >
              </div>
            </div>
            <div class="layui-btn-container fly-detail-admin">
              <a href class="layui-btn layui-btn-sm jie-admin">编辑</a>
              <a href class="layui-btn layui-btn-sm jie-admin jie-admin-collect"
                >收藏</a
              >
            </div>
            <div class="detail-body photos">{{ page.content }}</div>
          </div>

          <div class="fly-panel detail-box" id="flyReply">
            <fieldset
              class="layui-elem-field layui-field-title"
              style="text-align: center"
            >
              <legend>回帖</legend>
            </fieldset>

            <ul class="jieda" id="jieda">
              <li
                class="jieda-daan"
                v-for="(item, index) in comments"
                :key="index"
              >
                <a name="item-1111111111"></a>
                <div class="detail-about detail-about-reply">
                  <a class="fly-avatar">
                    <img :src="item.pic" />
                  </a>
                  <div class="fly-detail-user">
                    <a href="" class="fly-link">
                      <cite>{{ item.name }}</cite>
                      <i
                        class="iconfont icon-renzheng"
                        v-if="item.user && item.user.isVip !== '0'"
                      ></i>
                      <i
                        class="layui-badge fly-badge-vip"
                        v-if="item.user && item.user.isVip !== '0'"
                        >VIP{{ item.user.isVip }}</i
                      >
                    </a>

                    <span v-if="index === 0">(楼主)</span>
                    <!--
                <span style="color:#5FB878">(管理员)</span>
                <span style="color:#FF9E3F">（社区之光）</span>
                <span style="color:#999">（该号已被封）</span>
                -->
                  </div>

                  <div class="detail-hits">
                    <span>{{ item.created }}</span>
                  </div>

                  <i class="iconfont icon-caina" title="最佳答案"></i>
                </div>
                <div class="detail-body jieda-body photos">
                  <p>香菇那个蓝瘦，这是一条被采纳的回帖</p>
                </div>
                <div class="jieda-reply">
                  <span class="jieda-zan zanok" type="zan">
                    <i class="iconfont icon-zan"></i>
                    <em>66</em>
                  </span>
                  <span type="reply">
                    <i class="iconfont icon-svgmoban53"></i>
                    回复
                  </span>
                  <div class="jieda-admin">
                    <span type="edit">编辑</span>
                    <span type="del">删除</span>
                    <!-- <span class="jieda-accept" type="accept">采纳</span> -->
                  </div>
                </div>
              </li>

              <!-- 无数据时 -->
              <li class="fly-none" v-if="comments.length">消灭零回复</li>
            </ul>
            <my-pagination :total="100"></my-pagination>
            <div class="layui-form layui-form-pane">
              <my-Editor :initContent="content"></my-Editor>
              <validation-provider
                rules="required|length:4"
                ref="codefield"
                v-slot="{ errors }"
                name="验证码"
              >
                <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_vercode" class="layui-form-label"
                      >验证码</label
                    >
                    <div class="layui-input-inline">
                      <input
                        v-model="code"
                        type="text"
                        id="L_vercode"
                        name="code"
                        placeholder="请输入验证码"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class="layui-form-mid" style="padding: 0 !important">
                      <span
                        class="svg"
                        style="color: #c00"
                        @click="_getCode()"
                        v-html="svg"
                      />
                    </div>
                  </div>
                  <div class="error layui-form-mid">
                    {{ errors[0] }}
                  </div>
                </div>
              </validation-provider>
              <div class="layui-form-item">
                <button class="layui-btn" type="submit">提交回复</button>
              </div>
            </div>
          </div>
        </div>
        <div class="layui-col-md4">
          <my-hotlist></my-hotlist>

          <my-ads></my-ads>

          <my-links></my-links>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import Panel from '@/components/Panel'
import Editor from '../modules/editer/index'
import Pagination from '../modules/pagination/Page'
import CodeMix from '@/mixin/code'
import { addPost, getDetail } from '@/api/content'
import { getCommentList } from '@/api/comments'
export default {
  name: 'Detail',
  mixins: [CodeMix],
  components: {
    'my-hotlist': HotList,
    'my-links': Links,
    'my-ads': Ads,
    'my-panel': Panel,
    'my-Editor': Editor,
    'my-pagination': Pagination
  },
  data () {
    return {
      content: '',
      size: 10,
      current: 2,
      page: {},
      comments: []
    }
  },
  props: ['tid'],
  mounted () {
    this.getDetail()
    this.getCommentList()
  },
  methods: {
    async onSubmit () {
      if (this.content.trim() === '') {
        this.$alert('文章内容不得为空!')
        return
      }
      addPost({
        title: this.title,
        catalog: this.catalogs[this.cataIndex].value,
        content: this.content,
        fav: this.favList[this.favIndex],
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          this.$alert('帖子发表成功!')
          localStorage.setItem('saveData', '')
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        } else {
          this.$alert(res.msg)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getCommentList () {
      getCommentList().then((res) => {

      })
    },
    getDetail () {
      getDetail(this.tid).then((res) => {
        if (res.code === 200) {
          this.page = res.data
        }
      }).catch((err) => {
        console.log(err)
        this.$router.push('/404')
      })
    }
  }
}
</script>

<style scoped lang="scss">
.fly-detail-admin {
  background: #f8f8f8;
  text-align: right;
  padding-top: 10px;
  border-top: 1px dotted #eaeaea;
}
.fly-detail-info {
  span {
    margin-right: 5px;
  }
}
</style>
