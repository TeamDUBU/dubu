<template>
  <div>
    <div class="text-3xl py-2">Sell List</div>
    <div class="grid grid-cols-12 gap-4">
      <div
        v-for="item in item_list"
        :key="item.tokenId"
        class="col-span-6 flex flex-col items-center p-4 bg-white rounded-lg shadow-md"
      >
        <img
          :src="item.url"
          alt="House Image"
          class="w-full h-48 object-cover rounded-t-lg"
        />
        <div class="p-2 text-center">
          <div class="text-lg font-semibold">주소: {{ item.note }}</div>
          <div class="text-md text-gray-600 font-semibold">
            Token ID: {{ item.tokenId }}
          </div>
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
import { mapActions, mapState } from "vuex";

export default {
  name: "SellList",
  data() {
    return {};
  },
  computed: {
    ...mapState("dbInfo", ["item_list"]),
  },
  created() {
    this.InitMetadata({
      Address: window.klaytn.selectedAddress,
    });
  },
  methods: {
    ...mapActions("dbInfo", ["InitMetadata"]),
    goNFTInfo(item) {
      this.$router.push({
        name: "Sell-Detail",
        params: {
          TokenId: item.tokenId,
        },
      });
    },
  },
};
</script>

<style></style>
