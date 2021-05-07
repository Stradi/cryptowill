import contractAbi from "@/../contracts/CryptoWill.json";

import web3 from "@/utils/web3.js";
import { NETWORKS } from "@/utils/networks.js";

const ERRORS = {
  "WEB3_UNKNOWN_NETWORK_ID": "Provided network id is unknown.",
  "WEB3_UNDEFINED_CONTRACT": "Contract created is undefined."
}

const getContract = (networkId) => {
  return new Promise(async (resolve, reject) => {
    let web3Instance = await web3.getInstance().catch((error) => { 
      reject(error);
      return;
    });

    let network = NETWORKS[networkId];
    if(network === undefined) {
      console.log(networkId);
      reject(ERRORS["WEB3_UNKNOWN_NETWORK_ID"]);
      return;
    }

    let contractAddress = network.contractAddress;
    let contract = new web3Instance.eth.Contract(contractAbi, contractAddress);

    if(contract === undefined) {
      reject(ERRORS["WEB3_UNDEFINED_CONTRACT"]);
      return;
    }

    resolve(contract);
  });
}

export default { getContract };