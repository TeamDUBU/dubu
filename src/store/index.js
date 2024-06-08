import Vue from "vue";
import Vuex from "vuex";
import wallet from "./modules/wallet";
import dbInfo from "./modules/dbinfo";
import signIn from "./modules/signIn";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    wallet,
    dbInfo,
    signIn,
  },
});
