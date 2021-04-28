<template>
  <router-link :to="url" active-class="text-yellow-600">
    <li class="mx-1 px-4 font-normal transform transition ease-out duration-200 hover:-translate-y-0.5">
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