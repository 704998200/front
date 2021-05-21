import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { TokenStateInterface } from "./state";

const getters: GetterTree<TokenStateInterface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
  // 这里写一个 get 方法
  getBearerToken(state) {
    return state.bearerToken;
  },
};

export default getters;
