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
      {
        path: "/projects/:projectId",
        component: () => import("pages/ProjectInfo.vue"),
      },
      {
        path: "/issues",
        component: () => import("pages/Issues.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
