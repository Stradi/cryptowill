<template>
<div>
  <Hero class="max-w-6xl mx-auto" :ctaUrl="ctaUrl"/>
  <div class="py-8 md:py-16 bg-gray-800">
    <ImageTextCard image="/assets/grim-reaper.svg" title="What is CryptoWill?" animated bgColor="dark">
      &nbsp;&nbsp;&nbsp;&nbsp;CryptoWill will <span class="text-yellow-500">transfer your cryptocoins</span> to the people you've selected, <span class="text-yellow-500">after you die.</span>
      So your funds will not disappear forever in blockchain.<br>
      &nbsp;&nbsp;&nbsp;&nbsp;You can also set <span class="text-yellow-500">percentage</span> for each person and <span class="text-yellow-500">leave a note</span> to them.
      Your message will only be visible to person(s) you've chosen and only will be viewable after you <span class="text-yellow-500">(I am sorry)</span> died.
    </ImageTextCard>
  </div>
  <br>
  <ImageTextCard title="Why?" titleCentered class="py-12">
    &nbsp;&nbsp;&nbsp;&nbsp;Blockchain (probably) going to live <span class="text-yellow-500">forever</span>, all the cryptocoin balances too. So, what happens when you die? Your cryptocoins will stay in blockchain forever.<br>
    &nbsp;&nbsp;&nbsp;&nbsp;To overcome this problem, <span class="text-yellow-500">CryptoWill</span> is created. CryptoWill will transfer your coins to your relative or friend after you die. So you will not lose your cryptocoins forever.
  </ImageTextCard>
  <br>
  <Faq />
  <br>
  <div class="max-w-3xl mx-auto text-center py-16">
    <p class="text-white text-3xl">Ready to create your CryptoWill?</p>
    <router-link
        :to="ctaUrl"
        class="inline-block px-5 my-6 py-2 rounded-3xl bg-yellow-700 text-gray-200 font-medium transition duration-300 ease-out transform hover:-translate-y-1 hover:bg-yellow-600"
      >
        Create Now
    </router-link>
  </div>
  <Footer />
</div>
</template>

<script>
import Hero from "@/components/Hero.vue";
import ImageTextCard from "@/components/ImageTextCard.vue";
import Footer from "@/components/Footer.vue";
import Faq from "@/components/Faq.vue";

export default {
  name: "Home",
  components: {
    Hero,
    ImageTextCard,
    Footer,
    Faq
  },
  data: () => {
    return {
      ctaUrl: "/my-will"
    }
  }
}
</script>