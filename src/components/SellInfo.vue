<template>
  <div class="break-words pt-16">
    <div class="grid grid-cols-12 gap-4">
      <button
        @click="close"
        class="col-span-1 col-start-12 text-xl font-extrabold"
      >
        X
      </button>
      <h1 class="text-2xl font-bold mb-4 col-span-12">House Information</h1>
      <div class="col-span-3 col-start-1 text-xl">주소:</div>
      <div class="col-start-4 col-end-8 text-left">
        {{ this.info[0].addrToji }}
      </div>

      <div class="col-span-3 col-start-1 text-xl">건물명:</div>
      <div class="col-start-4 col-end-8 text-left">
        {{ info[0].note }}
      </div>
      <div class="col-span-3 col-start-1 text-xl">호수:</div>
      <div class="col-start-4 col-end-6 text-left h-[90px] overflow-y-auto">
        <div v-for="hosu in info[0].hosu" :key="hosu">
          <input type="radio" v-model="radioHosu" :value="hosu" />
          {{ hosu }}호
        </div>
      </div>
      <div class="col-span-3 col-start-1 text-xl">Token ID(지번코드 PNU):</div>
      <div class="col-start-4 col-end-8 text-left">
        {{ this.$route.params.TokenId }}
      </div>
      <div class="col-span-3 col-start-1 text-xl">옵션:</div>
      <div class="col-start-4 col-end-8 text-left">
        <form @submit.prevent="getTuple">
          <div class="grid grid-cols-subgrid col-span-4">
            <label class="col-start-1 col-span-2"> 월세 : </label>
            <input
              class="text-right col-start-3 w-full bg-gray-200"
              type="number"
              v-model.number="option.priceMonth"
              placeholder="가격 입력"
              @input="validateInput('priceMonth')"
              required
            />
            <span class="col-start-4">만 원</span>
          </div>
          <div class="grid grid-cols-subgrid col-span-4">
            <label class="col-start-1 col-span-2">보증금 / 전세금 : </label>
            <input
              class="text-right col-start-3 w-full bg-gray-200"
              type="number"
              v-model.number="option.priceLent"
              placeholder="가격 입력"
              @input="validateInput('priceLent')"
              required
            /><span class="col-start-4">만 원</span>
          </div>
          <div class="grid grid-cols-subgrid col-span-4">
            <label class="col-start-1 col-span-2">관리비 :</label>
            <input
              class="text-right col-start-3 w-full bg-gray-200"
              type="number"
              placeholder="가격 입력"
              v-model.number="option.manageFee"
              @input="validateInput('manageFee')"
              required
            />
            <span class="col-start-4">만 원</span>
          </div>
          <div class="grid grid-cols-subgrid col-span-4">
            <span class="col-start-1 col-span-2">주차 가능 여부:</span>
            <input
              class="col-start-4 col-span-1 justify-self-start"
              type="checkbox"
              v-model="option.parking"
            />
          </div>
          <div class="grid grid-cols-subgrid col-span-3">
            <span class="col-start-1 col-span-2">엘리베이터 유무:</span>
            <input
              type="checkbox"
              class="col-start-4 col-span-1 justify-self-start"
              v-model="option.elevator"
            />
          </div>
          <div class="grid grid-cols-subgrid col-span-3">
            <span class="col-start-1 col-span-2">애완동물 가능 여부:</span>
            <input
              type="checkbox"
              class="col-start-4 col-span-1 justify-self-start"
              v-model="option.pet"
            />
          </div>
          <div class="grid grid-cols-subgrid col-span-3">
            <span class="col-start-1 col-span-2"
              >풀 옵션<span
                class="tooltip-container text-gray-600 ml-1 rounded-full text-sm"
                >? :
                <span class="tooltip-text">
                  <strong>냉장고, 에어컨, 전자레인지 등이 있나요?</strong>
                </span>
              </span></span
            >
            <input
              class="col-start-4 col-span-1 justify-self-start"
              type="checkbox"
              v-model="option.fullOpt"
            />
          </div>
        </form>
      </div>
      <div class="col-span-3 col-start-1 text-xl">특약 내용:</div>
      <div class="col-start-4 col-end-8 text-left">
        <textarea
          class="w-full"
          v-model="noteSeller"
          placeholder="추가하실 특약 내용을 작성해주세요!! (공인중개사가 검토 후 등록됩니다.)"
        ></textarea>
      </div>

      <div class="col-span-3 col-start-1 text-xl">이미지 업로드:</div>
      <div class="col-start-4 col-end-13 text-left">
        <form @submit.prevent="handleSubmit">
          <input type="file" @change="handleFileUpload" multiple />
          <button
            type="submit"
            class="mt-2 bg-gray-300 rounded-md shadow-md px-3"
          >
            업로드
          </button>
        </form>
      </div>
      <div v-if="imageUrls.length" class="col-start-3 col-end-11">
        <h2>Uploaded Images:</h2>
        <carousel
          :perPageCustom="this.optionSlide.perPageCustom"
          :loop="this.optionSlide.loop"
          :navigationEnabled="this.optionSlide.navigationEnabled"
          :centerMode="this.optionSlide.centerMode"
        >
          <slide
            v-for="url in imageUrls"
            :key="url"
            class="flex flex-col items-center p-4 bg-gray-200 rounded-lg shadow-md"
          >
            <img
              :src="url"
              alt="House Image"
              class="w-full h-48 object-cover rounded-t-lg"
            />
          </slide>
        </carousel>
        <button
          @click="sellItem"
          class="my-4 bg-gray-300 rounded-md shadow-md px-3"
        >
          판매 등록
        </button>
      </div>
      <div class="col-start-8 col-end-13 row-start-6 text-xl text-left">
        공인중개사 리스트
      </div>
      <div
        class="col-start-8 col-end-12 row-start-7 text-left h-[90px] overflow-y-auto"
      >
        <div v-for="agent in agents" :key="agent.account">
          <input type="radio" v-model="radioAgent" :value="agent.account" />
          {{ agent.name }}
          <span
            class="tooltip-container text-gray-600 ml-1 rounded-full text-sm"
            >?
            <span class="tooltip-text">
              <strong>공인중개사 주소:</strong> {{ agent.workplace }}<br />
              <strong>면허 번호:</strong> {{ agent.code }}<br />
              <strong>연락처:</strong> {{ agent.contact }}<br />
              <strong>취득 날짜:</strong> {{ agent.date }}
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { DUBU } from "@/utils/caver";
import axios from "axios";
import { Carousel, Slide } from "@jambonn/vue-carousel";
import "@jambonn/vue-carousel/dist/index.css";

