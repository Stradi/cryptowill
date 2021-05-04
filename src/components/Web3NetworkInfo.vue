<template>
  <div class="p-4 bg-gray-800 bg-opacity-50">
    <div v-if="isConnected" class="flex justify-between">
      <p>Connected to <span class="font-medium">{{ networkName }}</span> with <a :href="explorerURI"><span class="font-medium text-yellow-500 transition duration-100 ease-out hover:text-yellow-600">{{ web3.selectedAccount }}</span></a></p>
      <ConnectWeb3Button text="Reconnect" />
    </div>
    <div v-else class="flex justify-end">
      <ConnectWeb3Button text="Connect" />
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