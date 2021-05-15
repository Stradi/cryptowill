<template>
  <div>
    <SearchDropdown placeholder="Search for a Token" :items="tokens" @selected="selectedTokenChanged" />
    <div class="py-2">
      <label>Percentage</label>
      <div>
        <input v-model="percentage" type="range" min="0" max="100" :class="isPercentageSet ? 'ring-2 ring-yellow-500' : ''">
        <p class="text-center">%{{ percentage }}</p>
      </div>
    </div>
    <a href="#" :class="!isPercentageSet || !isTokenSelected ? 'hover:cursor-not-allowed hover:bg-yellow-800 bg-yellow-800' : ''" class="block text-center font-medium p-2 rounded-3xl bg-yellow-600 text-white-500 transition ease-out duration-200 hover:bg-yellow-500">Add share</a>
  </div>
</template>

<script>
import SearchDropdown from "@/components/SearchDropdown.vue";

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
      percentage: "0"
    }
  },
  computed: {
    isTokenSelected() {
      return this.selectedToken !== undefined;
    },
    isPercentageSet() {
      return this.percentage !== "0";
    }
  },
  methods: {
    selectedTokenChanged(newToken) {
      let selectedTokenAddress = Object.entries(TOKENS["TESTNET"]).filter((item) => {
        return item[1] === newToken
      })[0][0];
      this.selectedToken = selectedTokenAddress;
    },
    save() {

    }
  }
}
</script>