<template>
  <div class="grid grid-cols-12 border-2 border-black h-dvh">
    <router-view class="col-span-6 h-full"></router-view>
    <!-- <house-list ></house-list> -->
    <k-map class="col-span-6 h-full"></k-map>
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
