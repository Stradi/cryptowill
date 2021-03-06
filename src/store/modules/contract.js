import contract from "@/utils/contract.js";

const state = () => ({
  isInitialized: false,
  instance: undefined,
  payees: undefined,
  payers: undefined,
  approvedCoins: undefined
});

const actions = {
  initialize({ rootState, commit }) {
    return new Promise(async (resolve, reject) => {
      commit("clearState");

      await contract.getContract(rootState.web3.networkId).then((contractInstance) => {
        commit("registerInstance", { instance: contractInstance })
      }).catch((error) => {
        reject(error);
      });

      resolve();
    });
  },
  getPayees({ commit, state, rootState }) {
    return new Promise(async (resolve, reject) => {
      let payees = await contract.getPayees(state.instance, rootState.web3.account, state.approvedCoins).catch((error) => {
        reject(error);
        return;
      });
  
      commit("registerPayees", {
        payees
      });
      resolve();
    });
  },
  getPayers({ commit, state, rootState }) {
    return new Promise(async (resolve, reject) => {
      let payers = await contract.getPayers(state.instance, rootState.web3.account).catch((error) => {
        reject(error);
        return;
      });

      commit("registerPayers", {
        payers
      });
      resolve();
    });
  },
  getApprovedCoins({ commit, state, rootState }) {
    return new Promise(async (resolve, reject) => {
      let approvedCoins = await contract.getApprovedCoins(state.instance, rootState.web3.account).catch((error) => {
        reject(error);
        return;
      });
  
      commit("registerApprovedCoins", {
        approvedCoins
      });
      resolve();
    });
  },
  setPayeeMessage({ state, rootState }, { address, message }) {
    return new Promise(async (resolve, reject) => {
      await contract.setPayeeMessage(state.instance, rootState.web3.account, { payeeAddress: address, message }).catch((error) => {
        reject(error);
        return;
      });

      resolve();
    });
  },
  setPayeeShare({ state, rootState }, { payeeAddress, coinAddress, share }) {
    return new Promise(async (resolve, reject) => {
      await contract.setPayeeShare(state.instance, rootState.web3.account, {
        payeeAddress,
        coinAddress,
        share
      }).catch((error) => {
        reject(error);
        return;
      });

      resolve();
    });
  },
  approveToken({ state, rootState }, { coinAddress }) {
    return new Promise(async (resolve, reject) => {
      await contract.approveToken(state.instance, rootState.web3.account, { coinAddress, networkId: rootState.web3.networkId }).catch((error) => {
        reject(error);
        return;
      });

      resolve();
    });
  },
  addPayee({ state, rootState }, { payeeAddress, alias }) {
    return new Promise(async (resolve, reject) => {
      await contract.addPayee(state.instance, rootState.web3.account, { payeeAddress, alias }).catch((error) => {
        reject(error);
        return;
      });

      resolve();
    });
  },
  confirm({ state, rootState }, { payerAddress }) {
    return new Promise(async (resolve, reject) => {
      await contract.confirm(state.instance, rootState.web3.account, { payerAddress }).catch((error) => {
        reject(error);
        return;
      });

      resolve();
    });
  },
  withdraw({ state, rootState }, { payerAddress }) {
    return new Promise(async (resolve, reject) => {
      await contract.withdraw(state.instance, rootState.web3.account, { payerAddress }).catch((error) => {
        reject(error);
        return;
      });

      resolve();
    });
  }
}

const mutations = {
  clearState(state) {
    state.isInitialized = false,
    state.instance = undefined,
    state.payees = undefined,
    state.payers = undefined,
    state.approvedCoins = undefined
  },
  registerInstance(state, { instance }) {
    state.instance = instance;
    state.isInitialized = true;
  },
  registerPayees(state, { payees }) {
    state.payees = payees;
  },
  registerPayers(state, { payers }) {
    state.payers = payers;
  },
  registerApprovedCoins(state, { approvedCoins }) {
    state.approvedCoins = approvedCoins;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
};