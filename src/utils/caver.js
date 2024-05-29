import Caver from "caver-js";
import CaverExtKAS from "caver-js-ext-kas";
import { dubuABI, NFTABI } from "@/store/modules/abiInfo";

const caver = new Caver(window.klaytn);
const caverExt = new CaverExtKAS();
caverExt.initTokenHistoryAPI(
  process.env.VUE_APP_KAS_CHAIN_ID,
  process.env.VUE_APP_KAS_ACCESS_ID,
  process.env.VUE_APP_KAS_ACCESS_KEY
);
const DUBU = new caver.klay.Contract(
  dubuABI,
  process.env.VUE_APP_DUBU_CONTRACT_ADDRESS
);
const NFT = new caver.klay.Contract(
  NFTABI,
  process.env.VUE_APP_NFT_CONTRACT_ADDRESS
);

export { caver, caverExt, NFT, DUBU };
