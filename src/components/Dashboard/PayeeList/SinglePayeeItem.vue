<template>
  <div v-if="isLoader">
    <div class="px-6 p-2 m-2 rounded-3xl bg-gray-700 bg-opacity-30">
      Loading
    </div>
  </div>
  <div v-else class="m-2 py-2 px-4 flex justify-between rounded-3xl bg-gray-900 bg-opacity-40 transition duration-100 ease-out hover:bg-opacity-75">
    <p class="select-none pr-8">{{ item.alias }}</p>
    <a href="#" @click="this.openViewModal" class="text-yellow-500 transition duration-300 ease-out hover:text-yellow-400">View more</a>
  </div>
  <Modal v-if="isViewModalOn" @close="this.closeViewModal">
    <template v-slot:header>
      Detailed view of Payee
    </template>
    <template v-slot:body>
      <ViewPayeeModal @close="this.closeViewModal" :item="item" />
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Common/Modal.vue";
import ViewPayeeModal from "@/components/Dashboard/PayeeList/ViewPayeeModal.vue";

export default {
  name: "SinglePayeeItem",
  props: {
    isLoader: Boolean,
    item: Object
  },
  components: {
    Modal,
    ViewPayeeModal
  },
  data: () => {
    return {
      isViewModalOn: false
    }
  },
  methods: {
    openViewModal() {
      this.isViewModalOn = true;
    },
    closeViewModal() {
      this.isViewModalOn = false;
    }
  }
}
</script>

<style>
  details > summary {
    list-style: none;
  }
  details > summary::-webkit-details-marker {
    display: none;
  }
</style>