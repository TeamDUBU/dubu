<template>
  <div class="grid grid-cols-12 h-screen">
    <router-view class="col-span-5 h-full"></router-view>
    <k-map class="col-span-7 h-full"></k-map>
  </div>
</template>

<script>
import KMap from "@/components/KMap.vue";
export default {
  components: {
    KMap,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
