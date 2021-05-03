<template>
  <details class="mb-4 bg-gray-800 rounded-3xl p-4 bg-opacity-50 transition duration-100 ease-out hover:bg-opacity-80">
    <summary class="text-white select-none">{{question}}</summary>
    <div class="px-4 py-2">{{answer}}</div>
  </details>
</template>

<script>
export default {
  name: "FaqItem",
  props: ["question", "answer"]
}
</script>