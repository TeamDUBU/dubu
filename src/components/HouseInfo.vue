<template>
  <div class="break-words">
    <h1>House Information</h1>
    <p><strong>Token ID:</strong> {{ this.$route.params.TokenId }}</p>
    <p><strong>Hosu:</strong> {{ this.$route.params.Hosu }}</p>
    <!-- <p><strong>Agent:</strong> {{ this.info.agent }}</p>
    <p><strong>Option:</strong> {{ this.info.option }}</p>
    <p><strong>ContractList:</strong> {{ this.info.contract_list }}</p> -->
    <div><button @click="click()">클릭</button></div>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import { DUBU } from "@/utils/caver";

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
    };
  },
  async created() {
    await this.fetchItemDetails();
  },
  methods: {
    async fetchItemDetails() {
      try {
        const result = await DUBU.methods
          .item_list(this.item.tokenId, this.item.hosu)
          .call();
        this.info = result;
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
  },
};
</script>

<style></style>
