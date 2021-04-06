
import home from '@/views/Home.vue'

import users from './modules/user'
import login from './modules/login'
import content from './modules/content'

const Index = () => import(/* webpackChunkName: 'index' */ '../views/channels/index.vue')
const Template1 = () => import(/* webpackChunkName: 'Template1' */ '../views/channels/Template1.vue')

const NotFound = () => import(/* webpackChunkName: 'NotFound' */ '../views/404.vue')

export default {
  linkExactActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      component: home,
      children: [
        {
          path: '',
          name: 'index',
          component: Index
        },
        {
          path: '/index/:catalog',
          name: 'catalog',
          component: Template1
        }
      ]
    },
    ...content,
    ...login,
    ...users,
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
}
