<template>
  <div class="break-words pt-16">
    <div class="grid grid-cols-12 gap-2">
      <button
        @click="close"
        class="col-span-1 col-start-12 text-xl font-extrabold"
      >
        X
      </button>
      <h1 class="text-2xl font-bold mb-4 col-span-12">House Information</h1>
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
      <div class="col-span-3 col-start-1 text-xl">Token ID:</div>
      <div class="col-start-4 col-end-13 text-left">
        {{ this.$route.params.TokenId }}
      </div>

      <!-- <div class="col-span-8 col-start-3 p-4">
        <carousel :perPage="1" navigationEnabled>
          <slide v-for="link in info[0].url" :key="link">
            <img :src="link" alt="House Image" class="w-full h-auto" />
          </slide>
        </carousel>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import { Carousel, Slide } from "@jambonn/vue-carousel";
// import "@jambonn/vue-carousel/dist/index.css";

export default {
  name: "HouseInfo",
  components: {
    // Carousel,
    // Slide,
  },
  data() {
    return {
      info: [],
    };
  },
  computed: {
    ...mapState("dbInfo", ["item_list"]),
  },
  async created() {
    this.filterItems();
  },
  methods: {
    filterItems() {
      this.info = this.item_list.filter(
        (item) => item.tokenId === this.$route.params.TokenId
      );
    },
    close() {
      this.$router.replace({ path: "/sell" });
    },
  },
};
</script>

<style></style>
