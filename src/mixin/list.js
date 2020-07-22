import { getList } from '@/api/content'

export default {
  data () {
    return {
      status: 0,
      tags: '精华',
      sort: 'created',
      page: 0,
      limit: 20,
      catalog: ''
    }
  },
  methods: {
    nextPage () {
      this.page++
      this._getList()
    },
    _getList () {
      getList().then((res) => {
        if (res.code === 200) {
          if (this.list.length === 0) {
            this.list = res.data
          } else {
            this.list = res.data.concat(res.data)
          }
        }
      }).catch((err) => {
        if (err) {
          this.$alert(err.msg)
        }
      })
    }
  }
}
