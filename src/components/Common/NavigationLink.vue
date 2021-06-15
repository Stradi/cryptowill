<template>
  <router-link :to="url" active-class="text-gray-200 font-medium">
    <li class="mx-1 px-4 transform transition ease-out duration-200 hover:-translate-y-0.5">
      <img :src="icon" width="25" class="inline px-1 pb-1 transition ease-out duration-200" id="icon"><span>{{ text }}</span>
    </li>
  </router-link>
</template>

<script>
export default {
  name: "NavigationLink",
  props: ["text", "url", "icon"],
  mounted() {
    console.log(this.$props.icon);
  }
}
</script>

<style>
  .router-link-exact-active #icon {
    filter: invert(1) hue-rotate(270deg) brightness(1000%);
  }
</style>