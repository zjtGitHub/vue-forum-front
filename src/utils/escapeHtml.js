import faces from '@/assets/js/face'

// 把
const htmlEncode = (html) => {
  let temp = document.createElement('div')
  temp.textContent !== undefined ? (temp.textContent = html) : (temp.innerText = html)
  const output = temp.innerHTML
  temp = null
  return output
}

const escapeHtml = (val = '') => {
  if (!val) { return }

  // 表情替换
  let result = val
  const faceReg = /face\[\W+]/g
  if (faceReg.test(result)) {
    const group = result.match(faceReg)
    group.map((item) => {
      const key = item.match(/\[\S+]/g)[0]
      result = result.replace(item, `<img src="${faces[key]}">`)
    })
  }
  // 图片替换
  const imgReg = /img\[\S+]/g
  if (imgReg.test(result)) {
    const group = result.match(imgReg)
    group.map((item) => {
      result = result.replace(item, `<img src="${item.substr(4, item.length - 5)}">`)
    })
  }
  // 链接替换 a(链接)[标题]
  const linkReg = /a\(\S+\)\[\S+]/g
  if (linkReg.test(result)) {
    const group = result.match(linkReg)
    const title = /\[(.+)]/
    const linkName = /\((.+)\)/
    group.map((item) => {
      const nameGroup = item.match(title)
      let name = ''
      if (nameGroup.length > 0) {
        name = nameGroup[1]
      }
      const linkGroup = item.match(linkName)
      let link = ''
      if (linkGroup.length > 0) {
        link = linkGroup[1]
      }
      result = result.replace(item, `<a href="${link}">${name}</a>`)
    })
  }
  // 引用替换
  result = result.replace(/\[quote]/g, '<div class="layui-elem-quote">')
  result = result.replace(/\[\/quote]/g, '</div>')
  // 代码块替换
  const code = /(\[\/?pre(.+?)[^\]]*\])|\[[^\]]*\]/g
  if (code.test(result)) {
    const group = result.match(code)
    group.map((item) => {
      result = result.replace(item, htmlEncode(item))
    })
    result = result.replace(/\[pre\]/g, '<pre>')
    result = result.replace(/\[\/pre\]/g, '</pre>')
  }

  // hr替换
  result = result.replace(/\[hr]/g, '<hr>')

  // 回车替换
  result = result.replace(/\r\n/g, '<br>')
  result = result.replace(/\n/g, '<br>')

  return result
}
export {
  escapeHtml
}
