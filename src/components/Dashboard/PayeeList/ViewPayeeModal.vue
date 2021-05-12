<template>
  <div class="">
    <p><span class="font-medium">Alias:</span> {{ item.alias || "Charmander" }}</p>
    <p><span class="font-medium">Address:</span> {{ item.address }}</p>
  </div>
  <div class="mb-2">
    <label for="message" class="font-medium block pb-2">Message:</label>
    <textarea v-model="message" id="message" name="message" rows="4" cols="60" :placeholder="placeholder" :class="isMessageChanged ? 'ring-2 ring-yellow-500' : ''" class="text-black p-2 rounded-2xl focus:outline-none resize-none"></textarea>
    <label for="shares" class="font-medium block py-2">Shares</label>
    <div v-for="share, idx in this.shares" :key="idx" class="flex flex-col pb-4">
      <p>{{ share.address }}</p>
      <div>
        <input v-model="this.shares[idx].percentage" v-on:input="percentageChanged(idx)" type="range" min="0" max="100" class="w-11/12 align-middle" />
        <span class="pl-2">{{ this.shares[idx].percentage }}</span>
      </div>
    </div>
    <div class="flex justify-evenly text-center">
      <a href="#" @click="save" :class="!this.isAnythingChanged ? 'hover:cursor-not-allowed hover:bg-yellow-800 bg-yellow-800' : ''" class="py-2 w-1/5 font-medium bg-yellow-700 rounded-3xl transition duration-300 ease-out hover:bg-yellow-600 hover:shadow-lg">Save</a>
      <a href="#" @click="this.$emit('close')" class="py-2 font-medium bg-red-700 rounded-3xl transition duration-300 ease-out hover:bg-red-600 w-1/5">Cancel</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditPayeeModal",
  props: ["item"],
  data: function() {
    return {
      message: this.item.message,
      placeholder: this.item.message === '' ? 'Enter your message' : 'Type to update the message',
      //Deep copy
      shares: JSON.parse(JSON.stringify(this.item.shares)),
      changedShares: []
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
      this.shares[idx].percentage = Math.max(0, Math.min(Number.parseInt(this.shares[idx].percentage), this.shares[idx].percentageLeft));
      this.changedShares[idx] = this.shares[idx].percentage !== Number.parseInt(this.$props.item.shares[idx].share);
    }
  },
  beforeMount() {
    for(let i = 0; i < this.shares.length; i++) {
      this.shares[i].percentageLeft = this.$store.state.contract.approvedCoins[i].percentageLeft;
      if(this.shares[i].percentage === undefined) {
        this.shares[i].percentage = 0;
        this.$props.item.shares[i].share = 0;
      }
    }
  }
}
</script>