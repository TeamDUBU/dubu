import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

const Toast = Vue.swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Vue.swal.stopTimer);
    toast.addEventListener("mouseleave", Vue.swal.resumeTimer);
  },
});

const state = {
  address : "",
  isConnected : false,
}

const mutations = {
  setWallet(state){
    state.address = window.klaytn.selectedAddress;
    state.isConnected = true;
  }
}

const actions = {
  async connectWallet({commit}){
    if(window.klaytn !== undefined){
      if(window.klaytn.isKaikas){
        const accounts = await window.klaytn.enable();
        const account = accounts[0];
        commit('setWallet', account);
      }
      window.klaytn.on('accountsChanged', () => {
        commit('setWallet', window.klaytn.selectedAddress);
        Toast.fire({
          icon: "warning",
          title: "연결 지갑 변경이 감지되었습니다.",
          text: "오류 방지를 위해 새로고침해주세요."
        });
      });
    }
  },
  
}


const getters = {
}

const wallet = {
  state,
  getters,
  actions,
  mutations
}

export default wallet
