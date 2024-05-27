<template>
  <div class="flex">
    <!-- Conditionally render HouseList or HouseInfo -->
    <house-list
      v-if="!showHouseInfo"
      class="w-[35%] h-screen flex items-center justify-center border-2 border-black"
      @button-click="toggleView"
    />
    <house-info
      v-else
      class="w-[35%] h-screen flex items-center justify-center border-2 border-black"
    />
    <k-map class="w-[65%] h-screen border-2 border-black" />
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
  data() {
    return {
      showHouseInfo: false, // State to toggle between HouseList and HouseInfo
    };
  },
  methods: {
    toggleView() {
      this.showHouseInfo = !this.showHouseInfo;
    },
  },
};
</script>

<style></style>
