<template>
  <div class="flex h-screen">
    <house-list
      v-if="!showHouseInfo"
      class="w-1/3 h-full flex items-center justify-center border-2 border-black overflow-y-auto"
      @button-click="toggleView"
    />
    <house-info
      v-else
      :item="selectedItem"
      class="w-1/3 h-full flex items-center justify-center border-2 border-black overflow-y-auto"
      @close-house-info="toggleView"
    />
    <k-map class="w-2/3 h-full border-2 border-black" />
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
      showHouseInfo: false,
      selectedItem: null,
    };
  },
  methods: {
    toggleView(item) {
      this.showHouseInfo = !this.showHouseInfo;
      this.selectedItem = item || null;
    },
  },
};
</script>

<style></style>
