import web3 from "@/utils/web3.js";
import { NETWORKS } from "@/utils/networks.js";

const state = () => ({
  isConnected: false,
  instance: undefined,
  networkId: undefined,
  account: undefined,
  error: undefined
});

const actions = {
  async connect({ state, commit, dispatch }) {
    //TODO: Delete log message in production.
    await web3.connect().catch((error) => {
      commit("setError", { error });
      return;
    });

    await dispatch("registerInstance");
    await dispatch("registerNetworkId");
    await dispatch("registerAccount");

    commit("registerIsConnected", {
      isConnected: true
    });
  },
  async registerInstance({ commit }) {
    const instance = await web3.getInstance().catch((error) => {
      commit("setError", { error });
      return;
    });
    
    commit("registerInstance", { instance });
  },
  async registerNetworkId({ state, commit }) {
    const networkId = await web3.getNetworkId(state.instance).catch((error) => {
      commit("setError", { error });
      return;
    });
    
    commit("registerNetworkId", { networkId });
  },
  async registerAccount({ state, commit }) {
    const account = await web3.getAccount(state.instance).catch((error) => {
      commit("setError", { error });
      return;
    });

    commit("registerAccount", { account });
  }
}

const mutations = {
  registerIsConnected(state, { isConnected }) {
    state.isConnected = isConnected;
  },
  registerInstance(state, { instance }) {
    state.instance = instance;
  },
  registerNetworkId(state, { networkId }) {
    state.networkId = networkId;
  },
  registerAccount(state, { account }) {
    state.account = account;
  },
  setError(state, { error }) {
    state.error = error;
  }
}

const getters = {
  networkName: (state) => {
    let network = NETWORKS[state.networkId];
    if(network === undefined) {
      return "Unknown Network";
    }
    return network.name;
  },
  explorerUri: (state) => {
    let network = NETWORKS[state.networkId];
    if(network === undefined) {
      return "#"
    }

    let explorerUri = new String(network.explorer).replace("{0}", state.account);
    return explorerUri;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};