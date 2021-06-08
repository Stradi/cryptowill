<template>
  <div class="max-w-5xl mx-auto text-center my-8">
    <div v-if="this.$store.state.contract.isInitialized === false">
      {{ this.$store.state.contract.error }}
    </div>

    <div class="md:grid grid-cols-3 gap-8">
      <div class="py-4 col-span-2"><PayeeList /></div>
      <div class="py-4 "><Confirm /></div>
      <div class="py-4 col-span-2"><MyPayers /></div>
      <div class="py-4 "><Withdraw /></div>
    </div>
  </div>
</template>

<script>
import PayeeList from "@/components/Dashboard/PayeeList/PayeeList.vue";
import Confirm from "@/components/Dashboard/Confirm/Confirm.vue";
import Withdraw from "@/components/Dashboard/Withdraw/Withdraw.vue";
import MyPayers from "@/components/Dashboard/MyPayers/MyPayers.vue";

export default {
  name: "Dashboard",
  components: {
    PayeeList,
    Confirm,
    Withdraw,
    MyPayers
  }
}
</script>