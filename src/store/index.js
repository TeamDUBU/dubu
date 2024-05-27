import Vue from "vue";
import Vuex from "vuex";
import wallet from "./modules/wallet";
import dbInfo from "./modules/dbinfo";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    wallet,
    dbInfo,
  },
});
