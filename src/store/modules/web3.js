import web3 from "@/utils/web3.js";
import { NETWORKS } from "@/utils/networks.js";

const state = () => ({
  isConnected: false,
  instance: undefined,
  networkId: undefined,
  account: undefined
});

const actions = {
  connect({ commit }) {
    return new Promise(async (resolve, reject) => {
      //TODO: Delete log message in production.
      let promises = [
        await web3.connect(),
        await web3.getInstance(),
        await web3.getNetworkId(),
        await web3.getAccount()
      ];

      Promise.all(promises).then((values) => {
        commit("registerWeb3", {
          instance: values[1],
          networkId: values[2],
          account: values[3]
        });

        commit("registerIsConnected", {
          isConnected: true
        });
        
        resolve();
      }).catch((error) => {
        commit("registerIsConnected", {
          isConnected: false
        });

        reject(error);
      });
    });
  }
}

const mutations = {
  registerWeb3(state, { instance, networkId, account }) {
    state.insance = instance;
    state.networkId = networkId;
    state.account = account;
  },
  registerIsConnected(state, { isConnected }) {
    state.isConnected = isConnected;
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