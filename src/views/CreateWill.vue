<template>
  <div class="max-w-2xl mx-auto text-center my-12">
    <div v-if="this.$store.state.contract.isInitialized === false">
      {{ this.$store.state.contract.error }}
    </div>

    <Payees />
  </div>
</template>

<script>
import Payees from "@/components/CreateWill/Payees.vue";

export default {
  name: "CreateWill",
  components: {
    Payees
  }
}
</script>