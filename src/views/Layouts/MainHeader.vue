<template>
  <div class="fixed top-0 left-0 right-0 z-50">
    <div class="bg-gray-200">
      <nav class="mx-0 py-2 md:flex md:items-center md:justify-between">
        <div class="flex items-center justify-between">
          <router-link to="/">
            <img class="mx-4 h-10" src="@/assets/logo.png"
          /></router-link>
          <!-- Mobile menu button -->
          <div @click="showMenu = !showMenu" class="flex md:hidden">
            <button
              type="button"
              class="mx-4 text-gray-800 hover:text-gray-400 focus:text-gray-400 focus:outline-none"
            >
              <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <!-- Search Tab -->
        <!-- <div>
            <input type="text" placeholder="Search NFTs"
            :value="searchItem" @input="searchItem = $event.target.value"
            @keyup.enter="search(searchItem)"
            class="bg-gray-200 rounded-xl border-gray-50 border-2 px-10 "/>
          </div> -->

        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <ul
          :class="showMenu ? 'flex' : 'hidden'"
          class="mt-8 flex-col space-y-4 md:mt-0 md:flex md:flex-row md:items-center md:space-y-0 md:space-x-8"
        >
          <!-- Nav Menu -->
          <li
            v-for="item in items"
            :key="item.name"
            class="text-sm font-semibold text-gray-800 hover:text-blue-400 lg:text-xl"
          >
            <router-link :to="{ path: item.link }">{{ item.name }}</router-link>
          </li>

          <li>
            <div
              @click="connectWallet"
              v-if="!isConnected"
              class="cursor-pointer rounded-xl bg-gray-100 p-2 hover:bg-gray-300 hover:text-blue-400"
            >
              <p class="px-4">Connect Wallet</p>
            </div>
            <div v-else>
              <span> {{ getWallet }}</span>
              <i
                class="fa-solid fa-cart-shopping mx-8 cursor-not-allowed text-xl"
              ></i>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isMenuOpen: false,
      showMenu: false,
      items: [
        {
          name: "사기",
          link: "/main",
        },
        {
          name: "팔기",
          link: "/sell",
        },
        {
          name: "공인중개사",
          link: "/manage",
        },
      ],
      searchItem: "",
    };
  },
  computed: {
    getWallet() {
      return (
        this.$store.state.wallet.address.substr(0, 4) +
        "...." +
        this.$store.state.wallet.address.substr(-4)
      );
    },
    isConnected() {
      return this.$store.state.wallet.isConnected;
    },
  },
  methods: {
    ...mapActions(["connectWallet"]),
    closeMenu() {
      this.isMenuOpen = false;
    },
    // search(searchItem) {
    //     this.$router.push({
    //       name: "SearchPage",
    //       params: {
    //         keyword: this.searchItem,
    //       },
    //     });
    //     this.searchItem = ''
    //     console.log('"',searchItem,'"' + ' 검색')
    // },
  },
  created() {
    this.connectWallet();
  },
};
</script>

<style></style>
