import { RouteRecordRaw} from 'vue-router';


const routes: RouteRecordRaw[] = [
  {
    path: '/login',

    component: () => import('pages/Login.vue'),
  },
  {
    path: '/regist',
    component: () => import('pages/Regist.vue'),
  },
  {
    path: '/main',

    component: () => import('pages/Main.vue'),

    children: [{
      path: 'index', component: () => import('components/CompositionComponent.vue'),
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        level: 1
      },
    }],
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path: '/',
    component: () => import('pages/Login.vue'),

  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];


export default routes;
