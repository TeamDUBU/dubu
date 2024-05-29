import { fetchMain, fetchSell } from "@/api";

const state = {
  items: [],
  item_list: [],
};

const getters = {
  items: (state) => state.items,
};

const mutations = {
  SET_ITEMS(state, items) {
    state.items = items;
  },
  SET_LISTS(state, items) {
    state.item_list = items;
  },
};

const actions = {
  async fetchItems({ commit }) {
    fetchMain()
      .then((res) => {
        commit("SET_ITEMS", res.data);
      })
      .catch((err) => console.log(err));
  },
  InitMetadata({ commit }, payload) {
    fetchSell(payload)
      .then((res) => {
        commit("SET_LISTS", res.data);
      })
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
