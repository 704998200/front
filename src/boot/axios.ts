import { boot } from "quasar/wrappers";
import axios, { AxiosInstance } from "axios";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: "http://localhost:8080" });
// let store = null;

export default boot(({ app, store, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  axios.interceptors.request.use(
    (config) => {
      // console.log("请求拦截" + config);
      // console.log(store);
      if (store.state.token) {
        // 判断是否存在 token 如果存在的话，则每个 http header 都加上 token
        // console.log(`token为 ${store.state.token.bearerToken}`);
        config.headers.Authorization = `Bearer ${store.state.token.bearerToken}`;
      } else {
        // 没有 token 就跳转到 login
        router.push({ path: "/login" });
      }
      return config;
    },
    (err) => {
      console.log(err);
      return Promise.reject(err);
    }
  );
  axios.interceptors.response.use(
    (response) => {
      // console.error("Axios返回了新东西");
      return response;
    },
    (error) => {
      console.log("Axios发生错误");
      // 在这里检测 Token 过期
      // console.log(error);
      let resultData = error.response;
      // console.log(resultData);
      let errorCode: number = resultData.data.errorCode;
      console.log("错误码为", errorCode);
      console.log(errorCode == 1919810);
      if (errorCode == 1919810) {
        console.log("token 过期,重置然后跳转到登陆页");
        // 清除本地 token 然后跳转到登陆页面
        store.commit("token/clearBearerToken");
        // store.state.token.bearerToken = "";
        return router.push({ path: "/login" });
        // return Promise.reject({ url: "/login" });
      }
      // switch (errorCode) {
      //   case 1919810:
      // }
      return Promise.reject(error.response.data); // 返回接口返回的错误信息
    }
  );
});

export { api, axios };
