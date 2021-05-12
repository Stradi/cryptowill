<template>
    <div class="fixed inset-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60">
      <div class="max-w-xs sm:max-w-3xl rounded-3xl overflow-hidden shadow-2xl fixed translate-y-1/2">
        <header class="flex justify-between p-4 text-yellow-500 font-bold bg-gray-800 select-none">
          <slot name="header">
            Header
          </slot>
          <a href="#" @click="this.$emit('close')">&times;</a>
        </header>
        <section class="px-4 py-2 bg-gray-700 text-white">
          <slot name="body">
            Body
          </slot>
        </section>
      </div>
    </div>
</template>

<script>
export default {
  name: "Modal"
}
</script>