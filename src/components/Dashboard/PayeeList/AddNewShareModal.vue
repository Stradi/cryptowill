<template>
  <div v-if="loading" class="bg-gray-900 bg-opacity-95 absolute w-full h-full">
    <p class="relative top-1/3 text-center">Waiting for {{ this.transactionStatus }} / {{ this.pendingTransactionCount }} transactions.</p>
  </div>
  <div class="p-4">
    <SearchDropdown placeholder="Search for a Token" :items="tokens" @selected="selectedTokenChanged" />
    <div class="py-2">
      <label>Percentage</label>
      <div class="w-64">
        <input v-model.number="percentage" type="range" :disabled="!this.selectedToken" min="0" :max="this.percentageLeftForToken" :class="isPercentageSet ? 'ring-2 ring-yellow-500' : ''">
        <p v-if="this.percentageLeftForToken !== 0" class="text-center">%{{ percentage }}</p>
        <p v-else class="text-center">No share left for this token.</p>
      </div>
    </div>
    <a href="#" @click="save" :class="!isPercentageSet || !isTokenSelected ? 'hover:cursor-not-allowed hover:bg-yellow-800 bg-yellow-800' : ''" class="block text-center font-medium p-2 rounded-3xl bg-yellow-600 text-white-500 transition ease-out duration-200 hover:bg-yellow-500">Add share</a>
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
  props: ["payee"],
  emits: ["close"],
  data: function() {
    return {
      tokens: [],
      selectedToken: undefined,
      percentage: 0,
      percentageLeftForToken: -1,
      loading: false,
      pendingTransactionCount: 0,
      transactionStatus: 0
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
      if(newToken !== undefined) {
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
      } else {
        this.selectedToken = undefined;
      }
    },
    async save() {
      if(!this.isPercentageSet || !this.isTokenSelected) {
        return;
      }

      this.loading = true;
      this.pendingTransactionCount = 1;
      
      let token = this.getToken(this.selectedToken);
      if(token == null) {
        //Not approved
        this.pendingTransactionCount++;

        await this.$store.dispatch("contract/approveToken", {
          coinAddress: this.selectedToken
        });

        this.transactionStatus++;
      }

      await this.$store.dispatch("contract/setPayeeShare", {
        payeeAddress: this.payee.address,
        coinAddress: this.selectedToken,
        share: this.percentage
      });        
      
      this.transactionStatus++;

      await this.$store.dispatch("contract/getApprovedCoins");
      await this.$store.dispatch("contract/getPayees");
      this.$emit("close");
    },
    getToken(address) {
      let token = this.$store.state.contract.approvedCoins.filter((item) => { return item.address.toLowerCase() == address.toLowerCase() });
      if(token.length === 0) {
        return null;
      }

      return token[0];
    }
  },
  mounted() {
    //Remove tokens which payee has share of it.
    let tokenAddresses = Object.keys(TOKENS["TESTNET"]);

    tokenAddresses.forEach((item) => {
      if(!this.payee.shares.some(share => share.address.toLowerCase() === item.toLowerCase())) {
        this.tokens.push(TOKENS["TESTNET"][item]);
      }
    });
  }
}
</script>