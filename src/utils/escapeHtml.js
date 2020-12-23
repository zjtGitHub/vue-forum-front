import faces from '@/assets/js/face'

const escapeHtml = (val = '') => {
  if (!val) { return }

  // 表情替换
  let result = val
  const faceReg = /face\[\W+]/g
  if (faceReg.test(result)) {
    const group = result.match(faceReg)
    console.log('🚀 ~ file: escapeHtml.js ~ line 11 ~ escapeHtml ~ group', group)
    group.map((item) => {
      const key = item.match(/\[\S+]/g)[0]
      console.log(key)
      result = result.replace(item, `<img src="${faces[key]}">`)
      console.log(result)
    })
  }
  // 图片替换
  const imgReg = /img\[\S+]/g
  if (imgReg.test(result)) {
    const group = result.match(imgReg)
    console.log(group)
    group.map((item) => {
      result = result.replace(item, `<img src="${item.substr(4, item.length - 5)}">`)
    })
  }
  // 链接替换
  // 引用替换
  // 代码块替换
  // hr替换

  return result
}
export {
  escapeHtml
}
