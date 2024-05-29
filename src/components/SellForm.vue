<template>
  <div>
    This is SellForm
    <div></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapActions(["connectWallet"]),
  },
  created() {},
};
</script>

<style></style>
