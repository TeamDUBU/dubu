import axios from "axios";

function fetch() {
  return axios.get(`${process.env.VUE_APP_BASE_URL}/data/all`);
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

export { fetch, fetchBanner, fetchNewItem, fetchSellItem };
