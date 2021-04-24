import {route} from "quasar/wrappers";
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import routes from "./routes";
import {LocalStorage} from "quasar";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
      scrollBehavior: () => ({left: 0, top: 0}),
      routes,

      // Leave this as is and make changes in quasar.conf.js instead!
      // quasar.conf.js -> build -> vueRouterMode
      // quasar.conf.js -> build -> publicPath
      history: createHistory(
        process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
      ),
    }
  );
  Router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
      // 判断该路由是否需要登录权限
      if (LocalStorage.getItem('token') != ''&&LocalStorage.getItem('token') != null) {
        // 通过vuex state获取当前的token是否存在
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (eval(LocalStorage.getItem('level')) >= eval(to.meta.level) && LocalStorage.getItem('level') != null) {
          // 通过vuex state获取当前的level是否足够
          next();
        }
      } else {
        next({
          path: '/login',
          query: {redirect: to.fullPath}, // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
      }
    } else {
      next();
    }
  });
  return Router;


});
