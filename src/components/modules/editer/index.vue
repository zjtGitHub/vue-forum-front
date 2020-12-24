<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit">
          <span @click="showFace" ref="face">
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <span @click="showImg" ref="img">
            <i class="iconfont icon-tupian"></i>
          </span>
          <span
            @click="
              () => {
                this.linkShow = true;
              }
            "
            ref="link"
          >
            <i class="iconfont icon-lianjie"></i>
          </span>
          <span
            @click="
              () => {
                this.quoteShow = true;
              }
            "
            ref="quote"
          >
            <span class="quote">"</span>
          </span>
          <span
            @click="
              () => {
                this.codeShow = true;
              }
            "
            ref="code"
          >
            <i class="iconfont icon-emwdaima"></i>
          </span>
          <span @click="insertHr">hr</span>
          <span
            @click="
              () => {
                this.previewShow = true;
              }
            "
          >
            <i class="iconfont icon-yulan1"></i>
          </span>
        </div>
        <textarea
          id="edit"
          class="layui-textarea fly-editor"
          ref="textEdit"
          name="content"
          @focus="focusEvent"
          @blur="blurEvent"
          v-model="textContent"
        ></textarea>
      </div>
    </div>
    <face
      :ctrl="this.$refs.face"
      @addFaceEvent="insertFace"
      @closeEvent="
        () => {
          this.faceShow = false;
        }
      "
      :isShow="faceShow"
    ></face>
    <img-upload
      :isShow="imgShow"
      :ctrl="this.$refs.img"
      @addEvent="insertImg"
      @closeEvent="
        () => {
          this.imgShow = false;
        }
      "
    >
    </img-upload>
    <link-add
      :isShow="linkShow"
      :ctrl="this.$refs.link"
      @addEvent="insertLink"
      @closeEvent="
        () => {
          this.linkShow = false;
        }
      "
    >
    </link-add>
    <Code
      :isShow="codeShow"
      :ctrl="this.$refs.code"
      :width="codeWidth"
      :height="codeHeight"
      @addEvent="insertCode"
      @closeEvent="
        () => {
          this.codeShow = false;
        }
      "
    >
    </Code>
    <quote
      :isShow="quoteShow"
      :ctrl="this.$refs.quote"
      @addEvent="insertQuote"
      @closeEvent="
        () => {
          this.quoteShow = false;
        }
      "
    >
    </quote>
    <Preview
      :isShow="previewShow"
      :content="textContent"
      :width="codeWidth"
      :height="codeHeight"
      @closeEvent="
        () => {
          this.previewShow = false;
        }
      "
    ></Preview>
  </div>
</template>

<script>
import face from './face'
import ImgUpload from './imgUpload'
import LinkAdd from './linkAdd'
import Quote from './Quote'
import Code from './Code'
import Preview from './Preview'
export default {
  name: 'Editor',
  components: {
    face,
    ImgUpload,
    LinkAdd,
    Quote,
    Code,
    Preview
  },
  props: ['initContent'],
  data () {
    return {
      textContent: '',
      codeWidth: 400,
      codeHeight: 200,
      pos: '',
      faceShow: false,
      imgShow: false,
      linkShow: false,
      codeShow: false,
      quoteShow: false,
      previewShow: false
    }
  },
  watch: {
    initContent (newval, oldval) {
      this.textContent = newval
    }
  },
  mounted () {
    this.codeWidth = this.$refs.textEdit.offsetWidth - 60
    this.codeHeight = this.$refs.textEdit.offsetHeight - 80
    window.addEventListener('resize', () => {
      this.codeWidth = this.$refs.textEdit.offsetWidth - 60
      this.codeHeight = this.$refs.textEdit.offsetHeight - 80
    })
  },
  updated () {
    this.$emit('changeContent', this.textContent)
  },
  methods: {
    focusEvent () {
      this.getPos()
    },
    blurEvent () {
      this.getPos()
    },
    // 获取光标位置
    getPos () {
      let cursorPos = 0
      const ele = document.getElementById('edit')
      if (document.selection) {
        // IE Support
        // ele.focus()
        var range = document.selection.createRange()
        range.moveStart('character', -ele.value.length)
        cursorPos = range.text.length
      } else if (ele.selectionStart || ele.selectionStart === '0') {
        // another support
        cursorPos = ele.selectionStart
      }
      this.pos = cursorPos
    },
    showFace () {
      this.faceShow = !this.faceShow
    },
    showImg () {
      this.imgShow = !this.imgShow
    },
    insertFace (val) {
      const insertContent = ` face${val}`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    insertImg (val) {
      const insert = ` img[${val}]`
      this.insert(insert)
      this.pos += insert.length
    },
    insertLink (val) {
      const insert = ` a(${val})[${val}]`
      this.insert(insert)
      this.pos += insert.length
    },
    insertCode (val) {
      const insert = ` \n[pre]\n${val}\n[/pre]`
      this.insert(insert)
      this.pos += insert.length
    },
    insertQuote (val) {
      const insert = ` \n[quote]\n${val}\n[/quote]`
      this.insert(insert)
      this.pos += insert.length
    },
    insertHr (val) {
      this.insert('\n[hr]')
      this.pos += 5
    },
    // 插入内容
    insert (val) {
      if (typeof this.textContent === 'undefined') {
        return
      }
      const tmp = this.textContent.split('')
      tmp.splice(this.pos, 0, val)
      this.textContent = tmp.join('')
    }
  }
}
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes bounceOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  30% {
    opacity: 0.3;
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}

.bounce-enter-active,
.bounce-leave-active {
  transition: all 0.3s;
}
.bounce-enter,
.bounce-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.bounce-enter-to {
  opacity: 1;
  transform: scale(1);
}
.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}
.fly-editor {
  height: 260px;
}
.edit-wrap {
  position: relative;
}
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 100;
  background: #fff;
}
.icon-emwdaima {
  position: relative;
  top: 2px;
}
.layui-layer-prompt {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>
