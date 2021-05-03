<template>
  <div class="bg-gray-800 py-16">
    <div class="bg-gray-900 max-w-2xl mx-auto p-8 rounded-3xl">
      <p class="pb-8 text-2xl text-center text-white">Frequently Asked Questions</p>
      <FaqItem v-for="(item, idx) in items" v-bind:key="idx" :question="item.question" :answer="item.answer" />
    </div>
  </div>
</template>

<script>
import FaqItem from "@/components/FaqItem.vue"

export default {
  name: "Faq",
  components: {
    FaqItem
  },
  data: () => {
    return {
      items: [
        { question: "What is CryptoWill", answer: "CryptoWill is a service that transfer your cryptocoins to specified person(s) after you died."},
        { question: "How it works?", answer: "CryptoWill lives in blockchain, means it'll live forever. So anyone can create a will anytime. When you create a will, you are actually giving permission to CryptoWill to transfer your funds after you died."},
        { question: "How CryptoWill knows that I am dead?", answer: "When 50% of your payees confirms that you are dead, after 60 days, they will be granted to withdraw the amount of cryptocoins person specified for them."},
        { question: "What happens if my payees falsely confirms that I am dead?", answer: "When 50% of your payees confirms the death, they should wait 60 days in order to withdraw the cryptocoins. In that 60 days, you can always cancel the withdraw operation. After 60 days, it'll be impossible to cancel withdraw operation."},
        { question: "Is CryptoWill free?", answer: "CryptoWill is not free. Because of the server and domain expenses. Will creation costs about 0.05BNB."},
        { question: "What is some features of CryptoWill?", answer: "You can set percentage for each coin for each payee. For example, you may want to send %X of CoinA to PersonA and %(100-X) of CoinA to PersonB. This process can be done for each cryptocoin and for each person. You can also set messages for each payee. The messages you've set can be only viewed 60 days after the confirmation." }
      ]
    }
  }
}
</script>