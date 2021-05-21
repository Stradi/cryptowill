<template>
  <div class="max-w-5xl mx-auto text-center my-12">
    <div v-if="this.$store.state.contract.isInitialized === false">
      {{ this.$store.state.contract.error }}
    </div>

    <div class="grid grid-cols-2 gap-8">
      <div class=""><PayeeList /></div>
    </div>
  </div>
</template>

<script>
import PayeeList from "@/components/Dashboard/PayeeList/PayeeList.vue";

export default {
  name: "Dashboard",
  components: {
    PayeeList,
  },
  mounted() {
    // Try to initialize contract.
    if(!this.$store.state.contract.isInitialized) {
      let self = this;
      let intervalHandle = setInterval(async function() {
        await self.$store.dispatch("contract/initialize");
        await self.$store.dispatch("contract/getApprovedCoins");
        await self.$store.dispatch("contract/getPayees");

        if(self.$store.state.contract.isInitialized) {
          clearInterval(intervalHandle);
        }
      }, 1250);
    }
  }
}
</script>