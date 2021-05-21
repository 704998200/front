import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("pages/Login.vue"),
  },
  {
    path: "/register",
    component: () => import("pages/Register.vue"),
  },
  {
    path: "/",
    component: () => import("pages/Index.vue"),

    // children: [
    //   {
    //     path: "project",
    //     component: () => import("components/userprojectmange.vue"),
    //     meta: {
    //       // requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    //       level: 1,
    //     },
    //   },
    // ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
