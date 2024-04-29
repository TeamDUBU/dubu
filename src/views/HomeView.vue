<template>
  <div class="home">
    <span @click="connectWallet">Connect wallet</span>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapActions } from "vuex";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  methods: {
    ...mapActions(["connectWallet"]),
  },
  computed: {
    isConnected() {
      return this.$store.state.wallet.isConnected;
    },
  },
  created(){
    this.connectWallet();
  }
};
</script>
