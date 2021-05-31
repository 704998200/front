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
    path: "/test",
    component: () => import("pages/Test.vue"),
  },
  {
    path: "/",
    component: () => import("layouts/ProjectLayout.vue"),
    children: [
      {
        path: "/projects",
        component: () => import("pages/Projects.vue"),
      },
      // {
      //   path: "/issues",
      //   component: () => import("components/userbugmange.vue"),
      // },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
