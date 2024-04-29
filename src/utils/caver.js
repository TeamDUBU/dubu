import Caver from "caver-js";
import CaverExtKAS from "caver-js-ext-kas";

const caver = new Caver(window.klaytn);
const caverExt = new CaverExtKAS();
caverExt.initTokenHistoryAPI(
  process.env.VUE_APP_KAS_CHAIN_ID,
  process.env.VUE_APP_KAS_ACCESS_ID,
  process.env.VUE_APP_KAS_ACCESS_KEY
);
export { caver, caverExt };
