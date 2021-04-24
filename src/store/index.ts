import { createStore } from "vuex";

// 创建 store 容器实例.

const store = createStore({
  // state() {
  //   return {
  //     count: 0,
  //     username: 0,
  //     token: null,
  //   };
  state: {
    count: 0,
    level: '',
    token: '',
  },
  mutations: {
    set_token(state, {token, level}) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state.token = token;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state.level = level;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      localStorage.token = token;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      localStorage.level = level;
    },
    del_token(state) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state.token = "";
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      localStorage.token = "";
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state.level = "";
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      localStorage.level = "";
    },
  },
});
export default store;
