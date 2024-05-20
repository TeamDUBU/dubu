import axios from "axios";

function fetchPrice(payload) {
  return axios.get(
    `${process.env.VUE_APP_BASE_URL}/price/${payload.NFTAddress}`
  );
}
export { fetchPrice, axios };
