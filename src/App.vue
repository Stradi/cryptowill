<template>
  <div class="bg-gray-900 text-gray-400">
    <div>
      <a href="#" @click="connectWeb3">Connect to Web3</a>
      <p>Network ID: {{ web3.networkId }}</p>
      <p>Account: {{ web3.selectedAccount }}</p>
      <p>Balance: {{ web3.balance }}</p>
    </div>

    <NavigationBar />
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  name: "App",
  components: {
    NavigationBar
  },
  computed: {
    web3() {
      return this.$store.state.web3;
    }
  },
  beforeCreate() {
    this.$store.dispatch("registerWeb3");
  }
}
</script>
