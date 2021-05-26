<template>
  <div class="max-w-5xl mx-auto">
    <ImageGalleryWithSteps :steps="steps" header="Features" />
  </div>
</template>

<script>
import ImageGalleryWithSteps from "@/components/Common/ImageGalleryWithSteps.vue";

export default {
  name: "Help",
  components: {
    ImageGalleryWithSteps
  },
  data: () => {
    return {
      steps: [{
        image: { src: require("@/assets/my-payees.png"), alt: "My payees" },
        caption: "See your payees"
      }, {
        image: { src: require("@/assets/view-payee.png"), alt: "View payee" },
        caption: "Detailed view of Payee's",
      }]
    }
  }
}
</script>