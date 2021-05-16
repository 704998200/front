import {GetterTree} from "vuex";
import {StateInterface} from "../index";
import  {TokenStateInterface} from "./state";

const getters: GetterTree<TokenStateInterface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
  getBearerToken(state) {
    return state.bearerToken
  }
};

export default getters;
