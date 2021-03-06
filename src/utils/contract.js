import contractAbi from "@/../contracts/CryptoWill.json";
import erc20Abi from "@/../contracts/ERC20.json";

import web3 from "@/utils/web3.js";
import { NETWORKS } from "@/utils/networks.js";

import web3js from "web3";

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

        if(Number.parseInt(coinShare) !== 0) {
          coins.push({
            address: approvedCoins[j].address,
            share: coinShare
          });
        }
      }

      payees.push({
        address: payee.self,
        alias: payee.name,
        isConfirmed: payee.isConfirmed,
        isWithdrawed: payee.isWithdrawed,
        message: payee.message,
        shares: coins
      });
    }

    resolve(payees);
  });
}

const getPayers = (contractInstance, address) => {
  return new Promise(async (resolve, reject) => {
    let payerCount = await getPayerCount(contractInstance, address).catch((error) => {
      reject(error);
      return;
    });

    let payers = [];
    for(let i = 0; i < payerCount; i++) {
      let payer = await contractInstance.methods.payeeToPayer(address, i).call({
        from: address
      }).catch((error) => {
        reject(error);
        return;
      });

      payers.push({
        address: payer
      });
    }
    
    resolve(payers);
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

const setPayeeShare = (contractInstance, address, { payeeAddress, coinAddress, share }) => {
  return new Promise(async (resolve, reject) => {
    await contractInstance.methods.setShareOfPayee(payeeAddress, coinAddress, share).send({
      from: address
    }).catch((error) => {
      reject(error);
      return;
    });

    resolve();
  });
}

const addPayee = (contractInstance, address, { payeeAddress, alias }) => {
  return new Promise(async (resolve, reject) => {
    await contractInstance.methods.addPayee(payeeAddress, alias).send({
      from: address,
      value: web3js.utils.toWei("0.035", "ether")
    }).catch((error) => {
      reject(error);
      return;
    });

    resolve();
  });
}

const confirm = (contractInstance, address, { payerAddress }) => {
  return new Promise(async (resolve, reject) => {
    await contractInstance.methods.confirm(payerAddress).send({
      from: address
    }).catch((error) => {
      reject(error);
      return;
    });

    resolve();
  });
}

const canWithdraw = (contractInstance, address, { payerAddress }) => {
  return new Promise(async (resolve, reject) => {
    await contractInstance.methods.canWithdraw(payerAddress).call({
      from: address
    }).catch((error) => {
      reject(error);
      return;
    });

    resolve(true);
  });
}

const estimatedTimeToWithdraw = (contractInstance, address, { payerAddress }) => {
  return new Promise(async (resolve, reject) => {
    let timestamp = await contractInstance.methods.estimatedTimeToWithdraw(payerAddress).call({
      from: address
    }).catch((error) => {
      reject(error);
      return;
    });
 
    resolve(new Date(timestamp * 1000));
  })
}

const withdraw = (contractInstance, address, { payerAddress }) => {
  return new Promise(async (resolve, reject) => {
    await contractInstance.methods.withdrawFromPayer(payerAddress).send({
      from: address
    }).catch((error) => {
      reject(error);
      return;
    });

    resolve();
  })
}

const approveToken = (contractInstance, address, { coinAddress, networkId }) => {
  return new Promise(async (resolve, reject) => {
    let web3Instance = await web3.getInstance().catch((error) => { 
      reject(error);
      return;
    });


    let contract = new web3Instance.eth.Contract(erc20Abi, coinAddress);
    if(contract === undefined) {
      reject("Could not approve token.");
      return;
    }

    let contractAddress = NETWORKS[networkId].contractAddress;

    let BN = web3js.utils.BN;
    await contract.methods.approve(contractAddress, new BN("2").pow(new BN("256")).sub(new BN("1"))).send({
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
    let payeeCount = await contractInstance.methods.getPayeeCount(address).call({
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

const getPayerCount = (contractInstance, address) => {
  return new Promise(async (resolve, reject) => {
    let payerCount = await contractInstance.methods.getPayerCount(address).call({
      from: address
    }).catch((error) => {
      reject(error);
      return;
    });

    resolve(payerCount);
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

export default { getContract, getPayees, getPayers, getApprovedCoins, setPayeeMessage, setPayeeShare, addPayee, confirm, canWithdraw, estimatedTimeToWithdraw, withdraw, approveToken };