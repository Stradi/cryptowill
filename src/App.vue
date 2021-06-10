<template>
  <div class="bg-gray-900 text-gray-400">
    <Web3NetworkInfo />
    <NavigationBar />
    <router-view />
    <Modal v-if="!isNetworkCorrect && this.$store.state.web3.isConnected">
      <template v-slot:header>
        Wrong Network
      </template>
      <template v-slot:body>
        <div class="p-4 text-center">
          Please change the connected network to BSC and reconnect.<br>
          <ConnectWeb3Button text="Reconnect" />
        </div>
      </template>
    </Modal>
    <Footer />
  </div>
</template>

<script>
import NavigationBar from "@/components/Common/NavigationBar.vue";
import Footer from "@/components/Common/Footer.vue";
import Web3NetworkInfo from "@/components/Common/Web3NetworkInfo.vue";
import Modal from "@/components/Common/Modal.vue";
import ConnectWeb3Button from "@/components/Common/ConnectWeb3Button.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
    Footer,
    Web3NetworkInfo,
    Modal,
    ConnectWeb3Button
  },
  computed: {
    connectedNetworkId() {
      return this.$store.state.web3.networkId;
    },
    isNetworkCorrect() {
      return this.connectedNetworkId === 97;
    }
  },
  async beforeCreate() {
    await this.$store.dispatch("web3/connect");
    await this.$store.dispatch("contract/initialize");
    await this.$store.dispatch("contract/getApprovedCoins");
    await this.$store.dispatch("contract/getPayees");
    await this.$store.dispatch("contract/getPayers");

  }
}
</script>