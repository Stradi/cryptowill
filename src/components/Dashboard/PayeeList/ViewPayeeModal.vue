<template>
  <div>
    <p><span class="font-medium">Alias:</span> {{ item.alias || "Charmander" }}</p>
    <p><span class="font-medium">Address:</span> {{ item.address }}</p>
  </div>
  <div class="mb-2">
    <label for="message" class="font-medium block pb-2">Message:</label>
    <textarea v-model="message" id="message" name="message" rows="4" cols="70" :placeholder="placeholder" :class="isMessageChanged ? 'ring-2 ring-yellow-500' : ''" class="text-black p-2 rounded-2xl focus:outline-none resize-none"></textarea>
    <div class="flex justify-between py-2">
      <p for="shares" class="font-medium">Shares</p>
      <a href="#" @click="isAddNewShareModalEnabled = true" class="font-medium text-yellow-500 transition ease-out duration-200 hover:text-yellow-400">Add new share</a>
    </div>
    <table class="table-fixed">
      <thead>
        <th class="w-2/12 text-center">Token</th>
        <th class="w-8/12 text-center"></th>
        <th class="w-2/12 text-center">Percentage</th>
      </thead>
      <tbody>
        <tr v-for="share, idx in this.shares" :key="share.address" class="text-center">
          <td class="py-2">{{ share.name }}</td>
          <td>
            <input v-model="share.share" v-on:input="percentageChanged(idx)" type="range" min="0" max="100" class="w-full align-middle" :class="changedShares[idx] ? 'ring-2 ring-yellow-400' : ''"/>
          </td>
          <td>
            <span class="text-center">{{ share.share }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-evenly text-center">
      <a href="#" @click="save" :class="!this.isAnythingChanged ? 'hover:cursor-not-allowed hover:bg-yellow-800 bg-yellow-800' : ''" class="py-2 w-1/5 font-medium bg-yellow-700 rounded-3xl transition duration-300 ease-out hover:bg-yellow-600 hover:shadow-lg">Save</a>
      <a href="#" @click="this.$emit('close')" class="py-2 font-medium bg-red-700 rounded-3xl transition duration-300 ease-out hover:bg-red-600 w-1/5">Cancel</a>
    </div>
  </div>
  <Modal v-if="isAddNewShareModalEnabled" @close="isAddNewShareModalEnabled = false">
    <template v-slot:header>
      Add new share
    </template>
    <template v-slot:body>
      <AddNewShareModal />
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Common/Modal.vue";
import AddNewShareModal from "@/components/Dashboard/PayeeList/AddNewShareModal.vue";
import { TOKENS } from "@/utils/token.js";

export default {
  name: "EditPayeeModal",
  props: ["item"],
  emits: ["close"],
  components: {
    Modal,
    AddNewShareModal
  },
  data: function() {
    return {
      message: this.item.message,
      placeholder: this.item.message === '' ? 'Enter your message' : 'Type to update the message',
      //Deep copy
      shares: JSON.parse(JSON.stringify(this.item.shares)),
      changedShares: [],
      isAddNewShareModalEnabled: false
    }
  },
  computed: {
    isMessageChanged() {
      return this.message !== this.item.message;
    },
    isAnythingChanged() {
      return this.isMessageChanged || this.changedShares.filter(Boolean).length > 0;
    }
  },
  methods: {
    percentageChanged(idx) {
      let initialShare = Number.parseInt(this.item.shares[idx].share);
      this.shares[idx].share = this.clamp(this.shares[idx].share, 0, initialShare + this.shares[idx].percentageLeft);
      this.changedShares[idx] = this.shares[idx].share !== initialShare;
    },
    clamp(val, min, max) {
      return Math.min(Math.max(val, min), max);
    },
    async save() {
      let newShares = this.shares.filter((item, idx) => {
        return this.changedShares[idx];
      });

      for(let i = 0; i < newShares.length; i++) {
        //Call updateShare function
      }

      if(this.isMessageChanged) {
        await this.$store.dispatch("contract/setPayeeMessage", { address: this.item.address, message: this.message });
        console.log("Saved, i think?")
      }
    }
  },
  beforeMount() {
    for(let i = 0; i < this.shares.length; i++) {
      this.shares[i].percentageLeft = this.$store.state.contract.approvedCoins[i].percentageLeft;
      
      if(TOKENS["TESTNET"][this.shares[i].address] === undefined) {
        this.shares[i].name = this.shares[i].address;
      } else {
        this.shares[i].name = TOKENS["TESTNET"][this.shares[i].address];
      }

      if(this.shares[i].share === undefined) {
        this.shares[i].share = 0;
        this.$props.item.shares[i].share = 0;
      } else {
        this.shares[i].share = Number.parseInt(this.shares[i].share);
      }
    }
  }
}
</script>

<style>
  input[type=range] {
    -webkit-appearance: none;
    overflow: hidden;
    width: 100%;
    background: transparent;
  }

  input[type=range]::-webkit-slider-thumb {
    @apply w-4;
    @apply h-4;
    margin-top: 0px;
    @apply appearance-none;
    @apply bg-gray-800;
    box-shadow: -300px 0 0 300px #A3A3A3;
  }

  input[type=range]::-webkit-slider-runnable-track {
    @apply w-full;
    @apply h-4;
    @apply bg-gray-500;
  }
</style>