import Vuex from "vuex";
import web3 from "@/store/modules/web3";
import contract  from "@/store/modules/contract";

const store = new Vuex.Store({
  modules: {
    web3,
    contract
  }
});

export default store;