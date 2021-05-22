<template>
  <div class="max-w-5xl mx-auto text-center my-12">
    <div v-if="this.$store.state.contract.isInitialized === false">
      {{ this.$store.state.contract.error }}
    </div>

    <div class="grid grid-cols-3 gap-8">
      <div class="col-span-2"><PayeeList /></div>
      <div class=""><Confirm /></div>
      <div></div>
      <div></div>
      <div class=""><Withdraw /></div>
    </div>
  </div>
</template>

<script>
import PayeeList from "@/components/Dashboard/PayeeList/PayeeList.vue";
import Confirm from "@/components/Dashboard/Confirm/Confirm.vue";
import Withdraw from "@/components/Dashboard/Withdraw/Withdraw.vue";

export default {
  name: "Dashboard",
  components: {
    PayeeList,
    Confirm,
    Withdraw
  }
}
</script>