import Vuex from "vuex";

import web3Utils from "./../utils/getWeb3";
import { NETWORKS } from "./../utils/networks";

const state = {
  web3: {
    instance: null,
    networkId: null,
    selectedAccount: null,
    balance: null
  }
};

const store = new Vuex.Store({
  state,
  mutations: {
    registerWeb3(state, payload) {
      state.web3.instance = payload.instance;
      state.web3.networkId = payload.networkId;
      state.web3.selectedAccount = payload.selectedAccount;
      state.web3.balance = payload.balance;
    },
    registerWeb3Status(state, payload) {
      state.web3.status = payload.status;
    }
  },
  actions: {
    async registerWeb3({ commit }) {
      let instance = await web3Utils.getWeb3Instance();
      let networkId = await web3Utils.getNetworkID();
      let selectedAccount = await web3Utils.getSelectedAccount();
      let balance = await web3Utils.getAccountBalance();

      commit("registerWeb3", {
        instance,
        networkId,
        selectedAccount,
        balance,
      });
    },
    async registerWeb3Status({ commit }) {
      let web3Status = true;
      await web3Utils.getWeb3Instance().catch((error) => {
        web3Status = false;
      });

      console.log(web3Status);

      commit("registerWeb3Status", {
        status: web3Status
      });
    }
  },
  getters: {
    networkName: (state) => {
      return NETWORKS[state.web3.networkId].name;
    },
    addressExplorerURI: (state) => {
      let explorerURI = NETWORKS[state.web3.networkId].explorer;
      return new String(explorerURI).replace("{0}", state.web3.selectedAccount);
    },
    isConnectedToWeb3: (state) => {
      return (
        state.web3.instance != null &&
        state.web3.networkId != null &&
        state.web3.selectedAccount != null &&
        state.web3.balance != null
      );
    }
  }
});

export default store;