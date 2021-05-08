import contract from "@/utils/contract.js";

const state = () => ({
  isInitialized: false,
  instance: undefined,
  payees: undefined,
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