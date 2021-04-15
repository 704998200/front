import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { LocalStorage, SessionStorage } from "quasar";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    // component: () => import('layouts/MainLayout.vue'),
    // children: [{ path: '', component: () => import('pages/Index.vue') }],
    component: () => import("pages/Login.vue"),
  },
  {
    path: "/user",
    component: () => import("pages/Error404.vue"),
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      role: "user",
    },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];
const router = createRouter({ history: createWebHashHistory(), routes });
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (LocalStorage.getItem("token") != "") {
      // 通过vuex state获取当前的token是否存在
      if (to.meta.role) {
        if (LocalStorage.getItem("token") != "") {
        }
      }
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});
export default routes;
