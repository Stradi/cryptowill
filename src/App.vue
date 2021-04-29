<template>
  <div class="bg-gray-900 text-gray-400">
    <NavigationBar />
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default{
  name: "App",
  components: {
    NavigationBar
  }
}
</script>
