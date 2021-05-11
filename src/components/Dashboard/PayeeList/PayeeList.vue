<template>
  <div class="p-5 rounded-3xl bg-gray-800">
    <div class="flex justify-between">
      <p class="text-2xl text-white">My Payees</p>
      <a href="#" class="px-4 py-1 text-gray-200 font-medium bg-yellow-700 rounded-3xl transition duration-300 ease-out transform hover:-translate-y-0.5 hover:bg-yellow-600">Add New Payee</a>
    </div>
    <div class="text-left pt-2">
      <div v-if="payeeList === undefined">
        <SinglePayeeItem isLoader />
        <SinglePayeeItem isLoader />
      </div>
      <SinglePayeeItem v-for="item, idx in payeeList" :key=idx :item=item />
    </div>
  </div>
</template>

<script>
import SinglePayeeItem from '@/components/Dashboard/PayeeList/SinglePayeeItem.vue';

export default {
  components: { 
    SinglePayeeItem
  },
  name: "PayeeList",
  computed: {
    payeeList: function() {
      return this.$store.state.contract.payees;
    }
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