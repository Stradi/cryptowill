<template>
  <a @click="connect" href="#" class="font-medium text-yellow-500 transition duration-300 ease-out hover:text-yellow-600">{{ text }}</a>
</template>

<script>
export default {
  name: "ConnectWeb3Button",
  props: ["text"],
  methods: {
    connect() {
      this.$store.dispatch("web3/connect");
    }
  }
}
</script>