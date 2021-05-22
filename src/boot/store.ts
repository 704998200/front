import { boot } from "quasar/wrappers";
// import store from "../store";
import { createStore } from "vuex";
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  const store = createStore({});
  app.use(store);
});
