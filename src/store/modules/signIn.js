// store/modules/signIn.js
const state = {
  isModalOpen: false,
  userInfo: {
    name: "",
    number: "",
  },
};

const mutations = {
  setModalOpen(state, isOpen) {
    state.isModalOpen = isOpen;
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
};

const actions = {
  openModal({ commit }) {
    commit("setModalOpen", true);
  },
  closeModal({ commit }) {
    commit("setModalOpen", false);
  },
  submitUserInfo({ commit }, userInfo) {
    commit("setUserInfo", userInfo);
    commit("setModalOpen", false);
  },
};

const getters = {
  isModalOpen: (state) => state.isModalOpen,
  userInfo: (state) => state.userInfo,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
