import { fetchMain, fetchSell, fetchManage, fetchManageList } from "@/api";

const state = {
  items: [],
  item_list: [],
  manageItems: [],
  agents: [],
};

const getters = {
  items: (state) => state.items,
  manageItems: (state) => state.manageItems,
};

const mutations = {
  SET_ITEMS(state, items) {
    state.items = items;
  },
  SET_LISTS(state, items) {
    state.item_list = items;
  },
  SET_MANAGEITEMS(state, items) {
    state.manageItems = items;
  },
  SET_AGENTS(state, items) {
    state.agents = items;
  },
};

const actions = {
  async fetchItems({ commit }) {
    await fetchMain()
      .then((res) => {
        commit("SET_ITEMS", res.data);
      })
      .catch((err) => console.log(err));
  },
  async InitMetadata({ commit }, payload) {
    await fetchSell(payload)
      .then((res) => {
        commit("SET_LISTS", res.data);
      })
      .catch((err) => console.log(err));
  },
  async fetchManageItems({ commit }, payload) {
    await fetchManage(payload)
      .then((res) => {
        commit("SET_MANAGEITEMS", res.data);
      })
      .catch((err) => console.log(err));
  },
  async fetchManageLists({ commit }) {
    await fetchManageList()
      .then((res) => {
        commit("SET_AGENTS", res.data);
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
