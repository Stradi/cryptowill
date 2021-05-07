import contract from "@/utils/contract.js";

const state = () => ({
  isInitialized: false,
  instance: undefined,
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
  }
}

const mutations = {
  registerInstance(state, { instance }) {
    state.instance = instance;
    state.isInitialized = true;
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