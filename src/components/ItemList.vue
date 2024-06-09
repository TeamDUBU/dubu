<template>
  <div>
    <spinner-com :loading="this.loadingStatus"></spinner-com>
    <div class="grid grid-cols-12 pt-16">
      <div class="text-3xl col-start-6 col-span-2">매물 관리 목록</div>
      <div class="col-end-13 col-span-2 py-4">
        <button
          @click="showHistory(0)"
          class="mt-2 rounded-md shadow-md py-1 px-3 text-lg bg-gray-100 hover:text-blue-400 hover:bg-gray-300"
        >
          거래 로그 보기
        </button>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-4">
      <div
        v-for="item in manageItems"
        :key="item.tokenId / item.hosu"
        class="col-span-10 col-start-2 md:col-span-4 md:gap-8 xl:col-span-3 flex flex-col items-center p-4 bg-white rounded-lg shadow-md"
      >
        <img
          :src="item.url[0]"
          alt="House Image"
          class="w-full h-48 object-cover rounded-t-lg"
        />
        <div
          class="text-md text-orange-600 font-semibold"
          v-if="item.status == 1"
        >
          상태: 계약서 작성 전
        </div>
        <div
          class="text-md text-blue-600 font-semibold"
          v-if="item.status == 2"
        >
          상태: 거래 진행 전
        </div>
        <div class="pb-2 text-center">
          <div class="text-lg font-semibold">
            건물명: {{ item.note
            }}<span
              class="tooltip-container text-gray-600 ml-1 rounded-full text-sm"
              >?
              <span class="tooltip-text">
                <strong>PNU코드 : {{ item.tokenId }}</strong>
              </span>
            </span>
          </div>
          <div class="text-md text-gray-600 font-semibold">
            주소: {{ item.addrToji }}
          </div>
          <button
            @click="goManageNFTInfo(item)"
            class="mt-2 bg-ivory-500 rounded-md shadow-md py-1 px-3"
          >
            상세 보기
          </button>
        </div>
      </div>
    </div>
    <main
      v-if="!this.loadingStatus && this.manageItems < 1"
      class="grid min-h-full z-0 h-screen place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8"
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
  name: "ItemList",
  data() {
    return {
      currentHistoryIndex: 0,
      loadingStatus: true,
    };
  },
  components: {
    SpinnerCom,
  },
  computed: {
    ...mapState("dbInfo", ["manageItems", "aHistory"]),
  },
  created() {
    this.fetchManageItems({
      Address: window.klaytn.selectedAddress,
    }).then(() => {
      this.loadingStatus = false;
    });
    this.fetchAgentHistorys({
      Address: window.klaytn.selectedAddress,
    });
  },
  methods: {
    ...mapActions("dbInfo", [
      "InitMetadata",
      "fetchManageLists",
      "fetchManageItems",
      "fetchItems",
      "fetchAgentHistorys",
    ]),
    showHistory(index) {
      this.currentHistoryIndex = index;
      let item = this.aHistory[this.currentHistoryIndex];

      const historyHtml = `
      <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 text-right">${
            this.currentHistoryIndex + 1
          } / ${this.aHistory.length}</div>
          <div class="col-span-4 text-left">상태 코드:</div>
          <div class="col-span-8 text-left">${item.status}(거래 완료)</div>
          <div class="col-span-4 text-left">주소:</div>
          <div class="col-span-8 text-left">${item.addrToji}</div>
          <div class="col-span-4 text-left">건물명:</div>
          <div class="col-span-8 text-left">${item.note}</div>
          <div class="col-span-4 text-left">TokenID:</div>
          <div class="col-span-8 text-left">${item.tokenId}</div>
          <div class="col-span-4 text-left">호수:</div>
          <div class="col-span-8 text-left">${item.hosu}</div>
          <div class="col-span-4 text-left">임대인 공개키:</div>
          <div class="col-span-8 text-left">${item.contract_list[3]}</div>
          <div class="col-span-4 text-left">임차인 공개키:</div>
          <div class="col-span-8 text-left">${item.contract_list[2]}</div>
          <div class="col-span-4 text-left">상호 특약 내역:</div>
          <div class="col-span-8 text-right">${item.contract_list[1]}</div>
          <div class="col-span-8 col-end-13 text-right">${
            item.contract_list[0]
          }</div>
        </div>
      `;
      this.$swal
        .fire({
          backdrop: `rgba(0,0,123,0.4)`,
          title: "히스토리 보기",
          html: `<div style="text-align: left;">${historyHtml}</div>`,
          icon: "info",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          showCancelButton: true,
          cancelButtonText: "닫기",
          confirmButtonText: "다음 아이템 보기",
          allowOutsideClick: false,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.nextItem();
          }
        });
    },
    nextItem() {
      if (this.currentHistoryIndex < this.aHistory.length - 1) {
        this.showHistory(this.currentHistoryIndex + 1);
      } else {
        this.$swal
          .fire({
            title: "마지막 항목입니다.",
            icon: "info",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "확인",
          })
          .then(() => {
            this.currentHistoryIndex = 0; // 인덱스 초기화
          });
      }
    },
    goManageNFTInfo(item) {
      this.$router.push({
        name: "Item-Detail",
        params: {
          TokenId: item.tokenId,
          Hosu: item.hosu,
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
