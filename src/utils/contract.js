import contractAbi from "@/../contracts/CryptoWill.json";

import web3 from "@/utils/web3.js";
import { NETWORKS } from "@/utils/networks.js";

const ERRORS = {
  "WEB3_NOT_CONNECTED": "Not connected to Web3 provider.",
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
      reject(ERRORS["WEB3_NOT_CONNECTED"]);
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

const getPayees = (contractInstance, address, approvedCoins) => {
  return new Promise(async (resolve, reject) => {
    let payeeCount = await getPayeeCount(contractInstance, address).catch((error) => {
      reject(error);
      return;
    });

    let payees = [];
    for(let i = 0; i < Number.parseInt(payeeCount); i++) {
      let payee = await getPayeeWithIndex(contractInstance, address, i).catch((error) => {
        reject(error);
        return;
      });

      let coins = []
      for(let j = 0; j < approvedCoins.length; j++) {
        let coinShare = await getPayeeShareForCoin(contractInstance, address, payee.self, approvedCoins[j].address).catch((error) => {
          reject(error);
          return;
        });

        coins.push({
          address: approvedCoins[j].address,
          share: coinShare
        });
      }

      payees.push({
        address: payee.self,
        isConfirmed: payee.isConfirmed,
        isWithdrawed: payee.isWithdrawed,
        message: payee.message,
        shares: coins
      });
    }

    resolve(payees);
  });
}

const getApprovedCoins = (contractInstance, address) => {
  return new Promise(async (resolve, reject) => {
    let approvedCoinCount = await getApprovedCoinCount(contractInstance, address).catch((error) => {
      reject(error);
      return;
    });

    let coins = [];
    for(let i = 0; i < Number.parseInt(approvedCoinCount); i++) {
      let coinAddress = await getCoinAddressWithIndex(contractInstance, address, i).catch((error) => {
        reject(error);
        return;
      });

      let leftCoinPercentage = await getLeftCoinPercentage(contractInstance, address, coinAddress).catch((error) => {
        reject(error);
        return;
      });

      coins.push({
        address: coinAddress,
        percentageLeft: 100 - leftCoinPercentage
      });
    }

    resolve(coins);
  });
}

const setPayeeMessage = (contractInstance, address, { payeeAddress, message }) => {
  return new Promise(async (resolve, reject) => {
    await contractInstance.methods.setPayeeMessage(payeeAddress, message).send({
      from: address
    }).catch((error) => {
      reject(error);
      return;
    });

    resolve();
  });
}

const getPayeeCount = (contractInstance, address) => {
  return new Promise(async (resolve, reject) => {
    let payeeCount = await contractInstance.methods.getPayeeCount().call({
      from: address
    }).catch((error) => {
      reject(error);
      return;
    });

    resolve(payeeCount);
  })
}

const getPayeeWithIndex = (contractInstance, address, payeeIndex) => {
  return new Promise(async (resolve, reject) => {
    let payee = contractInstance.methods.payerToPayee(address, payeeIndex).call({
      from: address
    }).catch((error) => {
      reject(error);
      return;
    });

    resolve(payee);
  });
}

const getApprovedCoinCount = (contractInstance, address) => {
  return new Promise(async (resolve, reject) => {
    let coinCount = contractInstance.methods.getApprovedCoinCount().call({
      from: address
    }).catch((error) => {
      reject(error);
      return;
    });

    resolve(coinCount);
  });
}

const getCoinAddressWithIndex = (contractInstance, address, coinIndex) => {
  return new Promise(async (resolve, reject) => {
    let coin = contractInstance.methods.payerToApprovedCoins(address, coinIndex).call({
      from: address
    }).catch((error) => {
      reject(error);
      return;
    });

    resolve(coin);
  })
}

const getPayeeShareForCoin = (contractInstance, address, payeeAddress, coinAddress) => {
  return new Promise(async (resolve, reject) => {
    let share = contractInstance.methods.getPayeeShareForCoin(payeeAddress, coinAddress).call({
      from: address
    }).catch((error) => {
      reject(error);
      return;
    });

    resolve(share);
  });
}

const getLeftCoinPercentage = (contractInstance, address, coinAddress) => {
  return new Promise(async (resolve, reject) => {
    let percentage = contractInstance.methods.payerToCoinPercentage(address, coinAddress).call({
      from: address
    }).catch((error) => {
      reject(error);
      return;
    });

    resolve(percentage);
  });
}

export default { getContract, getPayees, getApprovedCoins, setPayeeMessage };