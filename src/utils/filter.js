import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

const moment = (date) => {
  if (!dayjs(date).isBefore(dayjs().subtract(7, 'day'))) {
    return dayjs(date).fromNow()
  } else {
    return dayjs(date).format('YYYY-MM-DD')
  }
}

const hours = (date) => {
  if (dayjs(date).isBefore(dayjs(dayjs().format('YYYY-MM-DD 00:00:00')))) {
    return dayjs(date).format('YYYY-MM-DD')
  } else {
    // 1天内
    return dayjs(date).format('HH:mm:ss')
  }
}

const time = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

// ...

export default {
  moment,
  hours,
  time
}
