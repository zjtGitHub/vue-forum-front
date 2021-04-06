const Center = () => import(/* webpackChunkName: 'center' */ '@/views/Center.vue')
const UserCenter = () => import(/* webpackChunkName: 'user-center' */ '@/components/user/Center.vue')
const Setting = () => import(/* webpackChunkName: 'setting' */ '@/components/user/Setting.vue')
const Msg = () => import(/* webpackChunkName: 'user-msg' */ '@/components/user/Msg.vue')
const Post = () => import(/* webpackChunkName: 'user-post' */ '@/components/user/Post.vue')
const Others = () => import(/* webpackChunkName: 'user-others' */ '@/components/user/Others.vue')
const User = () => import(/* webpackChunkName: 'user' */ '@/views/User.vue')
const MyInfo = () => import(/* webpackChunkName: 'MyInfo' */ '@/components/user/common/MyInfo.vue')
const Password = () => import(/* webpackChunkName: 'PassWord' */ '@/components/user/common/Password.vue')
const PicUpload = () => import(/* webpackChunkName: 'PicUpload' */ '@/components/user/common/PicUpload.vue')
const BindAccount = () => import(/* webpackChunkName: 'BindAccount' */ '@/components/user/common/BindAccount.vue')
const MyPost = () => import(/* webpackChunkName: 'mypost' */ '@/components/user/common/MyPost.vue')
const MyCollection = () => import(/* webpackChunkName: 'mycollection' */ '@/components/user/common/MyCollection.vue')

export default [
  {
    path: '/user/:uid',
    name: 'home',
    props: true,
    component: User
  },
  {
    path: '/center',
    component: Center,
    linkActiveClass: 'layui-this',
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'center',
        component: UserCenter
      },
      {
        path: 'setting',
        component: Setting,
        linkActiveClass: 'layui-this',
        children: [
          {
            path: '',
            name: 'info',
            component: MyInfo
          },
          {
            path: 'password',
            name: 'password',
            component: Password
          },
          {
            path: 'pic',
            name: 'pic',
            component: PicUpload
          },
          {
            path: 'account',
            name: 'account',
            component: BindAccount
          }
        ]
      },
      {
        path: 'post',
        name: 'post',
        component: Post,
        children: [
          {
            path: 'mypost',
            name: 'mypost',
            component: MyPost
          },
          {
            path: 'mycollection',
            name: 'mycollection',
            component: MyCollection
          }
        ]
      },
      {
        path: 'msg',
        name: 'msg',
        component: Msg
      },
      {
        path: 'others',
        name: 'others',
        component: Others
      }
    ]
  }
]
