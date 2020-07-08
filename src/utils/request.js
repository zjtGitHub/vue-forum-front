import HttpReauest from '@/utils/axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
console.log(config.baseUrl.dev)
const axios = new HttpReauest(baseUrl)

export default axios
