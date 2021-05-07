<template>
  <div class="p-5 rounded-3xl bg-gray-800">
    <div class="flex justify-between pb-2">
      <p class="text-2xl text-white">My Payees</p>
      <a href="#" class="px-4 py-1 text-gray-200 font-medium bg-yellow-700 rounded-3xl transition duration-300 ease-out transform hover:-translate-y-0.5 hover:bg-yellow-600">Add New Payee</a>
    </div>
    <PayeeTable :items="payeeList" />
  </div>
</template>

<script>
import PayeeTable from "@/components/CreateWill/PayeeTable.vue";
//TODO: Get list of Payee's once CreateWill component mounted.

export default {
  name: "AddPayee",
  components: {
    PayeeTable
  },
  data: () => {
    return {
      payeeList: [{
        coin: "BNB",
        percentage: "25",
        address: "0x0000000000000000000000000000000000000000"
      }, {
        coin: "BNB",
        percentage: "75",
        address: "0x0000000000000000000000000000000000000001"
      }, {
        coin: "DOGE",
        percentage: "69",
        address: "0x0000000000000000000000000000000000000000"
      }, {
        coin: "DOGE",
        percentage: "31",
        address: "0x0000000000000000000000000000000000000001"
      }]
    }
  }
}
</script>