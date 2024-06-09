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
function fetchManageList() {
  return axios.get(`${process.env.VUE_APP_BASE_URL}/manage/`);
}
function fetchHistory(payload) {
  return axios.get(
    `${process.env.VUE_APP_BASE_URL}/purchase/${payload.tokenId}/${payload.hosu}`
  );
}
function fetchAgentHistory(payload) {
  return axios.get(
    `${process.env.VUE_APP_BASE_URL}/manage/agentHistory/${payload.Address}`
  );
}

export {
  fetchMain,
  fetchSell,
  fetchManage,
  fetchManageList,
  fetchHistory,
  fetchAgentHistory,
};
