<template>
  <div>
    <h1>House Information</h1>
    <p><strong>Token ID:</strong> {{ item.tokenId }}</p>
    <p><strong>Hosu:</strong> {{ item.hosu }}</p>
    <p><strong>Agent:</strong> {{ agent }}</p>
    <p><strong>Option:</strong> {{ option }}</p>
    <p><strong>ContractList:</strong> {{ contract_list }}</p>

  </div>
</template>

<script>
// import { mapState } from 'vuex';
import { caver } from '@/utils/caver';
import { dubuABI } from '@/store/modules/abiInfo';

export default {
  name: 'HouseInfo',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      info: []
    };
  },
  async created() {
    await this.fetchItemDetails();
  },
  methods: {
    async fetchItemDetails() {
      try {
        const contract = new caver.klay.Contract(dubuABI, process.env.VUE_APP_DUBU_CONTRACT_ADDRESS);
        const result = await contract.methods.item_list(this.item.tokenId, this.item.hosu).call();
        this.info = result;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style></style>
