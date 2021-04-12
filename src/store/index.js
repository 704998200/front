import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from "src/App";

// 创建 store 容器实例.

const store = createStore({
  state () {
    return {
      count: 0,
      username:0,
      token: null
    }
  },
  mutations: {
    set_token(state, token) {
      state.token = token
      localStorage.token = token
    }

  }
})

const app = createApp(App)

// 通过 use 注册插件
app.use(store)
