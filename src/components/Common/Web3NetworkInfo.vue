<template>
  <div class="p-4 bg-gray-800 bg-opacity-50 hidden lg:block">
    <div v-if="isConnected && this.$store.state.web3.account" class="flex justify-between">
      <p>Connected to
        <span class="text-yellow-500">{{ networkName }}</span> with 
        <span class="text-yellow-500 hover:text-yellow-600 transition duration-200 ease-out"><a :href="explorerUri">{{ this.$store.state.web3.account }}</a></span>.
      </p>
      <ConnectWeb3Button text="Reconnect" />
    </div>
    <div v-else class="flex justify-between">
      <div>
        {{ error }}
      </div>
      <ConnectWeb3Button text="Connect" />
    </div>
  </div>
</template>

<script>
import ConnectWeb3Button from "@/components/Common/ConnectWeb3Button.vue";

export default {
  name: "Web3NetworkInfo",
  components: {
    ConnectWeb3Button
  },
  computed: {
    isConnected: function() {
      return this.$store.state.web3.isConnected;
    },
    networkName: function() {
      return this.$store.getters["web3/networkName"];
    },
    explorerUri: function() {
      return this.$store.getters["web3/explorerUri"];
    },
    error: function() {
      return this.$store.state.web3.error;
    }
  },
  beforeMount() {
    this.$store.dispatch("web3/connect");
  }
}
</script>