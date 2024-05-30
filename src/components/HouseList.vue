<template>
  <div class="">
    <!-- <div class="text-3xl py-2">House List</div> -->
    <div class="max-h-screen pt-12 m-8">
      <carousel
        :perPageCustom="this.option.perPageCustom"
        :loop="this.option.loop"
        :navigationEnabled="this.option.navigationEnabled"
        :centerMode="this.option.centerMode"
      >
        <slide
          v-for="item in items"
          :key="(item.tokenId, item.hosu)"
          class="flex flex-col items-center p-4 bg-gray-200 rounded-lg shadow-md"
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
        </slide>
      </carousel>
    </div>
    <div class="text-3xl font-bold border-2 border-black">
      광고 문의 010-7372-2991
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Carousel, Slide } from "@jambonn/vue-carousel";
import "@jambonn/vue-carousel/dist/index.css";

export default {
  name: "HouseList",
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      option: {
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
    };
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
