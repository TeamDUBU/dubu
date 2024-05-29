<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {},
  computed: {
    isConnected() {
      return this.$store.state.wallet.isConnected;
    },
  },
  mounted() {
    const Toast = this.$swal.mixin({
      toast: true,
      position: "top-start",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", this.$swal.stopTimer);
        toast.addEventListener("mouseleave", this.$swal.resumeTimer);
      },
    });
    if (window.klaytn === undefined) {
      Toast.fire({
        icon: "warning",
        title: "지갑이 연결되지 않았습니다.",
        text: "Chrome에서 카이카스 지갑 설치후 사용하실수 있습니다",
      });
    } else {
      if (!this.isConnected()) {
        Toast.fire({
          icon: "warning",
          title: "지갑이 연결되지 않았습니다.",
          text: "Chrome에서 카이카스 지갑 설치후 사용하실수 있습니다!!",
        });
      }
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
