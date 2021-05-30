<template>
  <div v-if="isLoader">
    <div class="px-6 p-2 m-2 rounded-3xl bg-gray-700 bg-opacity-30">
      Loading
    </div>
  </div>
  <div v-else class="m-2 py-2 px-4 rounded-3xl bg-gray-900 bg-opacity-40 hover:bg-opacity-75">
    <p class="select-none pr-8">{{ item.address }}</p>
  </div>
</template>

<script>
export default {
  name: "SinglePayerItem",
  props: {
    isLoader: Boolean,
    item: Object
  }
}
</script>

<style>

</style>