<template>
  <div class="home">
    <span @click="connectWallet">Connect wallet</span>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "HomeView",
  components: {
  },
  methods: {
    ...mapActions(["connectWallet"]),
  },
  computed: {
    isConnected() {
      return this.$store.state.wallet.isConnected;
    },
  },
  created() {
    this.connectWallet();
  },
};
</script>
