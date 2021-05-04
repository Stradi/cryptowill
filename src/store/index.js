import Vuex from "vuex";
import web3 from "@/store/modules/web3";

const store = new Vuex.Store({
  modules: {
    web3
  }
});

export default store;