<template>
  <div class="max-w-2xl mx-auto text-center my-12">
    <div v-if="this.$store.state.contract.isInitialized === false">
      {{ this.$store.state.contract.error }}
    </div>

    <PayeeList />
  </div>
</template>

<script>
import PayeeList from "@/components/CreateWill/PayeeList.vue";

export default {
  name: "Dashboard",
  components: {
    PayeeList
  }
}
</script>