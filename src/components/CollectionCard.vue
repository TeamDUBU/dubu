<template>
  <div class="bg-white">
    <div class="grid grid-cols-12"></div>
    <!-- Card View -->
    <div
      class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <div
        class="mt-6 grid cursor-pointer grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8"
      >
        <div
          v-for="(item, idx) in listedToken"
          :key="idx"
          class="group relative rounded-md border-2"
        >
          <div
            class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80"
          >
            <img
              :src="item.image"
              :alt="'TokenId : #' + item.tokenId"
              class="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div class="mt-4 flex justify-between px-4">
            <div>
              <h1 class="text-ellipsis text-sm text-gray-700 lg:text-lg">
                <span
                  @click="goNFTInfo(item.tokenId)"
                  aria-hidden="true"
                  class="absolute inset-0"
                />
                {{ item.name }}
              </h1>
              <h1 class="text-md text-start font-black text-black">
                <p>#{{ item.tokenId }}</p>
              </h1>
            </div>
          </div>
          <div v-if="!isSell" class="break-words px-4 text-left text-xl">
            <div class="py-2">
              <img
                class="float-left mr-2 mt-2 h-4 w-4 lg:mt-0 lg:h-6 lg:w-6"
                src="@/assets/logo.png"
              />
              <span
                :class="[
                  item.priceKLAY > 0
                    ? 'text-base lg:text-xl'
                    : 'text-base font-semibold text-gray-400 lg:text-xl',
                ]"
                >{{
                  item.priceKLAY > 0
                    ? item.priceKLAY / 10 ** 18 + " KLAY"
                    : "판매가 없음"
                }}</span
              >
            </div>
            <div class="py-2">
              <img
                class="float-left mr-2 mt-2 h-4 w-4 lg:mt-0 lg:h-6 lg:w-6"
                src="@/assets/logo.png"
              />
              <span
                :class="[
                  item.priceMLINK > 0
                    ? 'text-base lg:text-xl'
                    : 'text-base font-semibold text-gray-400 lg:text-xl',
                ]"
                >{{
                  item.priceMLINK > 0
                    ? item.priceMLINK / 10 ** 18 + " MLINK"
                    : "판매가 없음"
                }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { caver } from "@/utils/caver.js";
import { mapGetters, mapActions } from "vuex";
import { directive as onClickaway } from "vue-clickaway";

export default {
  directives: {
    onClickaway: onClickaway,
  },
  data() {
    return {
      listedToken: [],
      setApproval: null,
      isMenuOpen: false,
    };
  },
  components: {},
  props: {
    nftInfo: {
      type: Object,
    },
    metadataInfo: {
      type: Array,
    },
    isSell: {
      type: Boolean,
    },
    isMyShop: {
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(["getMarketABI", "getNFTABI"]),
    isConnected() {
      return this.$store.state.wallet.isConnected;
    },
    getDBInfo() {
      return this.$store.state.dbInfo.db;
    },
    nftContract() {
      return new caver.klay.Contract(
        this.getNFTABI,
        this.$route.params.NFTAddress
      );
    },
    marketContract() {
      return new caver.klay.Contract(
        this.getMarketABI,
        this.nftInfo.ContractAddress
      );
    },
  },
  methods: {
    ...mapActions(["InitPrice", "connectWallet"]),
    goNFTInfo(item) {
      this.InitPrice({
        NFTAddress: this.$route.params.NFTAddress,
      });
      if (this.isSell) {
        this.$router.push({
          name: "NFT-SellDetail",
          params: {
            TokenId: item,
          },
        });
      } else if (this.isMyShop) {
        this.$router.push({
          name: "NFT-MyShopDetail",
          params: {
            TokenId: item,
          },
        });
      } else {
        this.$router.push({
          name: "NFT-Detail",
          params: {
            TokenId: item,
          },
        });
      }
    },
    async listedTokenID() {
      let vaultData;
      let owner;
      for (let item of this.metadataInfo) {
        vaultData = this.marketContract.methods
          .vault(parseInt(item.tokenId))
          .call();
        vaultData.then(async (vault) => {
          let tokenData = {
            tokenId: item.tokenId,
            priceKLAY: vault.priceKLAY > 0 ? vault.priceKLAY : null,
            priceMLINK: vault.priceMLINK > 0 ? vault.priceMLINK : null,
            name: item.name,
            image: item.image,
            timeStamp: vault.timeStamp,
          };
          owner = await this.nftContract.methods.ownerOf(item.tokenId).call();
          if (
            this.isSell &&
            owner.toUpperCase() === window.klaytn.selectedAddress.toUpperCase()
          ) {
            this.listedToken.push(tokenData);
          }
          if (!this.isSell) {
            this.listedToken.push(tokenData);
          }
        });
      }
    },
    async listedWithNoKaikas() {
      if (this.$isMobile() || window.klaytn === undefined) {
        for (let item of this.metadataInfo) {
          let tokenData = {
            tokenId: item.tokenId,
            priceKLAY: null,
            priceMLINK: null,
            name: item.name,
            image: item.image,
            timeStamp: null,
          };
          this.listedToken.push(tokenData);
        }
      } else {
        let vaultData;
        for (let item of this.metadataInfo) {
          vaultData = this.marketContract.methods
            .vault(parseInt(item.tokenId))
            .call();
          vaultData.then(async (vault) => {
            let tokenData = {
              tokenId: item.tokenId,
              priceKLAY: vault.priceKLAY > 0 ? vault.priceKLAY : null,
              priceMLINK: vault.priceMLINK > 0 ? vault.priceMLINK : null,
              name: item.name,
              image: item.image,
              timeStamp: vault.timeStamp,
            };

            this.listedToken.push(tokenData);
          });
        }
      }
    },
    async getListedMyToken() {
      let account = this.nftInfo.NFTWalletMirn;
      let listedTokenID = null;
      let vaultData = null;
      this.listedTokenIDArr = [];

      let nftBalance = await this.nftContract.methods.balanceOf(account).call();
      for (let i = 0; i < nftBalance; i++) {
        listedTokenID = this.nftContract.methods
          .tokenOfOwnerByIndex(account, i)
          .call();
        listedTokenID.then((tokenID) => {
          vaultData = this.marketContract.methods.vault(tokenID).call();
          vaultData.then((vault) => {
            if (
              vault.owner.toUpperCase() ===
              window.klaytn.selectedAddress.toUpperCase()
            ) {
              let tokenData = {
                tokenId: tokenID,
                priceKLAY: vault.priceKLAY,
                priceMLINK: vault.priceMLINK,
                name: this.metadataInfo.find(
                  (item) => item.tokenId === parseInt(tokenID)
                ).name,
                image: this.metadataInfo.find(
                  (item) => item.tokenId === parseInt(tokenID)
                ).image,
                timeStamp: vault.timeStamp,
              };
              this.listedToken.push(tokenData);
            }
          });
        });
      }
    },
    async setApprove() {
      try {
        let estimated_gas;
        await this.nftContract.methods
          .setApprovalForAll(this.nftInfo.ContractAddress, true)
          .estimateGas({
            from: window.klaytn.selectedAddress,
            gas: 3000000,
          })
          .then((gasAmount) => {
            estimated_gas = gasAmount;
            console.log("GasFee : " + estimated_gas);
            this.nftContract.methods
              .setApprovalForAll(this.nftInfo.ContractAddress, true)
              .send({
                from: window.klaytn.selectedAddress,
                gas: estimated_gas,
              })
              .then(() => {
                this.$router.go(this.$router.currentRoute);
              });
          });
      } catch (error) {
        this.$swal.fire({
          backdrop: `rgba(0,0,123,0.4)`,
          title: "Error",
          html: "Tx 전송에 실패하였습니다.<br>Approve 버튼을 다시 눌러주세요!",
          icon: "error",
          allowOutsideClick: false,
        });
      }
    },
    async isApprove() {
      let isApprove = await this.nftContract.methods
        .isApprovedForAll(
          window.klaytn.selectedAddress,
          this.nftInfo.ContractAddress
        )
        .call();
      this.setApproval = Boolean(isApprove);
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    sortTokenWithID(isDescending) {
      if (isDescending) {
        this.listedToken.sort((nft1, nft2) =>
          parseInt(nft1.tokenId) > parseInt(nft2.tokenId)
            ? 1
            : parseInt(nft1.tokenId) < parseInt(nft2.tokenId)
            ? -1
            : 0
        );
      } //내림차순정렬
      else {
        this.listedToken.sort((nft1, nft2) =>
          parseInt(nft1.tokenId) < parseInt(nft2.tokenId)
            ? 1
            : parseInt(nft1.tokenId) > parseInt(nft2.tokenId)
            ? -1
            : 0
        );
      } //오름차순정렬
      this.closeMenu();
    },
    sortTokenWithPrice(_isDescending, _isKLAY) {
      if (_isKLAY) {
        if (_isDescending) {
          this.listedToken.sort((nft1, nft2) => {
            if (nft1.priceKLAY === null) {
              return 1;
            }
            if (nft2.priceKLAY === null) {
              return -1;
            }
            if (nft1.priceKLAY === nft2.priceKLAY) {
              return 0;
            }
            return nft1.priceKLAY / 10 ** 18 > nft2.priceKLAY / 10 ** 18
              ? 1
              : nft1.priceKLAY / 10 ** 18 < nft2.priceKLAY / 10 ** 18
              ? -1
              : 0;
          });
        } //내림차순정렬
        else {
          this.listedToken.sort((nft1, nft2) =>
            nft1.priceKLAY / 10 ** 18 < nft2.priceKLAY / 10 ** 18
              ? 1
              : nft1.priceKLAY / 10 ** 18 > nft2.priceKLAY / 10 ** 18
              ? -1
              : 0
          );
        } //오름차순정렬
      } else {
        if (_isDescending) {
          this.listedToken.sort((nft1, nft2) => {
            if (nft1.priceKLAY === null) {
              return 1;
            }
            if (nft2.priceKLAY === null) {
              return -1;
            }
            if (nft1.priceKLAY === nft2.priceKLAY) {
              return 0;
            }
            return nft1.priceMLINK / 10 ** 18 > nft2.priceMLINK / 10 ** 18
              ? 1
              : nft1.priceMLINK / 10 ** 18 < nft2.priceMLINK / 10 ** 18
              ? -1
              : 0;
          });
        } //내림차순정렬
        else {
          this.listedToken.sort((nft1, nft2) =>
            nft1.priceMLINK / 10 ** 18 < nft2.priceMLINK / 10 ** 18
              ? 1
              : nft1.priceMLINK / 10 ** 18 > nft2.priceMLINK / 10 ** 18
              ? -1
              : 0
          );
        } //오름차순정렬
      }
      this.closeMenu();
    },
  },
  mounted() {
    if (window.klaytn !== undefined) this.isApprove();
    if (this.isConnected) {
      if (this.isMyShop) {
        this.getListedMyToken();
      } else {
        this.listedTokenID();
      }
    }
    if (!this.isConnected && !this.isMyShop && !this.isSell) {
      this.listedWithNoKaikas();
    }
  },
};
</script>

<style></style>
