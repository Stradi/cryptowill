import Vuex from "vuex";

import web3Utils from "./../utils/getWeb3";

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
        balance
      });
    }
  }
});

export default store;