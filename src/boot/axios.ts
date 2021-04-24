import axios from 'axios';
import {boot} from 'quasar/wrappers';
import store from 'src/store';
import {useRouter} from 'vue-router';

const api = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 5000
});
const router = useRouter();

export default boot(({app}) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API


});

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    console.log("请求拦截"+config)
    if (store.state.token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      config.headers.Authorization = `token ${store.state.token}`;
    }
    return config;
  },
  (err) => {
    console.log(err)
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    console.log(response)
    return response;
  },
  (error) => {
    console.log("响应错误:"+error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit('del_token');
          void router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.value.fullPath},
          });
      }
    }
    return Promise.reject(error.response); // 返回接口返回的错误信息
  }
);
export { axios, api };