export default {
  name: "SellInfo",
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      info: [],
      imageUrls: [],
      selectedFiles: [],
      radioHosu: "",
      radioAgent: "",
      noteSeller: "",
      option: {
        priceMonth: null,
        priceLent: null,
        manageFee: null,
        parking: false,
        elevator: false,
        pet: false,
        fullOpt: false,
      },
      optionSlide: {
        perPageCustom: [
          [480, 1],
          [800, 2],
          [1024, 3],
        ],
        navigationEnabled: true,
        loop: true,
        centerMode: true,
        spacePadding: 4,
      },
      optionTuple: [],
    };
  },
  computed: {
    ...mapState("dbInfo", ["item_list", "agents", "items"]),
  },
  async created() {
    this.fetchManageItems({
      Address: window.klaytn.selectedAddress,
    });
    this.InitMetadata({
      Address: window.klaytn.selectedAddress,
    });
    this.fetchManageLists();
    this.fetchItems();
    this.filterItems();
  },
  mounted() {
    // this.filterItems();
  },
  methods: {
    ...mapActions("dbInfo", [
      "InitMetadata",
      "fetchManageLists",
      "fetchManageItems",
      "fetchItems",
    ]),
    validateInput(field) {
      if (this.option[field] < 0) {
        this.option[field] = 0;
      }
    },
    getTuple() {
      this.optionTuple = [
        this.option.priceMonth,
        this.option.priceLent,
        this.option.manageFee,
        this.option.parking,
        this.option.elevator,
        this.option.pet,
        this.option.fullOpt,
      ];
    },
    filterItems() {
      this.info = this.item_list.filter(
        (item) => item.tokenId === this.$route.params.TokenId
      );
      this.items.forEach((item) => {
        this.item_list.forEach((listItem) => {
          const index = listItem.hosu.indexOf(item.hosu);
          if (index !== -1) {
            listItem.hosu.splice(index, 1);
          }
        });
      });
    },
    close() {
      this.$router.replace({ path: "/sell" });
    },
    handleFileUpload(event) {
      this.selectedFiles = Array.from(event.target.files);
    },
    async handleSubmit() {
      if (!this.selectedFiles.length) {
        alert("Please select at least one file.");
        return;
      }
      this.imageUrls = [];

      for (const file of this.selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                pinata_api_key: "40f695910735cbbbadfb",
                pinata_secret_api_key:
                  "2c74a87c1bae18fe0247543d3895ddd99b84bafb334633c59bda952180901c4f",
              },
            }
          );

          const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
          this.imageUrls.push(url);
        } catch (error) {
          console.error("Error uploading file to Pinata:", error);
        }
      }
    },
    async sellItem() {
      if (!window.klaytn.selectedAddress) {
        alert("ERROR: 지갑을 연결해주세요!");
        return;
      }

      try {
        let opt = [];
        this.option.priceLent *= 100;
        this.option.priceMonth *= 100;
        this.option.manageFee *= 100;
        opt.push(this.option.priceMonth);
        opt.push(this.option.priceLent);
        opt.push(this.option.manageFee);
        opt.push(this.option.parking);
        opt.push(this.option.elevator);
        opt.push(this.option.pet);
        opt.push(this.option.fullOpt);
        const result = await DUBU.methods
          .addItem(
            this.$route.params.TokenId,
            this.radioHosu,
            this.radioAgent, // agentAddress
            this.noteSeller, // 특약 _info
            opt, // option
            this.imageUrls
          )
          .send({
            from: window.klaytn.selectedAddress,
            gas: 3000000,
          });

        if (result != null) {
          this.$swal
            .fire({
              backdrop: `rgba(0,0,123,0.4)`,
              imageUrl: this.imageUrls[0],
              imageWidth: "50%",
              imageHeight: "auto",
              title: "판매 정보를 등록했습니다.",
              text: "감사합니다.",
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "내 판매 아이템 보기",
              cancelButtonText: "닫기",
              allowOutsideClick: false,
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.$router.replace({
                  path: "/main",
                });
              } else {
                this.$router.go(-1);
              }
            });
        }
      } catch (error) {
        console.error(error);
        alert("아이템 추가에 실패하였습니다.");
      }
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
  width: 350px;
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
