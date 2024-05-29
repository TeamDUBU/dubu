import { DUBU, NFT } from "@/utils/caver";

const state = {
  items: [],
  list: [],
};

const getters = {
  items: (state) => state.items,
};

const mutations = {
  SET_ITEMS(state, items) {
    state.items = items;
  },
  SET_LISTS(state, list) {
    state.list = list;
  },
};

const actions = {
  async fetchItems({ commit }) {
    try {
      const items = await DUBU.methods.getItemsListAll().call(); // items에 모든 아이템 목록 저장
      commit("SET_ITEMS", items); //state에 저장
      const lists = await NFT.methods.getTokensListAll().call(); // items에 모든 아이템 목록 저장
      commit("SET_LISTS", lists); //state에 저장
    } catch (error) {
      console.error(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
