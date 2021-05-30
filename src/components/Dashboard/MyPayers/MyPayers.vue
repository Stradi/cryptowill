<template>
  <div class="p-5 rounded-3xl bg-gray-800">
    <p class="text-2xl text-white text-left">My Payers</p>
    <div class="text-left pt-2">
      <div v-if="payerList === undefined">
        <SinglePayerItem isLoader />
        <SinglePayerItem isLoader />
      </div>
      <div v-if="payerList !== undefined && payerList.length === 0" class="text-center text-lg py-4">
        You have no payers.
      </div>
      <div v-else>
        <SinglePayerItem v-for="item, idx in payerList" :key=idx :item=item />
      </div>
    </div>
  </div>
</template>

<script>
import SinglePayerItem from "@/components/Dashboard/MyPayers/SinglePayerItem.vue";

export default {
  name: "MyPayers",
  components: {
    SinglePayerItem
  },
  computed: {
    payerList: function() {
      return this.$store.state.contract.payers;
    }
  }
}
</script>

<style>

</style>