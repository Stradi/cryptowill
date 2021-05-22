<template>
  <div v-if="loading" class="bg-gray-900 bg-opacity-95 absolute w-full h-full">
    <p class="relative top-1/3 text-center">Waiting for transaction to be confirmed.</p>
  </div>
  <div class="p-4 w-96">
    <div class="text-left pb-4">
      <label for="address" class="font-medium">Address</label>
      <input v-model="address" name="address" id="address" type="text" placeholder="0x0000000000000000000000000000000000000000" @input="onAddressChange" :class="isAddressValid ? 'ring-yellow-500' : address == '' ? '' : 'ring-red-600'" class="ring-2 ring-transparent mt-1 p-2 text-black rounded-2xl w-full outline-none">
      <label for="alias" class="font-medium">Alias</label>
      <input v-model="alias" name="alias" id="alias" type="text" placeholder="Charmander" @input="onAddressChange" :class="alias != '' ? 'ring-yellow-500' : ''" class="ring-2 ring-transparent mt-1 p-2 text-black rounded-2xl w-full outline-none">
      <p v-if="this.errorMessage !== '' && this.address != ''">{{ this.errorMessage }}</p>
    </div>
    <a href="#" @click="save" :class="(!this.isAddressValid || this.alias === '') ? 'hover:cursor-not-allowed hover:bg-yellow-800 bg-yellow-800' : ''" class="block text-center font-medium p-2 rounded-3xl bg-yellow-600 text-white-500 transition ease-out duration-200 hover:bg-yellow-500">Add payee</a>
  </div>
</template>

<script>
import web3 from "@/utils/web3.js";

export default {
  name: "AddNewPayeeModal",
  emits: ["close"],
  data: function() {
    return {
      address: "",
      alias: "",
      payeeAddresses: [],
      selfAddress: "",
      errorMessage: "",
      isAddressValid: false,
      loading: false
    }
  },
  methods: {
    async save() {
      this.loading = true;
      await this.$store.dispatch("contract/addPayee", { payeeAddress: this.address, alias: this.alias });
      await this.$store.dispatch("contract/getPayees");
      this.loading = false;

      this.$emit("close");
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