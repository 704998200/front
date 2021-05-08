import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { TokenStateInterface } from './state';

const actions: ActionTree<TokenStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default actions;
