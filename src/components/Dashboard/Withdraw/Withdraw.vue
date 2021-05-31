<template>
  <div>
    <div v-if="loading" class="bg-gray-900 bg-opacity-95 absolute h-full w-full inset-0 z-10">
      <p class="relative top-1/3 text-center">Waiting for transaction to be confirmed.</p>
    </div>
    <div class="p-5 rounded-3xl bg-gray-800 text-left">
      <p class="text-2xl text-white">Withdraw Funds</p>
      <div class="pt-2 pb-4">
        <label for="withdrawAddress" class="font-medium">Address</label>
        <input v-model="address" type="text" name="withdrawAddress" id="withdrawAddress" :disabled="!this.$store.state.contract.isInitialized" placeholder="0x0000000000000000000000000000000000000000" @input="onAddressChange" :class="isAddressValid ? 'ring-yellow-500' : address == '' ? '' : 'ring-red-600'" class="ring-2 ring-transparent mt-1 p-2 text-black rounded-2xl w-full outline-none">
      </div>
      {{ this.errorMessage }}
      <a href="#" @click="withdraw" :class="!this.isAddressValid ? 'hover:cursor-not-allowed hover:bg-yellow-800 bg-yellow-800' : ''" class="block text-center font-medium p-2 rounded-3xl bg-yellow-600 text-white transition ease-out duration-200 hover:bg-yellow-500">{{ this.canWithdraw ? "Withdraw" : "Check availability" }}</a>
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
      canWithdraw: false
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
        contract.checkWithdrawAvailability(this.$store.state.contract.instance, this.$store.state.web3.account, {
          payerAddress: this.address
        }).then(() => {
          this.canWithdraw = true;
        }).catch(() => {
          this.canWithdraw = false;
        });
      }
      this.loading = false;
    }
  }
}
</script>