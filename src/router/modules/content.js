const Add = () => import(/* webpackChunkName: 'add' */ '@/components/content/Add.vue')
const Edit = () => import(/* webpackChunkName: 'edit' */ '@/components/content/Edit.vue')
const Detail = () => import(/* webpackChunkName: 'detail' */ '@/components/content/Detail.vue')

export default [
  {
    path: '/add',
    name: 'add',
    meta: { requiresAuth: true },
    component: Add
  },
  {
    path: '/edit/:tid',
    props: true,
    name: 'edit',
    meta: { requiresAuth: true },
    component: Edit,
    beforeEnter (to, from, next) {
      // 正常的情况 detail
      if (['detail', 'mypost'].indexOf(from.name) !== -1 && to.params.page && to.params.page.isEnd === 0) {
        next()
      } else {
        // 用户在edit页面刷新的情况
        const editData = localStorage.getItem('editData')
        if (editData && editData !== '') {
          const editObj = JSON.parse(editData)
          if (editObj.isEnd === '0') {
            next()
          } else {
            next('/')
          }
        } else {
          next('/')
        }
      }
    }
  },
  {
    path: '/detail/:tid',
    props: true,
    name: 'detail',
    component: Detail
  }
]
