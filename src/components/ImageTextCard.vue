<template>
  <div
    class="flex flex-col md:flex-row max-w-3xl mx-auto p-8 rounded-3xl"
    v-bind:class="[
      animated !== undefined ? 'transition duration-300 ease-out transform hover:scale-105' : '',
      bgColor === 'dark' ? 'bg-gray-900' : bgColor === 'light' ? 'bg-gray-800' : ''
    ]"
  >
    <div class="w-64 md:w-auto mx-auto pr-8">
      <img :src="image" />
    </div>
    <div class="">
      <p
        class="text-gray-200 text-2xl pb-3"
        v-bind:class="[
          titleCentered !== undefined ? 'text-center' : ''
        ]"
      >
        {{ title }}
      </p>
      <p><slot></slot></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageTextCard",
  props: ["image", "title", "titleCentered", "animated", "bgColor"]
};
</script>