<template>
  <div>
    <button @click="buttonClicked">item no.1</button>
  </div>
</template>

<script>
export default {
  methods: {
    buttonClicked() {
      this.$emit("button-click");
    },
  },
};
</script>

<style></style>
