<template>
  <div class="home">
    <span @click="connectWallet">Connect wallet</span>
    <connect-btn />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ConnectBtn from "@/components/ConnectBtn.vue";

export default {
  name: "HomeView",
  components: {
    ConnectBtn,
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
