<template>
  <div class="my-8">
    <p class="text-center text-2xl font-medium text-white pb-4">{{ header }}</p>
    <div class="grid md:grid-cols-2 grid-cols-1">
      <img :src="steps[selectedIdx].image.src" :alt="steps[selectedIdx].image.alt" class="mx-auto object-scale-down h-96">
      <ul class="w-2/3 m-auto">
        <li v-for="step, idx in steps" :key="idx" @click="selectedIdx = idx" :class="selectedIdx == idx ? 'bg-gray-700 bg-opacity-75' : 'bg-gray-800 hover:bg-opacity-75'" class="p-4 rounded-3xl my-2 hover:cursor-pointer">
          <p class="text-white font-medium">{{ step.caption }} | {{ typeof(idx) }}</p>
          <p v-if="selectedIdx === idx" class="break-words">{{ step.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageGalleryWithSteps",
  props: ["steps", "header"],
  data: () => {
    return {
      selectedIdx: 0
    }
  }
}
</script>