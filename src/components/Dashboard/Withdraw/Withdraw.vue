<template>
  <div>
    <div v-if="loading" class="bg-gray-900 bg-opacity-95 absolute h-full w-full inset-0 z-10">
      <p class="relative top-1/3 text-center">Waiting for transaction to be confirmed.</p>
    </div>
    <div class="p-5 rounded-3xl bg-gray-800 text-left">
      <p class="text-2xl text-white">Withdraw Funds</p>
      <div class="pt-2">
        <label for="withdrawAddress" class="font-medium">Address</label>
        <input v-model="address" type="text" name="withdrawAddress" id="withdrawAddress" :disabled="!this.$store.state.contract.isInitialized" placeholder="0x0000000000000000000000000000000000000000" @input="onAddressChange" :class="isAddressValid ? 'ring-yellow-500' : address == '' ? '' : 'ring-red-600'" class="ring-2 ring-transparent mt-1 p-2 text-black rounded-2xl w-full outline-none">
      </div>
      {{ this.errorMessage }}
      {{ this.estimatedWithdrawDate }}
      <a href="#" @click="withdraw" :class="!this.isAddressValid ? 'hover:cursor-not-allowed hover:bg-yellow-800 bg-yellow-800' : ''" class="block text-center font-medium p-2 mt-4 rounded-3xl bg-yellow-600 text-white transition ease-out duration-200 hover:bg-yellow-500">{{ this.canWithdraw ? "Withdraw" : "Check availability" }}</a>
    </div>
  </div>
</template>

<script>
import web3 from "@/utils/web3.js";
import contract from "@/utils/contract.js";

export default {
  name: "Withdraw",
  data: function() {
    return {
      address: "",
      errorMessage: "",
      isAddressValid: false,
      loading: false,
      canWithdraw: false,
      estimatedWithdrawDate: ""
    }
  },
  methods: {
    onAddressChange() {
      web3.isAddressValid(this.address, [], this.$store.state.web3.account).then(() => {
        this.errorMessage = "";
        this.isAddressValid = true;
      }).catch((error) => {
        this.errorMessage = error;
        this.isAddressValid = false;
      });
    },
    async withdraw() {
      if(!this.isAddressValid) {
        return;
      }
      this.loading = true;
      if(this.canWithdraw) {
        await this.$store.dispatch("contract/withdraw", {
          payerAddress: this.address
        });
      } else {
        let canWithdraw = await contract.canWithdraw(this.$store.state.contract.instance, this.$store.state.web3.account, {
          payerAddress: this.address
        });

        let estimatedWithdrawDate = await contract.estimatedTimeToWithdraw(this.$store.state.contract.instance, this.$store.state.web3.account, {
          payerAddress: this.address
        });

        let currentDate = new Date();

        if(canWithdraw && estimatedWithdrawDate < currentDate) {
          this.canWithdraw = true;
        } else {
          this.canWithdraw = false;
          this.estimatedWithdrawDate = "Time to withdraw: " + this.getEstimatedTimeStr(estimatedWithdrawDate, currentDate);
        }
      }
      this.loading = false;
    },
    getEstimatedTimeStr(estimatedWithdrawDate, currentDate) {
      let str = "";
      let delta = (estimatedWithdrawDate - currentDate) / 1000; //secs
      let days = Math.floor(delta / 86400);
      delta -= days * 86400;

      let hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      let mins = Math.floor(delta / 60) % 60;
      delta -= mins * 60;

      if(days !== 0) {
        str += days + " days";
      }

      if(hours !== 0) {
        str += hours + " hours";
      }

      if(mins !== 0) {
        str += mins + " mins";
      }

      return str;
    }
  }
}
</script>