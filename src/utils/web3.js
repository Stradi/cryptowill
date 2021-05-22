import Web3 from "web3";

const ERRORS = {
  "WEB3_NO_PROVIDER": "Provider could not found.",
  "WEB3_ACCESS_DECLINED": "User rejected the request.",
  "WEB3_NO_NETWORK_ID": "Could not get network id."
}

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

const connect = () => {
  return new Promise(async (resolve, reject) => {
    const response = await window.ethereum.request({ method: "eth_requestAccounts" }).catch((error) => {
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

const getNetworkId = async () => {
  return new Promise(async (resolve, reject) => {
    let instance = await getInstance().catch((error) => { reject(error); return; });
    const networkId = await instance.eth.net.getId().catch((error) => {
      reject(ERRORS["WEB3_NO_NETWORK_ID"]);
      return;
    });
    
    resolve(networkId);
  });
}

const getAccount = async () => {
  return new Promise(async (resolve, reject) => {
    let instance = await getInstance().catch((error) => { reject(error); return; });
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

const isAddressValid = (address, payeeAddresses, selfAddress) => {
  return new Promise((resolve, reject) => {
    if(payeeAddresses.includes(address)) {
      reject("This address is already a payee.");
    }
  
    if(selfAddress == address) {
      reject("You can't add yourself as payee.");
    }
  
    if(address == "0x0000000000000000000000000000000000000000") {
      reject("You can't add 0x00..0 address as payee.");
    }
  
    try {
      Web3.utils.toChecksumAddress(address);
      resolve();
    } catch {
      reject("Address is invalid.");
    }
  });
}

export default { connect, getInstance, getNetworkId, getAccount, isAddressValid };