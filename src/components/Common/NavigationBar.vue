<template>
  <nav class="border-b-2 border-gray-800">
    <p class="py-4 font-bold text-2xl text-center text-gray-200">CryptoWill</p>
    <ul class="flex justify-center pb-4">
      <NavigationLink
        v-for="nav in navItems"
        :key="nav.id"
        :text="nav.text"
        :url="nav.url"
        :icon="nav.icon"
      />
    </ul>
  </nav>
</template>

<script>
import NavigationLink from "@/components/Common/NavigationLink";

export default {
  name: "NavigationBar",
  components: {
    NavigationLink
  },
  data: () => {
    return {
      navItems: [
        { id: 0, text: "Home", url: "/", icon: "/assets/icons/home.svg" },
        { id: 1, text: "Dashboard", url: "/dashboard", icon: "/assets/icons/dashboard.svg" },
        { id: 2, text: "Help", url: "/help", icon: "/assets/icons/information.svg" }
      ]
    }
  }
}
</script>