import contract from "@/utils/contract.js";

const state = () => ({
  isInitialized: false,
  instance: undefined,
  payees: undefined,
  approvedCoins: undefined,
  error: undefined
});

const actions = {
  async initialize({ rootState, commit }) {
    let instance = await contract.getContract(rootState.web3.networkId).catch((error) => {
      commit("setError", { error });
      return;
    });

    commit("registerInstance", {
      instance
    });
  },
  async getPayees({ commit, state, rootState }) {
    let payees = await contract.getPayees(state.instance, rootState.web3.account, state.approvedCoins).catch((error) => {
      commit("setError", { error });
      return;
    });

    commit("registerPayees", {
      payees
    });
  },
  async getApprovedCoins({ commit, state, rootState }) {
    let approvedCoins = await contract.getApprovedCoins(state.instance, rootState.web3.account).catch((error) => {
      commit("setError", { error });
      return;
    });

    commit("registerApprovedCoins", {
      approvedCoins
    });
  },
  async setPayeeMessage({ commit, state, rootState }, { address, message }) {
    await contract.setPayeeMessage(state.instance, rootState.web3.account, { payeeAddress: address, message }).catch((error) => {
      commit("setError", { error });
      return;
    });
  },
  async setPayeeShare({ commit, state, rootState }, { payeeAddress, coinAddress, share }) {
    await contract.setPayeeShare(state.instance, rootState.web3.account, {
      payeeAddress,
      coinAddress,
      share
    }).catch((error) => {
      commit("setError", { error });
      return;
    });
  },
  async approveToken({ commit, state, rootState }, { coinAddress }) {
    await contract.approveToken(state.instance, rootState.web3.account, { coinAddress }).catch((error) => {
      commit("setError", { error });
      return;
    });
  },
  async addPayee({ commit, state, rootState }, { payeeAddress, alias }) {
    await contract.addPayee(state.instance, rootState.web3.account, { payeeAddress, alias }).catch((error) => {
      commit("setError", { error });
      return;
    });
  },
  async confirm({ commit, state, rootState }, { payerAddress }) {
    await contract.confirm(state.instance, rootState.web3.account, { payerAddress }).catch((error) => {
      commit("setError", { error });
      return;
    });
  },
  async withdraw({ commit, state, rootState }, { payerAddress }) {
    await contract.withdraw(state.instance, rootState.web3.account, { payerAddress }).catch((error) => {
      commit("setError", { error });
      return;
    });
  }
}

const mutations = {
  registerInstance(state, { instance }) {
    state.instance = instance;
    state.isInitialized = true;
  },
  registerPayees(state, { payees }) {
    state.payees = payees;
  },
  registerApprovedCoins(state, { approvedCoins }) {
    state.approvedCoins = approvedCoins;
  },
  setError(state, { error }) {
    state.error = error;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
};