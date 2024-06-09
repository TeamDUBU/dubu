import {
  fetchMain,
  fetchSell,
  fetchManage,
  fetchManageList,
  fetchHistory,
  fetchAgentHistory,
} from "@/api";

const state = {
  items: [],
  item_list: [],
  manageItems: [],
  agents: [],
  history: [],
  aHistory: [],
};

const getters = {
  items: (state) => state.items,
  manageItems: (state) => state.manageItems,
};

const mutations = {
  SET_ITEMS(state, items) {
    state.items = items;
  },
  SET_HISTORY(state, items) {
    state.history = items;
  },
  SET_AHISTORY(state, items) {
    state.aHistory = items;
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
        return res;
      })
      .catch((err) => console.log(err));
  },
  async InitMetadata({ commit }, payload) {
    await fetchSell(payload)
      .then((res) => {
        commit("SET_LISTS", res.data);
        return res;
      })
      .catch((err) => console.log(err));
  },
  async fetchManageItems({ commit }, payload) {
    await fetchManage(payload)
      .then((res) => {
        commit("SET_MANAGEITEMS", res.data);
        return res;
      })
      .catch((err) => console.log(err));
  },
  async fetchHistorys({ commit }, payload) {
    await fetchHistory(payload)
      .then((res) => {
        commit("SET_HISTORY", res.data);
        return res;
      })
      .catch((err) => console.log(err));
  },
  async fetchAgentHistorys({ commit }, payload) {
    await fetchAgentHistory(payload)
      .then((res) => {
        commit("SET_AHISTORY", res.data);
        return res;
      })
      .catch((err) => console.log(err));
  },
  async fetchManageLists({ commit }) {
    await fetchManageList()
      .then((res) => {
        commit("SET_AGENTS", res.data);
        return res;
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
