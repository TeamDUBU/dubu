<template>
  <div class="break-words">
    <div class="grid grid-cols-12 gap-2">
      <button
        @click="close"
        class="col-span-1 col-start-12 text-xl font-extrabold pt-16"
      >
        X
      </button>
      <h1 class="text-2xl font-bold my-8 col-span-12">House Information</h1>
      <div class="col-span-3 col-start-1 text-xl">주소:</div>
      <div class="col-start-4 col-end-13 text-left">
        {{ this.info[0].addrToji }}
      </div>
      <div class="col-span-3 col-start-1 text-xl">건물명:</div>
      <div class="col-start-4 col-end-13 text-left">
        {{ info[0].note }}
      </div>
      <div class="col-span-3 col-start-1 text-xl">호수:</div>
      <div class="col-start-4 col-end-13 text-left">
        {{ info[0].hosu }}
      </div>
      <div class="col-span-3 col-start-1 text-xl">옵션:</div>
      <div class="col-start-4 col-end-13 text-left">
        {{ this.info[0].option }}
      </div>
      <div class="col-span-3 col-start-1 text-xl">특약 내용:</div>
      <div class="col-start-4 col-end-13 text-left">
        {{ this.info[0].contract_list[1] }}
      </div>
      <div class="col-span-3 col-start-1 text-xl">Token ID:</div>
      <div class="col-start-4 col-end-13 text-left">
        {{ this.$route.params.TokenId }}
      </div>

      <div class="col-span-8 col-start-3 pt-12">
        <carousel
          :perPage="this.option.perPage"
          :loop="this.option.loop"
          :navigationEnabled="this.option.navigationEnabled"
          :centerMode="this.option.centerMode"
        >
          <slide v-for="link in info[0].url" :key="link">
            <img :src="link" alt="House Image" class="w-full h-64" />
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
  },
  async created() {
    this.filterItems();
  },
  methods: {
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
    close() {
      this.$router.replace({ path: "/main" });
    },
  },
};
</script>

<style></style>
