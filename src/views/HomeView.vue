<template>
  <div class="">this is HomeView</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isMenuOpen: false,
      isLaunchpadOpen: false,
      showMenu: false,
      items: [
        {
          name: "이동",
          link: "/main",
        },
      ],
    };
  },
  name: "HomeView",
  components: {},
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
