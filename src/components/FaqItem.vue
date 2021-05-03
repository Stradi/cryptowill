<template>
  <details class="mb-4 bg-gray-800 rounded-3xl p-4 bg-opacity-50 transition duration-100 ease-out hover:bg-opacity-80">
    <summary class="text-white select-none font-medium">{{question}}</summary>
    <slot class="px-4 py-2"></slot>
  </details>
</template>

<script>
export default {
  name: "FaqItem",
  props: ["question"]
}
</script>