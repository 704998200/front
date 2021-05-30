import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("pages/Login.vue"),
  },
  {
    path: "/regist",
    component: () => import("pages/Regist.vue"),
  },
  {
    path: "/test",
    component: () => import("pages/Test.vue"),
  },
  {
    path: "/",
    component: () => import("pages/Index.vue"),
    children: [{path: "/projects", component: () => import("components/userprojectmange.vue")},
      {path: "/issues", component: () => import("components/userbugmange.vue")}],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
