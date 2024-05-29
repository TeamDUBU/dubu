/* eslint-disable */
<template>
  <div class="break-words">
    <div class="grid grid-cols-12 grid-rows-12">
      <h1 class="text-2xl font-bold mb-4 col-span-12 row-span-1">
        House Information
      </h1>
      <button @click="close" class="col-span-1 col-start-12 row-span-1">
        X
      </button>
      <div class="flex flex-col items-center justify-center h-full">
        <p><strong>Token ID:</strong> {{ this.$route.params.TokenId }}</p>
        <p><strong>Hosu:</strong> {{ this.$route.params.Hosu }}</p>
        <p class="mb-2"><strong>Agent:</strong> {{ this.info.agent }}</p>
        <p class="mb-2"><strong>Option:</strong> {{ this.info.option }}</p>
        <p class="mb-4">
          <strong>ContractList:</strong> {{ this.info.contract_list }}
        </p>
        <div class="space-y-4">
          <div v-for="url in imageURLs" :key="url" class="flex justify-center">
            <img :src="url" alt="House Image" class="max-w-xs h-auto" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import { DUBU } from "@/utils/caver";

export default {
  name: "HouseInfo",
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
        const result = await DUBU.methods
          .item_list(this.$route.params.TokenId, this.$route.params.Hosu)
          .call();
        this.info = result;
        const imageUrlResult = await DUBU.methods
          .getUrlList(this.info.tokenId, this.info.hosu)
          .call();
        this.imageURLs = imageUrlResult;
      } catch (error) {
        console.error(error);
      }
    },
    async click() {
      try {
        console.log(Number(this.info.hosu));
        console.log(window.klaytn.selectedAddress);
        console.log(this.info.tokenId);
        console.log(this.info.agent);
        await DUBU.methods
          .addItem(
            this.info.tokenId,
            Number(this.info.hosu),
            this.info.agent,
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
    close() {
      this.$router.go({
        name: "MainView",
      });
    },
  },
};
</script>

<style></style>
