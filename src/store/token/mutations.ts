import {MutationTree} from "vuex";
import {TokenStateInterface} from "./state";

const mutation: MutationTree<TokenStateInterface> = {
  // 设定 Token
  setBearerToken(state, token) {
    state.bearerToken = token
  },
  // 清空 Token
  clearBearerToken(state) {
    state.bearerToken = ""
  }
};

export default mutation;
