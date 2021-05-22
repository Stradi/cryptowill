<template>
  <div>
    <div v-if="loading" class="bg-gray-900 bg-opacity-95 absolute h-full w-full inset-0 z-10">
      <p class="relative top-1/3 text-center">Waiting for transaction to be confirmed.</p>
    </div>
    <div class="p-5 rounded-3xl bg-gray-800 text-left">
      <p class="text-2xl text-white">Confirm Death</p>
      <div class="pt-2 pb-4">
        <label for="address" class="font-medium">Address</label>
        <input v-model="address" name="address" id="address" type="text" :disabled="!this.$store.state.contract.isInitialized" placeholder="0x0000000000000000000000000000000000000000" @input="onAddressChange" :class="isAddressValid ? 'ring-yellow-500' : address == '' ? '' : 'ring-red-600'" class="ring-2 ring-transparent mt-1 p-2 text-black rounded-2xl w-full outline-none">
      </div>
      {{ this.errorMessage }}
      <a href="#" @click="confirm" :class="!this.isAddressValid ? 'hover:cursor-not-allowed hover:bg-yellow-800 bg-yellow-800' : ''" class="block text-center font-medium p-2 rounded-3xl bg-yellow-600 text-white transition ease-out duration-200 hover:bg-yellow-500">Confirm</a>
    </div>
  </div>
</template>

<script>
import web3 from "@/utils/web3.js";

export default {
  name: "Confirm",
  data: function() {
    return {
      address: "",
      errorMessage: "",
      isAddressValid: false,
      loading: false
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
    async confirm() {
      this.loading = true;
      await this.$store.dispatch("contract/confirm", { payerAddress: this.address });
      this.loading = false;
    }
  }
}
</script>