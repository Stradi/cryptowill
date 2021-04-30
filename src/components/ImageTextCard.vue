<template>
  <div class="flex flex-col md:flex-row max-w-3xl mx-auto bg-gray-800 rounded-3xl bg-opacity-50 transition duration-300 ease-out transform hover:scale-105">
    <div class="py-4 w-48 mx-auto md:w-auto">
      <img :src="image" />
    </div>
    <div>
      <p class="px-8 text-gray-200 text-2xl py-4">{{ title }}</p>
      <p class="px-8 pb-4"><slot></slot></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageTextCard",
  props: ["image", "title"]
};
</script>