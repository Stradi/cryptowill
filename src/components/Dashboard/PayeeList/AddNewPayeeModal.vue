<template>
  <div class="p-4 w-96">
    <div class="text-left pb-4">
      <label for="address" class="font-medium">Address</label>
      <input v-model="address" name="address" id="address" type="text" placeholder="0x0000000000000000000000000000000000000000" @input="onAddressChange" :class="isAddressValid ? 'ring-yellow-500' : address == '' ? '' : 'ring-red-600'" class="ring-2 ring-transparent mt-1 p-2 text-black rounded-2xl w-full outline-none">
      <p v-if="this.errorMessage !== '' && this.address != ''">{{ this.errorMessage }}</p>
    </div>
    <a href="#" @click="save" :class="!this.isAddressValid ? 'hover:cursor-not-allowed hover:bg-yellow-800 bg-yellow-800' : ''" class="block text-center font-medium p-2 rounded-3xl bg-yellow-600 text-white-500 transition ease-out duration-200 hover:bg-yellow-500">Add payee</a>
  </div>
</template>

<script>
import web3 from "@/utils/web3.js";

export default {
  name: "AddNewPayeeModal",
  data: function() {
    return {
      address: "",
      payeeAddresses: [],
      selfAddress: "",
      errorMessage: "",
      isAddressValid: false
    }
  },
  methods: {
    save() {
        
    },
    onAddressChange() {
      web3.isAddressValid(this.address, this.payeeAddresses, this.selfAddress).then(() => {
        this.errorMessage = "";
        this.isAddressValid = true;
      }).catch((error) => {
        this.errorMessage = error;
        this.isAddressValid = false;
      });
    }
  },
  mounted() {
    this.payeeAddresses = this.$store.state.contract.payees.map(a => a.address);
    this.selfAddress = this.$store.state.web3.account;
  }
}
</script>