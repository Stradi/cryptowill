<template>
  <div v-if="loading" class="bg-gray-900 bg-opacity-95 absolute w-full h-full">
    <p class="relative top-1/3 text-center">Waiting for {{ this.transactionStatus }} / {{ this.pendingTransactionCount }} transactions.</p>
  </div>
  <div class="px-4 py-2">
    <div>
      <p class="truncate"><span class="font-medium">Alias:</span> {{ item.alias || "Charmander" }}</p>
      <p class="truncate"><span class="font-medium">Address:</span>{{ item.address }}</p>
    </div>
    <div class="mb-2">
      <label for="message" class="font-medium block pb-2">Message:</label>
      <textarea v-model="message" id="message" name="message" rows="4" cols="70" :placeholder="placeholder" :class="isMessageChanged ? 'ring-2 ring-yellow-500' : ''" class="text-black p-2 rounded-2xl focus:outline-none resize-none w-full"></textarea>
      <div class="flex justify-between py-2">
        <p for="shares" class="font-medium">Shares</p>
        <a href="#" @click="isAddNewShareModalEnabled = true" class="font-medium text-yellow-500 transition ease-out duration-200 hover:text-yellow-400">Add new share</a>
      </div>
      <div v-if="this.shares.length > 0">
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
      <div v-else class="text-center">
        No shares set for this Payee. Add a share now.
      </div>
    </div>
    <Modal v-if="isAddNewShareModalEnabled" @close="isAddNewShareModalEnabled = false">
      <template v-slot:header>
        Add new share
      </template>
      <template v-slot:body>
        <AddNewShareModal @close="isAddNewShareModalEnabled = false" :payee="this.item" />
      </template>
    </Modal>
  </div>
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
      loading: false,
      message: this.item.message,
      placeholder: this.item.message === '' ? 'Enter your message' : 'Type to update the message',
      //Deep copy
      shares: JSON.parse(JSON.stringify(this.item.shares)),
      changedShares: [],
      isAddNewShareModalEnabled: false,
      pendingTransactionCount: 0,
      transactionStatus: 0
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
  watch: {
    item: function(newValue) {
      this.shares = JSON.parse(JSON.stringify(newValue.shares));
      this.updateTokens();
    
      this.shares.forEach((item, idx) => {
        this.percentageChanged(idx);
      });
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
      if(!this.isAnythingChanged) {
        return;
      }

      let needRefresh = false;
      let newShares = this.shares.filter((item, idx) => {
        return this.changedShares[idx];
      });

      //TODO: Create progress bar like component for displaying
      //current state of transaction.

      this.pendingTransactionCount = 0;
      this.pendingTransactionCount += this.isMessageChanged ? 1 : 0;
      this.pendingTransactionCount += newShares.length;

      this.transactionStatus = 0;

      for(let i = 0; i < newShares.length; i++) {
        // Show loading screen
        this.loading = true;
        needRefresh = true;
        
        await this.$store.dispatch("contract/setPayeeShare", {
          payeeAddress: this.item.address,
          coinAddress: newShares[i].address,
          share: newShares[i].share
        });

        this.transactionStatus++;
      }

      if(this.isMessageChanged) {
        // Show loading screen
        this.loading = true;
        needRefresh = true;
        
        await this.$store.dispatch("contract/setPayeeMessage", {
          address: this.item.address,
          message: this.message
        });
        
        this.transactionStatus++;
      }

      if(needRefresh) {
        await this.$store.dispatch("contract/getApprovedCoins");
        await this.$store.dispatch("contract/getPayees");
      }

      this.loading = false;
    },
    updateTokens() {
      for(let i = 0; i < this.shares.length; i++) {
        this.$store.state.contract.approvedCoins.filter((item) => {
          if(item.address == this.shares[i].address) {
            this.shares[i].percentageLeft = item.percentageLeft;
          }
        });
        
        Object.keys(TOKENS["TESTNET"]).find((key) => {
          if(key.toLowerCase() === this.shares[i].address.toLowerCase()) {
            this.shares[i].name = TOKENS["TESTNET"][key];
          }
        });
  
        if(this.shares[i].share === undefined) {
          this.shares[i].share = 0;
          this.$props.item.shares[i].share = 0;
        } else {
          this.shares[i].share = Number.parseInt(this.shares[i].share);
        }
      }
    }
  },
  beforeMount() {
    this.updateTokens();
  }
}
</script>