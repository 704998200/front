import { RouteRecordRaw} from 'vue-router';


const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    // component: () => import('layouts/MainLayout.vue'),
    // children: [{ path: '', component: () => import('pages/Index.vue') }],
    component: () => import('pages/Login.vue'),
  },
  {
    path: '/regist',
    component: () => import('pages/Regist.vue'),
  },
  {
    path: '/main',

    component: () => import('pages/Main.vue'),
  },
  {
    path: '/*',
    component: () => import('pages/Error404.vue'),
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      role: 'user',
    },
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];


export default routes;
