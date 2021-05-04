<template>
  <div class="p-4 bg-gray-800 bg-opacity-50">
    <div v-if="status">
      <div v-if="isConnected" class="flex justify-between">
        <p class="hidden md:block">Connected to <span class="font-medium">{{ networkName }}</span> with <a :href="explorerURI"><span class="font-medium text-yellow-500 transition duration-100 ease-out hover:text-yellow-600">{{ web3.selectedAccount }}</span></a></p>
        <ConnectWeb3Button text="Reconnect" class="hidden md:block" />

        <details class="md:hidden">
          <summary>Network Information</summary>
          <div>
            <p>{{ networkName }}</p>
            <a :href="explorerURI"><p class="font-medium text-yellow-500 transition duration-100 ease-out hover:text-yellow-600">{{ web3.selectedAccount }}</p></a>
            <ConnectWeb3Button text="Reconnect" />
          </div>
        </details>
      </div>
      <div v-else class="flex justify-end">
        <ConnectWeb3Button text="Connect" />
      </div>
    </div>
    <div v-else>
      Could not find any Web3 extension. Please install <a href="https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn" class="font-medium text-yellow-500">MetaMask</a>.
    </div>
  </div>
</template>

<script>
import ConnectWeb3Button from "@/components/ConnectWeb3Button.vue";

export default {
  name: "Web3NetworkInfo",
  components: {
    ConnectWeb3Button
  },
  computed: {
    web3() {
      return this.$store.state.web3;
    },
    status() {
      return this.$store.state.web3.status;
    },
    networkName() {
      return this.$store.getters.networkName;
    },
    explorerURI() {
      return this.$store.getters.addressExplorerURI;
    },
    isConnected() {
      return this.$store.getters.isConnectedToWeb3;
    }
  },
  beforeCreate() {
    this.$store.dispatch("registerWeb3Status");
  }
}
</script>