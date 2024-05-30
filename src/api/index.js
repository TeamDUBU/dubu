import axios from "axios";

function fetchMain() {
  return axios.get(`${process.env.VUE_APP_BASE_URL}/main/`);
}

function fetchSell(payload) {
  return axios.get(`${process.env.VUE_APP_BASE_URL}/sell/${payload.Address}`);
}

function fetchManage(payload) {
  return axios.get(
    `${process.env.VUE_APP_BASE_URL}/manage/customerlist/${payload.Address}`
  );
}

function fetchSellItem() {
  return axios.get(`${process.env.VUE_APP_BASE_URL}/recentlySell`);
}

export { fetchMain, fetchSell, fetchManage, fetchSellItem };
