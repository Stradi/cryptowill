<template>
  <div class="p-4 w-96">
    <SearchDropdown placeholder="Search for a Token" :items="tokens" @selected="selectedTokenChanged" />
    <div class="py-2">
      <label>Percentage</label>
      <div>
        <input v-model.number="percentage" type="range" min="0" :max="this.percentageLeftForToken || '100'" :class="isPercentageSet ? 'ring-2 ring-yellow-500' : ''">
        <p class="text-center">%{{ percentage }}</p>
      </div>
    </div>
    <a href="#" :class="!isPercentageSet || !isTokenSelected ? 'hover:cursor-not-allowed hover:bg-yellow-800 bg-yellow-800' : ''" class="block text-center font-medium p-2 rounded-3xl bg-yellow-600 text-white-500 transition ease-out duration-200 hover:bg-yellow-500">Add share</a>
  </div>
</template>

<script>
import SearchDropdown from "@/components/Common/SearchDropdown.vue";

import { TOKENS } from "@/utils/token.js";

export default {
  name: "AddNewShareModal",
  components: {
    SearchDropdown
  },
  data: function() {
    return {
      tokens: Object.values(TOKENS["TESTNET"]),
      selectedToken: undefined,
      percentage: 0,
      percentageLeftForToken: 0
    }
  },
  computed: {
    isTokenSelected() {
      return this.selectedToken !== undefined;
    },
    isPercentageSet() {
      return this.percentage !== 0;
    }
  },
  methods: {
    selectedTokenChanged(newToken) {
      let selectedTokenAddress = Object.entries(TOKENS["TESTNET"]).filter((item) => {
        return item[1] === newToken
      })[0][0];
      this.selectedToken = selectedTokenAddress;
      
      let token = this.getToken(this.selectedToken);
      this.percentage = 0;
      if(token === null) {
        this.percentageLeftForToken = 100;
      } else {
        this.percentageLeftForToken = token.percentageLeft;
      }
    },
    save() {
      let isTokenApproved = false;
      let token = this.getToken(this.selectedToken);
      if(token !== null) {
        isTokenApproved = true;
        //Call set share from here.
      } else {
        //Call approveCoin and then set share.
      }
    },
    getToken(address) {
      let token = this.$store.state.contract.approvedCoins.filter((item) => { return item.address == address });
      if(token.length === 0) {
        return null;
      }

      return token[0];
    }
  }
}
</script>