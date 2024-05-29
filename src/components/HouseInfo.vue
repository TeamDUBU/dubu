/* eslint-disable */
<template>
  <div class="relative w-full h-full">
    <button @click="close" class="absolute top-0 left-0">X</button>
    <div class="flex flex-col items-center justify-center h-full">
      <h1 class="text-2xl font-bold mb-4">House Information</h1>
      <p class="mb-2"><strong>Token ID:</strong> {{ item.tokenId }}</p>
      <p class="mb-2"><strong>Hosu:</strong> {{ item.hosu }}</p>
      <p class="mb-2"><strong>Agent:</strong> {{ info.agent }}</p>
      <p class="mb-2"><strong>Option:</strong> {{ info.option }}</p>
      <p class="mb-4">
        <strong>ContractList:</strong> {{ info.contract_list }}
      </p>
      <div class="space-y-4">
        <div v-for="url in imageURLs" :key="url" class="flex justify-center">
          <img :src="url" alt="House Image" class="max-w-xs h-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import { caver } from "@/utils/caver";
import { dubuABI } from "@/store/modules/abiInfo";

export default {
  name: "HouseInfo",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      info: [],
      imageURLs: [],
    };
  },
  async created() {
    await this.fetchItemDetails();
  },
  methods: {
    async fetchItemDetails() {
      try {
        const contract = new caver.klay.Contract(
          dubuABI,
          process.env.VUE_APP_DUBU_CONTRACT_ADDRESS
        );
        const result = await contract.methods
          .item_list(this.item.tokenId, this.item.hosu)
          .call();
        this.info = result;
        const imageUrlResult = await contract.methods
          .getUrlList(this.item.tokenId, this.item.hosu)
          .call();
        this.imageURLs = imageUrlResult;
      } catch (error) {
        console.error(error);
      }
    },
    close() {
      this.$emit("close-house-info");
    },
  },
};
</script>

<style></style>
