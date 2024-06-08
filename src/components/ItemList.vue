<template>
  <div>
    <spinner-com :loading="this.loadingStatus"></spinner-com>
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
            Token ID: {{ item.tokenId }} Status:
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

    <main
      v-if="!this.loadingStatus && this.manageItems < 1"
      class="grid min-h-full place-items-center bg-gray-100 py-24 px-6 sm:py-32 lg:px-8"
    >
      <div class="text-center">
        <p class="text-5xl font-semibold text-green-600">이런 !!</p>
        <h1
          class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
        >
          No Item!!
        </h1>
        <p class="mt-6 text-base leading-7 text-gray-600">
          현재 진행된 계약이 없습니다.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/main"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Home 바로가기</a
          >
          <!-- <a href="#" class="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></a> -->
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SpinnerCom from "@/components/SpinnerCom.vue";

export default {
  name: "ItemList",
  data() {
    return {
      loadingStatus: true,
    };
  },
  components: {
    SpinnerCom,
  },
  computed: {
    ...mapState("dbInfo", ["manageItems"]),
  },
  created() {
    this.fetchManageItems({
      Address: window.klaytn.selectedAddress,
    }).then(() => {
      this.loadingStatus = false;
    });
    // this.InitMetadata({
    //   Address: window.klaytn.selectedAddress,
    // });
    this.fetchManageLists();
    // this.fetchItems();
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
