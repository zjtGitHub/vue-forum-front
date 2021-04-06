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

              <span class="layui-badge layui-bg-green fly-detail-column">
                {{
                page.catalog
                }}
              </span>

              <span class="layui-badge" style="background-color: #999" v-if="page.isEnd">未结</span>
              <!-- <span class="layui-badge" style="background-color: #5FB878;">已结</span> -->

              <span class="layui-badge layui-bg-black" v-if="page.isTop">置顶</span>
              <span class="layui-badge layui-bg-red" v-if="page.isTop">精帖</span>

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
              </div>-->
              <span class="fly-list-nums">
                <a href="#comment">
                  <i class="iconfont" title="回答">&#xe60c;</i>
                  {{ page.answer }}
                </a>
                <i class="iconfont" title="人气">&#xe60b;</i>
                {{ page.reads }}
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
                  <cite v-if="page.user">{{ page.user.name }}</cite>
                  <i class="iconfont icon-renzheng" v-if="page.user && page.user.isVip !== '0'"></i>
                  <i
                    class="layui-badge fly-badge-vip"
                    v-if="page.user && page.user.isVip !== '0'"
                  >VIP{{ page.user.isVip }}</i>
                </a>
                <span>{{ page.created | time }}</span>
              </div>
              <div class="detail-hits">
                <span style="padding-right: 10px; color: #ff7200">悬赏：{{ page.fav }}飞吻</span>
              </div>
            </div>
            <div class="layui-btn-container fly-detail-admin">
              <router-link
                v-if="!page.isEnd"
                :to="{name: 'edit',params: {tid: tid,page: page}}"
                class="layui-btn layui-btn-sm jie-admin"
              >编辑</router-link>
              <a
                class="layui-btn layui-btn-sm jie-admin-collect"
                :class="{'layui-btn-primary': page.isFav}"
                @click.prevent="setCollect()"
              >{{page.isFav ? '取消收藏': '收藏'}}</a>
            </div>
            <!-- 帖子详情 -->
            <div class="detail-body photos" v-richtext="page.content"></div>
          </div>
          <!-- ------------------------------------------------------------------------------------- -->
          <!-- 回复列表 -->
          <div class="fly-panel detail-box" id="flyReply">
            <fieldset class="layui-elem-field layui-field-title" style="text-align: center">
              <legend>回帖</legend>
            </fieldset>

            <ul class="jieda" id="jieda">
              <li class="jieda-daan" v-for="(item, index) in comments" :key="'commments' + index">
                <div class="detail-about detail-about-reply">
                  <a class="fly-avatar">
                    <img
                      :src="
                        item.cuid ? item.cuid.pic : require('@/assets/logo.png')
                      "
                    />
                  </a>
                  <div class="fly-detail-user">
                    <router-link :to="{name: 'home', params: {uid: item.cuid._id}}" link>
                      <cite v-if="item.cuid">{{ item.cuid.name }}</cite>
                      <i class="iconfont icon-renzheng" v-if="item.cuid && item.cuid.isVip !== '0'"></i>
                      <i
                        class="layui-badge fly-badge-vip"
                        v-if="item.cuid && item.cuid.isVip !== '0'"
                      >VIP{{ item.cuid.isVip }}</i>
                    </router-link>

                    <span v-if="item.cuid._id === page.user._id">(楼主)</span>
                    <!--
                <span style="color:#5FB878">(管理员)</span>
                <span style="color:#FF9E3F">（社区之光）</span>
                <span style="color:#999">（该号已被封）</span>
                    -->
                  </div>

                  <div class="detail-hits">
                    <span>{{ item.created | moment }}</span>
                  </div>

                  <i class="iconfont icon-caina" v-if="item.isBest === '1'" title="最佳答案"></i>
                </div>
                <!-- 评论内容 -->
                <div class="detail-body jieda-body photos">
                  <p v-richtext="item.content"></p>
                </div>
                <div class="jieda-reply">
                  <span
                    @click="setHands(item)"
                    class="jieda-zan"
                    :class="{ zanok: item.handed === '1' }"
                    type="zan"
                  >
                    <i class="iconfont icon-zan"></i>
                    <em>{{ item.hands }}</em>
                  </span>
                  <span type="reply" @click="reply(item)">
                    <i class="iconfont icon-svgmoban53"></i>
                    回复
                  </span>
                  <div class="jieda-admin">
                    <span
                      v-if="!page.isEnd && item.cuid._id === user._id"
                      @click="editReply(item)"
                    >编辑</span>
                    <span type="del">删除</span>
                    <span
                      v-if="!page.isEnd && page.user._id === user._id"
                      @click="setBest(item)"
                      class="jieda-accept"
                    >采纳</span>
                  </div>
                </div>
              </li>

              <!-- 无数据时 -->
              <li class="fly-none" v-if="comments.length === 0">消灭零回复</li>
            </ul>
            <my-pagination
              v-if="comments.length !== 0"
              :total="total"
              :current="current"
              :showEnd="true"
              :hasSelect="true"
              :hasTotal="true"
              @changeSize="handleChangeSize"
              @changeCurrent="handleChangeCurrent"
            ></my-pagination>

            <!-- 回复模块 -->
            <div class="layui-form layui-form-pane">
              <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmit)">
                  <my-Editor @changeContent="addContent" :initContent="editInfo.content"></my-Editor>
                  <validation-provider
                    rules="required|length:4"
                    ref="codefield"
                    v-slot="{ errors }"
                    name="验证码"
                  >
                    <div class="layui-form-item">
                      <div class="layui-row">
                        <label for="L_vercode" class="layui-form-label">验证码</label>
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
                            style="color: #c00; position: relative; top: -7px"
                            @click="_getCode()"
                            v-html="svg"
                          />
                        </div>
                      </div>
                      <div class="error layui-form-mid">{{ errors[0] }}</div>
                    </div>
                  </validation-provider>
                  <div class="layui-form-item">
                    <button class="layui-btn" type="submit">提交回复</button>
                  </div>
                </form>
              </ValidationObserver>
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
import { addCollect } from '@/api/User'
import { getDetail } from '@/api/content'
import { getCommentList, addComment, editComment, setBest, setHands } from '@/api/comments'
import { scrollToElem } from '@/utils/common'
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
      current: 0,
      total: 0,
      page: {},
      comments: [],
      editInfo: {
        content: '',
        code: '',
        sid: ''
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.userInfo
    }
  },
  props: ['tid'],
  mounted () {
    this.getDetail()
    this.getCommentList()
  },
  watch: {
    tid (newval, oldval) {
      this.getDetail()
      this.getCommentList()
    }
  },
  methods: {
    // 评论回复
    reply (item) {
      console.log('🚀 ~ file: Detail.vue ~ line 288 ~ reply ~ item', item)
      const reg = /^@[\S]+/g
      // 判断评论框是否为空，为空直接@名字，不为空判断是否已经@了是的话替换@的名字，没有在内容前加上@
      if (this.editInfo.content) {
        if (reg.test(this.editInfo.content)) {
          console.log(555)
          this.editInfo.content = this.editInfo.content.replace(reg, `@${item.cuid.name}`)
        } else {
          this.editInfo.content = `@${item.cuid.name} ${this.editInfo.content}`
        }
      } else {
        this.editInfo.content = `@${item.cuid.name} `
      }

      // 动态滚动到编辑器位置并focus
      scrollToElem('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
    },
    setHands (item) {
      if (item.handed === '1') {
        this.$pop('您已经赞过了', 'shake')
      } else {
        setHands({ cid: item._id }).then(res => {
          if (res.code === 200) {
            this.$pop('点赞成功')
            item.handed = '1'
            item.hands += 1
          } else {
            this.$pop(res.msg, 'shake')
          }
        })
      }
    },
    setCollect () {
      // 设置收藏 & 取消收藏
      const isLogin = this.$store.state.isLogin
      if (isLogin) {
        const collect = {
          tid: this.tid,
          title: this.page.title,
          isFav: this.page.isFav ? 1 : 0
        }
        addCollect(collect).then((res) => {
          if (res.code === 200) {
            this.page.isFav = !this.page.isFav
            this.$pop(this.page.isFav ? '设置收藏成功' : '取消收藏成功')
          }
        })
      } else {
        this.$pop('请先登录后再进行收藏！', 'shake')
      }
    },
    // 提交回复
    async onSubmit () {
      if (this.editInfo.content.trim() === '') {
        this.$alert('评论内容不得为空!')
        return
      }
      // 判断用户是否登录
      const isLogin = this.$store.state.isLogin
      if (!isLogin) {
        this.$pop('请先登录!', 'shake')
        return
      }
      // 用户禁言状态判断
      const user = this.$store.state.userInfo
      if (user.status !== '0') {
        this.$pop('用户已经禁言，请联系管理员', 'shake')
        return
      }
      this.editInfo.code = this.code
      this.editInfo.sid = this.$store.state.sid
      this.editInfo.tid = this.tid
      // 判断是否有cid，有cid说明是编辑评论
      if (
        typeof this.editInfo.cid !== 'undefined' &&
        this.editInfo.cid !== ''
      ) {
        const obj = { ...this.editInfo }
        delete obj.item
        // 判断用户是否修改了内容
        if (this.editInfo.content === this.editInfo.item.content) {
          this.$pop('shake', '确定编辑了内容~~~')
          return
        }
        // 更新评论
        editComment(obj).then((res) => {
          if (res.code === 200) {
            const temp = this.editInfo.item
            temp.content = this.editInfo.content
            this.$pop('更新评论成功')
            this.refresh()
          }
        })
        return
      }
      addComment(this.editInfo).then((res) => {
        if (res.code === 200) {
          this.$pop('评论成功!')
          this.refresh()
        } else if (res.code === 500) {
          this.$pop('验证码输入错误！')
        }
      })
    },
    // 成功回调，刷新列表，清空表单
    refresh () {
      this.code = ''
      this.editInfo.content = ''
      requestAnimationFrame(() => {
        this.$refs.observer && this.$refs.observer.reset()
      })
      this.getCommentList()
      this._getCode()
    },
    // 编辑器输入回调
    addContent (val) {
      this.editInfo.content = val
    },
    // 编辑回复
    editReply (item) {
      this.editInfo.content = item.content
      // 动态滚动到编辑器位置并focus
      scrollToElem('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
      // 设置参数，编辑的是哪条评论
      this.editInfo.cid = item._id
      this.editInfo.item = item
    },
    // 采纳最佳答案
    setBest (item) {
      this.$confirm('确定采纳为最佳答案吗？', () => {
        // 发送采纳最佳答案请求
        setBest({
          cid: item._id,
          tid: this.tid
        }).then((res) => {
          if (res.code === 200) {
            this.$pop('设置最佳答案成功！')
            this.getCommentList()
          }
        })
      }, () => {})
    },
    getCommentList () {
      getCommentList({
        tid: this.tid,
        limit: this.size,
        page: this.current
      }).then((res) => {
        if (res.code === 200) {
          this.comments = res.data
          this.total = res.total
        }
      })
    },
    getDetail () {
      getDetail(this.tid).then((res) => {
        if (res.code === 200) {
          this.page = res.data
          console.log(this.page)
        }
      }).catch((err) => {
        console.log(err)
        // this.$router.push('/404')
      })
    },
    handleChangeSize (val, current) {
      this.size = val
      this.current = current
      this.getCommentList()
    },
    handleChangeCurrent (val) {
      this.current = val
      this.getCommentList()
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
