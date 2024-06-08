<template>
  <div>
    <main-header></main-header>
    <router-view></router-view>
  </div>
</template>

<script>
import MainHeader from "./MainHeader.vue";
export default {
  name: "MainLayout",
  components: {
    MainHeader,
  },
};
</script>

<style></style>
