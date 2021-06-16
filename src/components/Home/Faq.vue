<template>
  <div class="bg-gray-800 py-16">
    <div class="bg-gray-900 max-w-2xl mx-auto p-8 rounded-3xl">
      <p class="pb-8 text-2xl text-center text-white font-medium">Frequently Asked Questions</p>
      <FaqItem v-for="(item, idx) in items" v-bind:key="idx" :question="item.question">
        <span v-html="item.answer"></span>
      </FaqItem>
    </div>
  </div>
</template>

<script>
import FaqItem from "@/components/Home/FaqItem.vue"

export default {
  name: "Faq",
  components: {
    FaqItem
  },
  data: () => {
    return {
      items: [
        { 
          question: "What is CryptoWill",
          answer: "&nbsp;&nbsp;&nbsp;&nbsp;CryptoWill is a service that <span class='text-yellow-500'>transfer your cryptocoins</span> to specified person(s) after you died."
        },
        {
          question: "How it works?",
          answer: "&nbsp;&nbsp;&nbsp;&nbsp;CryptoWill lives in blockchain, means it'll live forever. So anyone can <span class='text-yellow-500'>create a will</span> anytime. When you create a will, you are actually giving permission to CryptoWill to transfer your funds after you died."
        },
        {
          question: "How CryptoWill knows that I am dead?",
          answer: "&nbsp;&nbsp;&nbsp;&nbsp;When <span class='text-yellow-500'>50%</span> of your payees confirms that you are dead, <span class='text-yellow-500'>after 60 days</span>, they will be granted to withdraw the amount of cryptocoins person specified for them."
        },
        {
          question: "What happens if my payees falsely confirms that I am dead?",
          answer: "&nbsp;&nbsp;&nbsp;&nbsp;When 50% of your payees confirms the death, they will wait <span class='text-yellow-500'>60 days</span> in order to withdraw the cryptocoins. In that 60 days, you can always <span class='text-yellow-500'>cancel the withdraw operation.</span> After 60 days, it'll be <span class='text-yellow-500'>impossible to cancel</span> withdraw operation."
        },
        {
          question: "Is CryptoWill free?",
          answer: "&nbsp;&nbsp;&nbsp;&nbsp;CryptoWill is <span class='text-yellow-500'>not free.</span> Because of the <span class='text-yellow-500'>server and domain expenses.</span> Will creation costs about <span class='text-yellow-500'>0.035BNB.</span>"
        },
        {
          question: "What is some features of CryptoWill?",
          answer: "&nbsp;&nbsp;&nbsp;&nbsp;You can set percentage <span class='text-yellow-500'>for each coin for each payee</span>. For example, you may want to send %X of CoinA to PersonA and %(100-X) of CoinA to PersonB. This process can be done for <span class='text-yellow-500'>each cryptocoin</span> and for <span class='text-yellow-500'>each person</span>.<br>&nbsp;&nbsp;&nbsp;&nbsp;You can also set <span class='text-yellow-500'>messages for each payee</span>. The messages you've set can be <span class='text-yellow-500'>only viewed 60 days after the confirmation.</span>"
        }
      ]
    }
  }
}
</script>