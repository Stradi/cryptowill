<template>
  <div v-if="isLoader">
    <div class="px-6 p-2 m-2 rounded-3xl bg-gray-700 bg-opacity-30">
      Loading
    </div>
  </div>
  <details v-else class="px-6 p-2 m-2 rounded-3xl bg-gray-700 bg-opacity-50 transition duration 300 ease-out hover:bg-opacity-75">
    <summary class="text-white font-medium">
      <div class="flex justify-between">
        <p class="select-none">{{ item.address }}</p>
        <a href="#" @click="this.openEditModal" class="text-yellow-500 transition duration-300 ease-out hover:text-yellow-400">Edit</a>
      </div>
    </summary>
    <div class="py-2">
      <div class="mb-2">
        <p class="text-white font-medium">Message:</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;{{ item.message === "" ? "No Message" : item.message }}</p>
      </div>
      <p class="text-white font-medium">Shares:</p>
      <div v-for="share, idx in item.shares" :key="idx" class="flex justify-between">
        <p>&nbsp;&nbsp;&nbsp;&nbsp;{{ item.shares[idx].address }}</p>
        <p>{{ item.shares[idx].percentage === undefined ? "No Shares" : item.shares[idx].percentage }}</p>
      </div>
    </div>
  </details>
  <Modal v-if="isEditModalOn" @close="closeEditModal">
    <template v-slot:header>
      Edit Payee
    </template>
    <template v-slot:body>
      <EditPayeeModal @close="closeEditModal" :item="item" />
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import EditPayeeModal from "@/components/CreateWill/EditPayeeModal.vue";

export default {
  name: "SinglePayeeItem",
  props: {
    isLoader: Boolean,
    item: Object
  },
  components: {
    Modal,
    EditPayeeModal
  },
  data: () => {
    return {
      isEditModalOn: false
    }
  },
  methods: {
    openEditModal() {
      this.isEditModalOn = true;
    },
    closeEditModal() {
      this.isEditModalOn = false;
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