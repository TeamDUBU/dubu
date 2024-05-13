<template>
  <div>
    <main-header></main-header>
    <div class="py-16">
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
