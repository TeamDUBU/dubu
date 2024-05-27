import { dubuABI,NFTABI } from './abiInfo';
import { caver } from '@/utils/caver';

const state = {
  items: []
};

const getters = {
  items: (state) => state.items
};

const mutations = {
  SET_ITEMS(state, items) {
    state.items = items;
  }
};

const actions = {
  async fetchItems({ commit }) {
    try {
      const contract = new caver.klay.Contract(dubuABI, process.env.VUE_APP_DUBU_CONTRACT_ADDRESS);
      const items = await contract.methods.getItemsListAll().call(); // items에 모든 아이템 목록 저장
      commit('SET_ITEMS', items); //state에 저장
    } catch (error) {
      console.error(error);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
