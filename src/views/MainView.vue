<template>
  <div class="">
    <h1 class="text-3xl">This is an Main page</h1>
    <house-list />
    <house-info />
    <k-map />
  </div>
</template>

<script>
import HouseInfo from "@/components/HouseInfo.vue";
import HouseList from "@/components/HouseList.vue";
import KMap from "@/components/KMap.vue";
export default {
  components: {
    HouseList,
    KMap,
    HouseInfo,
  },
  methods: {},
};
</script>

<style></style>
