import axios from "axios";

function fetchMain() {
  return axios.get(`${process.env.VUE_APP_BASE_URL}/main/`);
}

function fetchBanner() {
  return axios.get(`${process.env.VUE_APP_BASE_URL}/banner`);
}

function fetchNewItem() {
  return axios.get(`${process.env.VUE_APP_BASE_URL}/newItem`);
}

function fetchSellItem() {
  return axios.get(`${process.env.VUE_APP_BASE_URL}/recentlySell`);
}

export { fetchMain, fetchBanner, fetchNewItem, fetchSellItem };
