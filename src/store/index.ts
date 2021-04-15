import { createApp } from "vue";
import { createStore } from "vuex";

// 创建 store 容器实例.

export const store = createStore({
  // state() {
  //   return {
  //     count: 0,
  //     username: 0,
  //     token: null,
  //   };
  state: {
    count: 0,
    username: "",
    token: "",
  },
  mutations: {
    set_token(state, token) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state.token = token;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      localStorage.token = token;
    },
    del_token(state) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state.token = "";
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      localStorage.token = "";
    },
  },
});
