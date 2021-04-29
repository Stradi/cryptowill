<template>
  <router-link :to="url" active-class="text-gray-200 font-medium">
    <li class="mx-1 px-4 transform transition ease-out duration-200 hover:-translate-y-0.5">
      {{ text }}
    </li>
  </router-link>
</template>

<script>
export default {
  name: "NavigationLink",
  props: ["text", "url"]
}
</script>