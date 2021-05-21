<template>
  <div class="p-5 rounded-3xl bg-gray-800">
    <div class="flex justify-between">
      <p class="text-2xl text-white">My Payees</p>
      <a href="#" @click="isAddNewPayeeModalOn = true" :class="!this.$store.state.contract.payees ? 'hover:cursor-not-allowed hover:bg-yellow-800 bg-yellow-800' : 'transition duration-300 ease-out transform hover:-translate-y-0.5 hover:bg-yellow-600'" class="px-4 py-1 text-gray-200 font-medium bg-yellow-700 rounded-3xl">Add New Payee</a>
    </div>
    <div class="text-left pt-2">
      <div v-if="payeeList === undefined">
        <SinglePayeeItem isLoader />
        <SinglePayeeItem isLoader />
      </div>
      <SinglePayeeItem v-for="item, idx in payeeList" :key=idx :item=item />
    </div>
  </div>
  <Modal v-if="isAddNewPayeeModalOn" @close="isAddNewPayeeModalOn = false">
    <template v-slot:header>
      Add new payee
    </template>
    <template v-slot:body>
      <AddNewPayeeModal @close="isAddNewPayeeModalOn = false" />
    </template>
  </Modal>
</template>

<script>
import SinglePayeeItem from '@/components/Dashboard/PayeeList/SinglePayeeItem.vue';
import Modal from "@/components/Common/Modal.vue";
import AddNewPayeeModal from '@/components/Dashboard/PayeeList/AddNewPayeeModal.vue';

export default {
  components: { 
    SinglePayeeItem,
    Modal,
    AddNewPayeeModal
  },
  name: "PayeeList",
  data: function() {
    return {
      isAddNewPayeeModalOn: false
    }
  },
  computed: {
    payeeList: function() {
      return this.$store.state.contract.payees;
    }
  }
}
</script>