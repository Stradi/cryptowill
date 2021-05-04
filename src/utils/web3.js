import Web3 from "web3";

const ERRORS = {
  "WEB3_NO_PROVIDER": "Provider could not found.",
  "WEB3_ACCESS_DECLINED": "User rejected the request.",
  "WEB3_NO_NETWORK_ID": "Could not get network id."
}

const connect = () => {
  return new Promise(async (resolve, reject) => {
    let web3 = window.ethereum;
    if(web3 === undefined) {
      reject(ERRORS["WEB3_NO_PROVIDER"]);
      return;
    }

    const response = await web3.request({
      method: "eth_requestAccounts"
    }).catch((error) => {
      reject(ERRORS["WEB3_ACCESS_DECLINED"]);
      return;
    });

    if(response === undefined || response.length === 0) {
      reject(ERRORS["WEB3_ACCESS_DECLINED"]);
      return;
    }

    resolve();
  });
};

const getInstance = () => {
  return new Promise(async (resolve, reject) => {
    let web3 = window.ethereum;
    if(web3 === undefined) {
      reject(ERRORS["WEB3_NO_PROVIDER"]);
      return;
    }

    resolve(new Web3(web3));
  });
}

const getNetworkId = async (instance) => {
  return new Promise(async (resolve, reject) => {
    const networkId = await instance.eth.net.getId().catch((error) => {
      reject(ERRORS["WEB3_NO_NETWORK_ID"]);
      return;
    });

    resolve(networkId);
  });
}

const getAccount = async (instance) => {
  return new Promise(async (resolve, reject) => {
    const accounts = await instance.eth.getAccounts().catch((error) => {
      reject(ERRORS["WEB3_ACCESS_DECLINED"]);
      return;
    });

    if(accounts.length === 0) {
      reject(ERRORS["WEB3_ACCESS_DECLINED"]);
      return;
    }

    resolve(accounts[0]);
  });
}

export default { connect, getInstance, getNetworkId, getAccount };