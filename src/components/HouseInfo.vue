<template>
  <div class="break-words">
    <div class="grid grid-cols-12 gap-2 h-screen overflow-y-auto">
      <button
        @click="close"
        class="col-span-1 col-start-12 text-xl font-extrabold pt-16"
      >
        X
      </button>
      <h1 class="text-2xl font-bold col-span-12">House Information</h1>
      <!-- Image -->
      <div class="col-span-8 col-start-3">
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
      <div class="col-span-3 col-start-1 text-xl">주소:</div>
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
            매 월 {{ this.info[0].option[0] / 100 }}
          </div>
          <span class="col-span-1 text-gray-600">만 원</span>
        </div>
        <div class="grid grid-cols-8 gap-2">
          <label class="col-span-3 font-semibold text-gray-600"
            >보증금 / 전세금:</label
          >
          <div class="col-span-2 text-right">
            {{ this.info[0].option[1] / 100 }}
          </div>
          <span class="col-span-1 text-gray-600">만 원</span>
        </div>
        <div class="grid grid-cols-8 gap-2">
          <label
            class="col-span-3 font-semibold text-gray-600 border-b-2 border-dashed"
            >관리비:</label
          >
          <div class="col-span-2 text-right border-b-2 border-dashed">
            {{ this.info[0].option[2] / 100 }}
          </div>
          <span class="col-span-1 text-gray-600 border-b-2 border-dashed"
            >만 원</span
          >
        </div>
        <div class="grid grid-cols-8 gap-2 items-center">
          <span class="col-span-3 font-semibold text-gray-600"
            >주차 가능 여부:</span
          >
          <div class="col-span-2 text-right">
            {{ this.info[0].option[3] ? "O" : "X" }}
          </div>
        </div>
        <div class="grid grid-cols-8 gap-2 items-center">
          <span class="col-span-3 font-semibold text-gray-600"
            >엘리베이터 유무:</span
          >
          <div class="col-span-2 text-right">
            {{ this.info[0].option[4] ? "O" : "X" }}
          </div>
        </div>
        <div class="grid grid-cols-8 gap-2 items-center">
          <span class="col-span-3 font-semibold text-gray-600"
            >애완동물 가능 여부:</span
          >
          <div class="col-span-2 text-right">
            {{ this.info[0].option[5] ? "O" : "X" }}
          </div>
        </div>
        <div class="grid grid-cols-8 gap-2 items-center">
          <span
            class="col-span-3 font-semibold text-gray-600 border-b-2 border-dashed"
          >
            풀 옵션
            <span
              class="tooltip-container text-gray-600 ml-1 rounded-full text-sm border-b-2 border-dashed"
              >? :
              <span class="tooltip-text bg-gray-200 p-2 rounded-md shadow-lg">
                <strong>냉장고, 에어컨, 전자레인지 등이 있나요?</strong>
              </span>
            </span>
          </span>
          <div class="col-span-2 text-right border-b-2 border-dashed">
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
      <div
        class="col-start-5 col-span-4"
        v-if="this.info[0].contract_list[0].length > 0"
      >
        <button
          @click="purchase"
          class="bg-orange-500 text-white rounded-md shadow-md w-full px-3 py-1 my-5 hover:bg-orange-700"
        >
          구매
        </button>
      </div>
      <div class="col-start-5 col-span-4" v-else>
        <button
          @click="addContraction"
          class="bg-blue-500 text-white rounded-md shadow-md w-full px-3 py-1 my-5 hover:bg-blue-700"
        >
          계약서 작성
        </button>
      </div>
      <div class="col-span-12 col-start-1 text-xl">등기 확인:</div>
      <div class="col-start-1 col-span-12">
        <button
          @click="menu = 'building'"
          class="bg-blue-500 text-white rounded-md shadow-md col-span-3 px-3 py-1 my-5 hover:bg-blue-700"
        >
          건축물 대장 보기
        </button>
        <button
          @click="menu = 'realEstate'"
          class="bg-blue-500 text-white rounded-md shadow-md col-span-3 px-3 py-1 my-5 hover:bg-blue-700"
        >
          등기부 등본 보기
        </button>
        <button
          @click="menu = 'toji'"
          class="bg-blue-500 text-white rounded-md shadow-md col-span-3 px-3 py-1 my-5 hover:bg-blue-700"
        >
          토지 대장부 보기
        </button>
      </div>
      <div class="col-span-8 col-start-3">
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
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { DUBU } from "@/utils/caver";
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
      info: [],
      menu: "",
      // note: "",
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
    ...mapState("dbInfo", ["items"]),
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
  },
  methods: {
    ...mapActions("dbInfo", [
      "InitMetadata",
      "fetchManageLists",
      "fetchManageItems",
      "fetchItems",
    ]),
    showImage() {
      this.$swal.fire({
        backdrop: `rgba(0,0,123,0.4)`,
        imageUrl: this.info.url2.building[0],
        imageWidth: "50%",
        imageHeight: "auto",
        title: "등기 정보 확인",
        text: "등기 정보를 확인합니다.",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "승인",
        cancelButtonText: "취소",
        allowOutsideClick: false,
      });
    },
    async click() {
      try {
        console.log(Number(this.items.hosu));
        console.log(window.klaytn.selectedAddress);
        console.log(this.items.tokenId);
        console.log(this.items.agent);
        await DUBU.methods
          .addItem(
            this.items.tokenId,
            Number(this.items.hosu),
            this.items.agent,
            "hi",
            "hi",
            []
          )
          .send({
            from: window.klaytn.selectedAddress,
            gas: 3000000,
          });
      } catch (error) {
        console.error(error);
      }
    },
    filterItems() {
      this.info = this.items.filter(
        (item) =>
          item.tokenId === this.$route.params.TokenId &&
          item.hosu === this.$route.params.Hosu
      );
    },
    addContraction() {
      this.$swal
        .fire({
          backdrop: `rgba(0,0,123,0.4)`,
          imageUrl: this.info[0].url[0],
          imageWidth: "50%",
          imageHeight: "auto",
          title: "해당 건물을 계약 하시겠습니까?",
          text: "다시 되돌릴 수 없습니다. 신중하세요.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "승인",
          cancelButtonText: "취소",
          allowOutsideClick: false,
        })
        .then((result) => {
          if (result.isConfirmed) {
            try {
              if (!this.$store.state.wallet.isConnected) {
                throw "지갑연결을 해주세요";
              }
              if (
                this.info[0].contract_list[3].toUpperCase() ==
                window.klaytn.selectedAddress.toUpperCase()
              ) {
                throw "판매자는 구매할 수 없습니다.";
              }
              this.$swal
                .fire({
                  backdrop: `rgba(0,0,123,0.4)`,
                  imageUrl: this.info[0].url[0],
                  imageWidth: "50%",
                  imageHeight: "auto",
                  title: "특약 작성",
                  text: "특약을 작성해주세요.",
                  icon: "warning",
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "승인",
                  allowOutsideClick: false,
                  input: "text",
                  inputPlaceholder: "특약을 입력해보세요",
                  preConfirm: (inputValue) => {
                    if (!inputValue) {
                      this.$swal.showValidationMessage("특약을 입력해 주세요.");
                    }
                    return inputValue;
                  },
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    DUBU.methods
                      .setContracts(
                        this.$route.params.TokenId,
                        this.$route.params.Hosu,
                        result.value
                      )
                      .estimateGas({
                        from: window.klaytn.selectedAddress,
                        gas: 3000000,
                      })
                      .then((gasAmount) => {
                        let estimated_gas = gasAmount;
                        // console.log("GasFee : " + estimated_gas);
                        DUBU.methods
                          .setContracts(
                            this.$route.params.TokenId,
                            this.$route.params.Hosu,
                            result.value
                          )
                          .send({
                            from: window.klaytn.selectedAddress,
                            gas: estimated_gas,
                          })
                          .then((receipt) => {
                            if (receipt.status) {
                              this.$swal.fire({
                                backdrop: `rgba(0,0,123,0.4)`,
                                imageUrl: this.info[0].url[0],
                                imageWidth: "50%",
                                imageHeight: "auto",
                                title: "계약을 작성했습니다",
                                text: "구매를 확정해주세요",
                                icon: "success",
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "승인",
                                allowOutsideClick: false,
                              });
                            }
                          });
                      });
                  }
                });
            } catch (error) {
              this.$swal.fire({
                backdrop: `rgba(0,0,123,0.4)`,
                title: "Error",
                text: error,
                icon: "error",
                allowOutsideClick: false,
              });
            }
          }
        });
    },
    purchase() {
      this.$swal
        .fire({
          backdrop: `rgba(0,0,123,0.4)`,
          imageUrl: this.info[0].url[0],
          imageWidth: "50%",
          imageHeight: "auto",
          title: "구매를 확정 하시겠습니까?",
          text: "다시 되돌릴 수 없습니다. 신중하세요.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "승인",
          cancelButtonText: "취소",
          allowOutsideClick: false,
        })
        .then((result) => {
          if (result.isConfirmed) {
            try {
              if (!this.$store.state.wallet.isConnected) {
                throw "지갑 연결을 해주세요";
              }
              if (
                !(
                  this.info[0].contract_list[2].toUpperCase() ==
                  window.klaytn.selectedAddress.toUpperCase()
                )
              ) {
                throw "계약자만 구매할 수 있습니다.";
              }
              this.$router.replace({
                name: "CheckOut-View",
                params: {
                  TokenId: this.$route.params.TokenId,
                  Hosu: this.$route.params.Hosu,
                },
              });
            } catch (error) {
              this.$swal.fire({
                backdrop: `rgba(0,0,123,0.4)`,
                title: "Error",
                text: error,
                icon: "error",
                allowOutsideClick: false,
              });
            }
          }
        });
    },

    close() {
      this.$router.replace({ path: "/main" });
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
