import { MutationTree } from "vuex";
import { TokenStateInterface } from "./state";

const mutation: MutationTree<TokenStateInterface> = {
  // 设定 Token
  setBearerToken(state, token) {
    // 从 state 调出字段
    state.bearerToken = token;
  },
  // 清空 Token
  clearBearerToken(state) {
    state.bearerToken = "";
  },
};

export default mutation;
