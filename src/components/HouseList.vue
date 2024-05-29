<template>
  <div>
    <div class="text-3xl py-2">House List</div>
    <div class="grid grid-cols-12 gap-4">
      <div
        v-for="item in items"
        :key="item.tokenId"
        class="col-span-6 flex flex-col items-center p-4 bg-white rounded-lg shadow-md"
      >
        <img
          :src="item.url[0]"
          alt="House Image"
          class="w-full h-48 object-cover rounded-t-lg"
        />
        <div class="p-2 text-center">
          <div class="text-lg font-semibold">주소: {{ item.addrToji }}</div>
          <div class="text-md text-gray-600">호수: {{ item.hosu }}</div>
          <button
            @click="goNFTInfo(item)"
            class="mt-2 bg-ivory-500 rounded-md shadow-md py-1 px-3"
          >
            상세 보기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "HouseList",
  data() {
    return {};
  },
  computed: {
    ...mapState("dbInfo", ["items"]),
  },
  created() {
    this.fetchItems();
  },
  methods: {
    ...mapActions("dbInfo", ["fetchItems"]),
    goNFTInfo(item) {
      this.$router.push({
        name: "House-Detail",
        params: {
          TokenId: item.tokenId,
          Hosu: item.hosu,
        },
      });
    },
  },
};
</script>

<style></style>
