<template>
  <div class="">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {},
  data() {
    return {};
  },
  created() {
    // this.$on("start", this.startSpinner());
    // this.$on("end", this.stopSpinner());
  },
  beforeDestroy() {
    // this.$off("start-spinner", this.startSpinner);
    // this.$off("end-spinner", this.stopSpinner);
  },
};
</script>

<style></style>
