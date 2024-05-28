<template>
  <div>
    <h1>Sell Form</h1>
    <input type="text" v-model="hosu" placeholder="Hosu" />
    <input type="text" v-model="info" placeholder="Info" />
    <input type="text" v-model="option" placeholder="Option" />
    <form @submit.prevent="handleSubmit">
      <input type="file" @change="handleFileUpload" multiple />
      <button type="submit">Submit</button>
    </form>
    <div v-if="imageUrls.length">
      <h2>Uploaded Images:</h2>
      <div v-for="url in imageUrls" :key="url">
        <img :src="url" alt="Uploaded Image" />
      </div>
      <button @click="sellItem">아이템 추가</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { caver } from "@/utils/caver";
import { dubuABI, NFTABI } from "@/store/modules/abiInfo";

export default {
  data() {
    return {
      selectedFiles: [],
      imageUrls: [],
      tokenId: '1159010200105000001',
      hosu: '',
      agent: '0xb7C27FCF11c7D42504EeB39132F97244C032D372',
      info: '',
      option: '',
      account: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFiles = Array.from(event.target.files);
    },
    async handleSubmit() {
      if (!this.selectedFiles.length) {
        alert('Please select at least one file.');
        return;
      }
      this.imageUrls = [];

      for (const file of this.selectedFiles) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              pinata_api_key: '40f695910735cbbbadfb',
              pinata_secret_api_key: '2c74a87c1bae18fe0247543d3895ddd99b84bafb334633c59bda952180901c4f'
            }
          });

          const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
          this.imageUrls.push(url);
        } catch (error) {
          console.error('Error uploading file to Pinata:', error);
        }
      }
    },
    async sellItem() {
      if (!window.klaytn.selectedAddress) {
        alert("ERROR: 지갑을 연결해주세요!");
        return;
      }

      const dubuContract = new caver.klay.Contract(dubuABI, process.env.VUE_APP_DUBU_CONTRACT_ADDRESS);
      const nftContract = new caver.klay.Contract(NFTABI, process.env.VUE_APP_NFT_CONTRACT_ADDRESS);

      try {
        const gasAmountApproval = await nftContract.methods
          .setApprovalForAll(process.env.VUE_APP_DUBU_CONTRACT_ADDRESS, true)
          .estimateGas({
            from: window.klaytn.selectedAddress,
            gas: 3000000,
          });

        console.log("GasFee for approval: " + gasAmountApproval);

        await nftContract.methods
          .setApprovalForAll(process.env.VUE_APP_DUBU_CONTRACT_ADDRESS, true)
          .send({
            from: window.klaytn.selectedAddress,
            gas: gasAmountApproval,
          });

        const gasAmountAddItem = await dubuContract.methods.addItem(
          this.tokenId,
          this.hosu,
          this.agent,
          this.info,
          this.option,
          this.imageUrls
        ).estimateGas({
          from: window.klaytn.selectedAddress,
          gas: 6000000
        });

        console.log("GasFee for adding item: " + gasAmountAddItem);

        const result = await dubuContract.methods.addItem(
          this.tokenId,
          this.hosu,
          this.agent,
          this.info,
          this.option,
          this.imageUrls
        ).send({
          from: window.klaytn.selectedAddress,
          gas: gasAmountAddItem
        });

        if (result != null) {
          console.log(result);
          alert("아이템 추가에 성공하였습니다.");
        }
      } catch (error) {
        console.error(error);
        alert("아이템 추가에 실패하였습니다.");
      }
    }
  },
  mounted() {
    if (typeof window.klaytn !== 'undefined') {

    } else {
      alert("Kaikas가 설치되어 있지 않습니다. Kaikas 지갑을 설치해 주세요.");
    }
  }
};
</script>

<style scoped>
</style>
