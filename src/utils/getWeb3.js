import Web3 from "web3";

let web3Instance = null;

const getWeb3Instance = () => { 
  return new Promise(async (resolve, reject) => {
    var web3js = window.ethereum;
    if(web3js === undefined) {
      reject("Could not get Web3 instance");
    }
    if(web3Instance == null) {
      web3Instance = new Web3(web3js);
    }
    resolve(web3Instance);
  });
};

const getNetworkID = () => {
  return new Promise(async (resolve, reject) => {
    const networkID = await web3Instance.eth.net.getId();
    if(networkID === undefined || networkID === null) {
      reject("Could not find Network ID");
    } else {
      resolve(networkID);
    }
  });
};

const getSelectedAccount = () => {
  return new Promise(async (resolve, reject) => {
    const accounts = await web3Instance.eth.getAccounts();
    if(accounts.length == 0) {
      reject("Could not find any account");
    } else {
      resolve(accounts[0]);
    }
  });
};

const getAccountBalance = () => {
  return new Promise(async (resolve, reject) => {
    const account = await getSelectedAccount().catch((error) => { reject(error) });
    
    const balance = await web3Instance.eth.getBalance(account);
    if(balance === undefined || balance === null) {
      reject("Could not get balance");
    } else {
      resolve(balance);
    }
  });
}

export default { getWeb3Instance, getNetworkID, getSelectedAccount, getAccountBalance };