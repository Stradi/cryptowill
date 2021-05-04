<template>
  <div class="p-4 bg-gray-800 bg-opacity-50">
    <div v-if="isConnected" class="flex justify-between">
      <p>Connected to <span class="font-medium">{{ networkName }}</span> with <a :href="explorerURI"><span class="font-medium text-yellow-500 transition duration-100 ease-out hover:text-yellow-600">{{ web3.selectedAccount }}</span></a></p>
      <a href="#" @click="connect" class="font-medium text-yellow-500">Reconnect</a>
    </div>
    <div v-else class="flex justify-end">
      <a href="#" @click="connect" class="font-medium text-yellow-500">Connect to Web3 Provider</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Web3NetworkInfo",
  methods: {
    connect() {
      this.$store.dispatch("registerWeb3");
    }
  },
  computed: {
    web3() {
      return this.$store.state.web3;
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
  }
}
</script>