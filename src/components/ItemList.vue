<template>
  <div>
    <div class="text-3xl py-2">Item List</div>
    <div class="grid grid-cols-1 gap-4">
      <div
        v-for="item in manageItems"
        :key="(item.tokenId, item.hosu)"
        class="col-span-1 flex flex-col p-4 bg-white"
        style="max-width: 600px; margin: auto"
      >
        <div class="grid grid-cols-12 w-full items-center">
          <div class="col-span-8 text-md text-gray-600 font-semibold">
            {{ ndex }} Token ID: {{ item.tokenId }} Status:
            {{ item.status }}
          </div>
          <div class="col-span-4 flex justify-end">
            <button
              @click="goManageNFTInfo(item)"
              class="text-gray hover:bg-gray-700 hover:text-white rounded-md py-1 px-3"
            >
              상세 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ItemList",
  data() {
    return {};
  },
  computed: {
    ...mapState("dbInfo", ["manageItems"]),
  },
  created() {
    this.fetchManageItems({
      Address: window.klaytn.selectedAddress,
    });
    this.InitMetadata({
      Address: window.klaytn.selectedAddress,
    });
    this.fetchManageLists();
    this.fetchItems();
  },
  methods: {
    ...mapActions("dbInfo", [
      "InitMetadata",
      "fetchManageLists",
      "fetchManageItems",
      "fetchItems",
    ]),
    goManageNFTInfo(item) {
      this.$router.push({
        name: "Item-Detail",
        params: {
          TokenId: item.tokenId,
          Status: item.status,
        },
      });
    },
  },
};
</script>

<style></style>
