/* eslint-disable */
<template>
  <div>
    <main-header></main-header>
    <div class="pt-[51px]">
      <router-view></router-view>
    </div>
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
