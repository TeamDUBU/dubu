<template>
  <div>
    <manage-header></manage-header>
    <div class="py-16">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ManageHeader from "./ManageHeader.vue";
export default {
  name: "ManageLayout",
  components: {
    ManageHeader,
  },
};
</script>

<style></style>
