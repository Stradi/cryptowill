<template>
  <div class="max-w-max mx-auto">
    <input ref="searchBox" v-model="term" @focus="isFocused=true" @input="typed" type="text" :placeholder="placeholder" :class="isSelected ? 'ring-2 ring-yellow-500' : ''" class="text-black p-2 rounded-xl outline-none">
    <div v-if="isFocused" class="p-2 bg-white text-black mt-2 rounded-xl absolute">
      <ul v-if="filteredItems.length !== 0" class="w-44">
        <li v-for="item in filteredItems.slice(0,3)" :key="item" @click="selected(item)" class="cursor-pointer px-2 py-1 select-none rounded-xl transition duration-200 ease-out hover:bg-yellow-200">
          {{ item }}
        </li>
      </ul>
      <ul v-else>
        <li class="px-2 py-1 select-none w-44">Token not found</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchDropdown",
  props: ["placeholder", "items"],
  emits: ["selected"],
  data: function() {
    return {
      term: "",
      isSelected: false,
      isFocused: false
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) => {
        return item.toLowerCase().includes(this.term.toLowerCase())
      });
    }
  },
  methods: {
    selected(item) {
      this.$emit('selected', item);
      this.isSelected = true;
      this.isFocused = false;
      this.term = item;
    },
    typed() {
      this.$emit('selected', undefined);
      this.isSelected = false;
    }
  }
}
</script>