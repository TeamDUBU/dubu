<template>
  <div class="break-words">
    <div class="grid grid-cols-12 gap-2">
      <button
        @click="close"
        class="col-span-1 col-start-12 text-xl font-extrabold text-red-500 hover:text-red-700 pt-16"
      >
        X
      </button>
      <h1 class="text-2xl font-bold col-span-12">House Information</h1>
      <!-- Image -->
      <div class="col-span-4 col-start-5 w-full h-auto flex justify-center">
        <carousel
          :perPage="this.option.perPage"
          :loop="this.option.loop"
          :navigationEnabled="this.option.navigationEnabled"
          :centerMode="this.option.centerMode"
        >
          <slide v-for="link in info[0].url" :key="link">
            <img
              :src="link"
              alt="House Image"
              class="w-full h-full object-fit m-2"
            />
          </slide>
        </carousel>
      </div>

      <div class="col-span-3 col-start-1 text-xl text-gray-700">주소:</div>
      <div class="col-start-4 col-end-13 text-left">
        {{ this.info[0].addrToji }}
      </div>
      <div class="col-span-3 col-start-1 text-xl">건물명:</div>
      <div class="col-start-4 col-end-13 text-left">
        {{ info[0].note }}
      </div>
      <div class="col-span-3 col-start-1 text-xl">호수:</div>
      <div class="col-start-4 col-end-11 text-left border-b-2 border-dashed">
        {{ info[0].hosu }}호
      </div>
      <div class="col-span-3 col-start-1 text-xl">옵션:</div>
      <div class="col-start-4 col-end-13 text-left">
        <div class="grid grid-cols-8 gap-2">
          <label class="col-span-3 font-semibold text-gray-600">월세:</label>
          <div class="col-span-2 text-right">
            매 월
            {{
              (this.info[0].option[0] / 100)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </div>
          <span class="col-span-1 text-gray-600">만 원</span>
        </div>
        <div class="grid grid-cols-8 gap-2">
          <label class="col-span-3 font-semibold text-gray-600"
            >보증금 / 전세금:</label
          >
          <div class="col-span-2 text-right">
            {{
              (this.info[0].option[1] / 100)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </div>
          <span class="col-span-1 text-gray-600">만 원</span>
        </div>
        <div class="grid grid-cols-8 gap-2">
          <label
            class="col-span-3 font-semibold text-gray-600 border-b-2 border-dashed"
            >관리비:</label
          >
          <div class="col-span-2 text-right border-b-2 border-dashed">
            {{
              (this.info[0].option[2] / 100)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </div>
          <span class="col-span-1 text-gray-600 border-b-2 border-dashed"
            >만 원</span
          >
        </div>
        <div class="grid grid-cols-8 gap-2 items-center pt-4">
          <span class="col-span-3 font-semibold text-gray-600"
            >주차 가능 여부:</span
          ><img src="@/assets/parking.png" class="w-12" />
          <div class="col-span-2 text-left">
            {{ this.info[0].option[3] ? "O" : "X" }}
          </div>
        </div>
        <div class="grid grid-cols-8 gap-2 items-center">
          <span class="col-span-3 font-semibold text-gray-600"
            >엘리베이터 유무:</span
          ><img src="@/assets/ele.png" class="w-12" />
          <div class="col-span-2 text-left">
            {{ this.info[0].option[4] ? "O" : "X" }}
          </div>
        </div>
        <div class="grid grid-cols-8 gap-2 items-center">
          <span class="col-span-3 font-semibold text-gray-600"
            >애완동물 가능 여부:</span
          ><img src="@/assets/pet.png" class="w-12" />
          <div class="col-span-2 text-left">
            {{ this.info[0].option[5] ? "O" : "X" }}
          </div>
        </div>
        <div class="grid grid-cols-8 gap-2 items-center pb-4">
          <span
            class="col-span-3 font-semibold text-gray-600 border-b-2 border-dashed"
          >
            풀 옵션
            <span
              class="tooltip-container text-gray-600 ml-1 rounded-full text-sm border-b-2 border-dashed pb-4"
              >? :
              <span class="tooltip-text bg-gray-200 p-2 rounded-md shadow-lg">
                <strong>냉장고, 에어컨, 전자레인지 등이 있나요?</strong>
              </span>
            </span> </span
          ><img src="@/assets/full.png" class="border-b-2 border-dashed w-12" />
          <div class="col-span-2 text-left border-b-2 border-dashed pb-4">
            {{ this.info[0].option[6] ? "O" : "X" }}
          </div>
        </div>
      </div>
      <div class="col-span-3 col-start-1 text-xl">특약 내용:</div>
      <div
        class="col-start-4 col-end-13 text-left"
        v-if="this.info[0].contract_list[1].length > 0"
      >
        {{ this.info[0].contract_list[1] }}
      </div>
      <div class="col-start-4 col-end-13 text-left" v-else>없 음</div>
      <div class="col-span-3 col-start-1 text-xl">Token ID:</div>
      <div class="col-start-4 col-end-13 text-left">
        {{ this.$route.params.TokenId }}
      </div>
      <div class="col-span-3 col-start-1 text-xl">임대인 ID:</div>
      <div class="col-start-4 col-end-13 text-left">
        {{ this.info[0].contract_list[3] }}
      </div>
      <!-- <div
        class="col-start-5 col-span-4"
        v-if="this.info[0].contract_list[0].length > 0"
      >
        <button
          @click="purchase"
          class="bg-orange-500 text-white rounded-md shadow-md w-full px-3 py-1 my-5 hover:bg-orange-700"
        >
          구매
        </button>
      </div> -->
      <!-- <div class="col-start-5 col-span-4" v-else>
        <button
          @click="addContraction"
          class="mt-2 bg-blue-500 text-white rounded-md shadow-md px-3 py-1 hover:bg-blue-700"
        >
          계약서 작성
        </button>
      </div> -->
      <div class="col-span-12 col-start-1 text-xl">등기 확인:</div>
      <div class="col-start-1 col-span-12">
        <button
          @click="menu = 'building'"
          class="mt-2 rounded-md shadow-md py-1 px-3 text-lg bg-gray-100 hover:text-blue-400 hover:bg-gray-300"
        >
          건축물 대장 보기
        </button>
        <button
          @click="menu = 'realEstate'"
          class="mt-2 rounded-md shadow-md py-1 px-3 text-lg bg-gray-100 hover:text-blue-400 hover:bg-gray-300"
        >
          등기부 등본 보기
        </button>
        <button
          @click="menu = 'toji'"
          class="mt-2 rounded-md shadow-md py-1 px-3 text-lg bg-gray-100 hover:text-blue-400 hover:bg-gray-300"
        >
          토지 대장부 보기
        </button>
      </div>
      <div class="col-span-4 col-start-5 w-full h-auto flex justify-center">
        <carousel
          :perPage="this.option.perPage"
          :loop="this.option.loop"
          :navigationEnabled="this.option.navigationEnabled"
          :centerMode="this.option.centerMode"
        >
          <slide v-for="link in filteredLinks" :key="link">
            <img
              :src="link"
              alt="House Image"
              class="w-full h-full object-fit m-2"
            />
          </slide>
        </carousel>
      </div>
      <div class="col-start-5 col-span-4 py-4">
        <button
          @click="showHistory(0)"
          class="mt-2 rounded-md shadow-md py-1 px-3 text-lg bg-gray-100 hover:text-blue-400 hover:bg-gray-300"
        >
          거래 내역 보기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import { DUBU } from "@/utils/caver";
import { Carousel, Slide } from "@jambonn/vue-carousel";
import "@jambonn/vue-carousel/dist/index.css";

export default {
  name: "HouseInfo",
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      currentHistoryIndex: 0,
      info: [],
      item: "",
      amount: "",
      date: "",
      statusCode: "",
      menu: "",
      option: {
        perPage: 1,
        navigationEnabled: true,
        loop: true,
        centerMode: true,
        spacePadding: 4,
      },
    };
  },
  computed: {
    ...mapState("dbInfo", ["items", "history", "manageItems"]),
    filteredLinks() {
      if (this.menu === "building") {
        return this.info[0].url2.building;
      } else if (this.menu === "toji") {
        return this.info[0].url2.toji;
      } else if (this.menu === "realEstate") {
        return this.info[0].url2.realEstate;
      } else {
        return [];
      }
    },
  },
  async created() {
    this.filterItems();
    this.fetchHistorys({
      tokenId: this.$route.params.TokenId,
      hosu: this.$route.params.Hosu,
    });
  },
  methods: {
    ...mapActions("dbInfo", [
      "InitMetadata",
      "fetchManageLists",
      "fetchManageItems",
      "fetchItems",
      "fetchHistorys",
    ]),
    showHistory(index) {
      this.currentHistoryIndex = index;
      let item = this.history[this.currentHistoryIndex];
      let pattern =
        /(.*?)_(카카오페이)_(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2})_(\d+KRW)/;
      let match = item.note.match(pattern);

      if (match) {
        this.statusCode = match[1];
        this.paymentMethod = match[2];
        this.date = match[3];
        this.amount = match[4];
      }
      const historyHtml = `
      <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 text-right">${
            this.currentHistoryIndex + 1
          } / ${this.history.length}</div>
          <div class="col-span-4 text-left">상태 코드:</div>
          <div class="col-span-8 text-left">${item.code} (${
        item.code == 0 ? "소유권 보존" : this.statusCode
      })</div>
          <div class="col-span-4 text-left">신규 소유자:</div>
          <div class="col-span-8 text-left">${item.newOwner}</div>
          <div class="col-span-4 text-left">이전 소유자:</div>
          <div class="col-span-8 text-left">${item.prevOwner}</div>
          <div class="col-span-4 text-left">타임스탬프:</div>
          <div class="col-span-8 text-left">${item.timeStamp}</div>
          <div class="col-span-4 text-left">거래 기록:</div>
          <div class="col-span-8 text-right">${
            item.code == 0
              ? ""
              : this.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }</div>
          <div class="col-span-8 col-end-13 text-right">${
            item.code == 0 ? "" : this.date
          }</div>
          <div class="col-span-8 col-end-13 text-right">${
            item.code == 0 ? "" : this.paymentMethod
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
      if (this.currentHistoryIndex < this.history.length - 1) {
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
    filterItems() {
      this.info = this.manageItems.filter(
        (item) =>
          item.tokenId === this.$route.params.TokenId &&
          item.hosu === this.$route.params.Hosu
      );
    },

    close() {
      this.$router.replace({ path: "/manage" });
    },
  },
};
</script>

<style>
.tooltip-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip-text {
  visibility: hidden;
  width: 350px;
  background-color: #d1d5db;
  color: #000;
  text-align: left;
  border-radius: 5px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  bottom: 100%;
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

.tooltip-container .tooltip-text:before {
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
