import axios from "axios";

function fetchMetadata(payload) {
  return axios.get(
    `${process.env.VUE_APP_BASE_URL}/metadata/${payload.NFTAddress}`
  );
}
export { fetchMetadata, axios };
