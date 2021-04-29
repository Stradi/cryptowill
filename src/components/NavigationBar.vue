<template>
  <nav class="shadow-md">
    <p class="py-4 font-bold text-2xl text-center text-yellow-600">Crypto Will</p>
    <ul class="flex justify-center pb-4">
      <NavigationLink
        v-for="nav in navItems"
        :key="nav.id"
        :text="nav.text"
        :url="nav.url"
      />
    </ul>
  </nav>
</template>

<script>
import NavigationLink from "./NavigationLink";

export default {
  name: "NavigationBar",
  components: {
    NavigationLink
  },
  data: () => {
    return {
      navItems: [
        { id: 0, text: "Home", url: "/" },
        { id: 1, text: "My Will", url: "/my-will" },
        { id: 2, text: "FAQ", url: "/faq" },
        { id: 3, text: "How to Use", url: "/how-to-use" }
      ]
    }
  }
}
</script>