<template>
  <div class="grid grid-cols-12">
    <router-view class="col-span-6 h-full"></router-view>
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
