<template>
  <div>
    <spinner-com :loading="this.loadingStatus"></spinner-com>
    <div class="text-3xl pt-16">보유 건물 목록</div>
    <div class="grid grid-cols-12 gap-4">
      <div
        v-for="item in item_list"
        :key="item.tokenId"
        class="col-span-10 col-start-2 md:col-span-4 md:gap-8 xl:col-span-3 flex flex-col items-center p-4 bg-white rounded-lg shadow-md"
      >
        <img
          :src="item.url.Thumbnail"
          alt="House Image"
          class="w-full h-48 object-cover rounded-t-lg"
        />
        <div class="p-2 text-center">
          <div class="text-lg font-semibold">
            건물명: {{ item.note
            }}<span
              class="tooltip-container text-gray-600 ml-1 rounded-full text-sm"
              >? :
              <span class="tooltip-text">
                <strong>PNU코드 : {{ item.tokenId }}</strong>
              </span>
            </span>
          </div>
          <div class="text-md text-gray-600 font-semibold">
            주소: {{ item.addrToji }}
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
    <main
      v-if="!this.loadingStatus && this.item_list < 1"
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
          현재 보유한 아이템이 없습니다.
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
  name: "SellList",
  data() {
    return {
      loadingStatus: true,
    };
  },
  components: {
    SpinnerCom,
  },
  computed: {
    ...mapState("dbInfo", ["item_list"]),
  },
  created() {
    // this.fetchManageItems({
    //   Address: window.klaytn.selectedAddress,
    // });
    this.InitMetadata({
      Address: window.klaytn.selectedAddress,
    }).then(() => {
      this.loadingStatus = false;
    });
    // this.fetchManageLists();
    // this.fetchItems();
  },
  methods: {
    ...mapActions("dbInfo", [
      "InitMetadata",
      "fetchManageLists",
      "fetchManageItems",
      "fetchItems",
    ]),
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

<style>
.tooltip-container {
  position: absolute;
  display: inline-block;
  cursor: pointer;
}

.tooltip-text {
  visibility: hidden;
  width: 250px;
  background-color: #d1d5db;
  color: #000;
  text-align: left;
  border-radius: 5px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Position the tooltip above the text */
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  justify-content: center;
}

.tooltip-container:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

.tooltip-container .tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
</style>
