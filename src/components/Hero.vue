<template>
  <div class="py-16 text-center">
    <h2 class="mb-12 text-4xl md:text-6xl text-gray-200 font-bold">
      Don't lose your <span class="text-yellow-500">Crypto's</span> after you
      gone.
    </h2>
    <router-link
      :to="ctaUrl"
      class="inline-block px-5 py-2 rounded-3xl bg-yellow-700 text-gray-200 font-medium transition duration-300 ease-out transform hover:-translate-y-1 hover:bg-yellow-600"
    >
      Create your CryptoWill
    </router-link>
  </div>
</template>

<script>
export default {
    name: "Hero",
    props: ["ctaUrl"]
}
</script>