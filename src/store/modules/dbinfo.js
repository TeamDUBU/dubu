import { fetch } from "@/api/index";
import { NFTABI, dubuABI } from "./abiInfo";

const state = {
  db: [],
  NFTABI: NFTABI,
  dubuABI: dubuABI,
};

const getters = {
  getNFTABI() {
    return state.NFTABI;
  },
  getDubuABI() {
    return state.dubuABI;
  },
};

const mutations = {
  SET_DB(state, data) {
    state.db = data;
  },
};
