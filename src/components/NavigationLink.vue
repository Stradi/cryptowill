<template>
  <li
    class="mx-1 px-4 font-normal text-black transform transition ease-out duration-200 hover:scale-110 hover:-translate-y-0.5"
    v-bind:class="{ 'font-bold text-yellow-600': isActive }">
  <router-link :to="url">{{ text }}</router-link>
  </li>
</template>

<script>
export default {
  name: "NavigationLink",
  props: ["text", "url", "isActive"]
}
</script>