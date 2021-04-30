<template>
<div class="max-w-6xl mx-auto">
  <Hero />
  <ImageTextCard image="assets/grim-reaper.svg" title="What is CryptoWill?">
    &nbsp;&nbsp;&nbsp;&nbsp;CryptoWill will <span class="text-yellow-500">transfer your cryptocoins</span> to the people you've selected, <span class="text-yellow-500">after you die.</span>
    So your funds will not disappear forever in blockchain.<br><br>
    &nbsp;&nbsp;&nbsp;&nbsp;You can also set <span class="text-yellow-500">percentage</span> for each person and <span class="text-yellow-500">leave a note</span> to them.
    Your message will only be visible to person(s) you've chosen and only will be viewable after you <span class="text-yellow-500">(I am sorry)</span> died.
  </ImageTextCard>
</div>
</template>

<script>
import Hero from "@/components/Hero.vue";
import ImageTextCard from "@/components/ImageTextCard.vue";

export default {
  name: "Home",
  components: {
    Hero,
    ImageTextCard
  }
}
</script>

<style>

</style>