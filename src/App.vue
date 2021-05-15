<template>
  <div class="bg-gray-900 text-gray-400">
    <Web3NetworkInfo />
    <NavigationBar />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import NavigationBar from "@/components/Common/NavigationBar.vue";
import Footer from "@/components/Common/Footer.vue";
import Web3NetworkInfo from "@/components/Common/Web3NetworkInfo.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
    Footer,
    Web3NetworkInfo
  }
}
</script>