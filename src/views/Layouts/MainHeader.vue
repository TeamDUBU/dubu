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
          <!-- Launchpad DropDown Menu -->
          <li
            @mouseenter="isLaunchpadOpen = true"
            @mouseleave="isLaunchpadOpen = false"
          >
            <div class="inline-block text-left text-gray-800">
              <div>
                <span class="rounded-md shadow-sm">
                  <button
                    type="button"
                    class="focus:shadow-outline-blue btn-focus inline-flex h-10 w-full items-center justify-between rounded-md bg-gray-200 px-0 py-4 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out hover:text-gray-500 focus:border-blue-300 focus:outline-none active:text-gray-800"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    <span
                      class="text-sm font-semibold text-gray-800 hover:text-blue-400 lg:text-xl"
                      >런치패드
                    </span>
                    <img
                      src="https://s.svgbox.net/hero-solid.svg?ic=chevron-down&fill=grey-800"
                      class="-mr-1 ml-2 h-5 w-5"
                    />
                  </button>
                </span>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="isLaunchpadOpen"
                  class="absolute right-24 z-20 mt-2 w-60 overflow-hidden rounded-md border text-sm shadow-lg lg:right-52"
                >
                  <div
                    class="shadow-xs self-center rounded-md bg-white"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div class="border-t border-gray-100"></div>
                    <div class="mx-2 py-1">
                      <div
                        class="flex cursor-not-allowed items-center space-x-2 p-4"
                      >
                        <i
                          class="fa-solid fa-sack-dollar mx-2 text-xl"
                          style="color: #ddb965"
                        ></i
                        ><span class="text-base">Artist Auction</span>
                      </div>
                      <div class="border-t border-gray-100"></div>
                      <div
                        class="flex cursor-not-allowed items-center space-x-2 p-4"
                      >
                        <i
                          class="fa-solid fa-gift mx-2 text-xl"
                          style="color: #b74e4e"
                        ></i
                        ><span class="text-base">Project Minting</span>
                      </div>
                      <div class="border-t border-gray-100"></div>
                      <div
                        class="flex cursor-not-allowed items-center space-x-2 p-4"
                      >
                        <i
                          class="fa-solid fa-clover mx-2 text-xl"
                          style="color: #2dc62a"
                        ></i
                        ><span class="text-base">LUCKY Draw</span>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </li>
          <!-- DropDown Menu -->
          <li @mouseenter="isMenuOpen = true" @mouseleave="isMenuOpen = false">
            <div class="inline-block text-left text-gray-800">
              <div>
                <span class="rounded-md shadow-sm">
                  <button
                    type="button"
                    class="focus:shadow-outline-blue btn-focus inline-flex h-10 w-full items-center justify-between rounded-md bg-gray-200 px-0 py-4 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out hover:text-gray-500 focus:border-blue-300 focus:outline-none active:text-gray-800"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    <span
                      class="text-sm font-semibold text-gray-800 hover:text-blue-400 lg:text-xl"
                      >더보기
                    </span>
                    <img
                      src="https://s.svgbox.net/hero-solid.svg?ic=chevron-down&fill=grey-800"
                      class="-mr-1 ml-2 h-5 w-5"
                    />
                  </button>
                </span>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="isMenuOpen"
                  class="absolute right-24 z-20 mt-2 w-60 overflow-hidden rounded-md border text-sm shadow-lg"
                >
                  <div
                    class="shadow-xs self-center rounded-md bg-white"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div class="border-t border-gray-100"></div>
                    <div class="mx-2 py-1">
                      <a
                        target="_blank"
                        class="flex cursor-pointer items-center space-x-2 p-4 text-indigo-500 underline"
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdiuXVmvvoI3rSDccpeF50pRPELe3tGUOpth4aToOpFJ_5YMw/viewform"
                        >!! LINKER 리스팅 및 지원 문의 !!
                      </a>
                      <div class="border-t border-gray-100"></div>
                      <div
                        class="flex cursor-not-allowed items-center space-x-2 p-4"
                      >
                        <i
                          class="fa-solid fa-bullhorn mx-2 text-xl"
                          style="color: #eb5854"
                        ></i
                        ><span class="text-base">공지사항</span>
                      </div>
                      <div class="border-t border-gray-100"></div>
                      <div
                        class="flex cursor-not-allowed items-center space-x-2 p-4"
                      >
                        <i
                          class="fa-regular fa-handshake mx-1 text-xl"
                          style="color: #0"
                        ></i
                        ><span class="text-base">파트너십</span>
                      </div>
                      <div class="border-t border-gray-100"></div>
                      <div
                        class="flex cursor-not-allowed items-center space-x-2 p-4"
                      >
                        <i
                          class="fa-solid fa-book mx-2 text-xl"
                          style="color: #427276"
                        ></i
                        ><span class="text-base">사용자가이드</span>
                      </div>
                      <div class="border-t border-gray-100"></div>
                      <!-- Twitter, Medium, Discord, gitBook -->
                      <div class="flex">
                        <div class="w-1/3 text-center">
                          <a
                            target="_blank"
                            href="https://twitter.com/MitroxToken"
                          >
                            <i
                              class="fa-brands fa-square-twitter cursor-pointer text-xl"
                              style="color: #00acee"
                            ></i
                          ></a>
                        </div>
                        <div class="w-1/3 text-center">
                          <a
                            target="_blank"
                            href="https://medium.com/@mitroxtoken"
                          >
                            <i
                              class="fa-brands fa-medium mx-2 cursor-pointer text-xl"
                              style="color: #0"
                            ></i
                          ></a>
                        </div>
                        <div class="w-1/3 text-center">
                          <a
                            target="_blank"
                            href="https://discord.gg/4Am9R6rgzN"
                          >
                            <i
                              class="fa-brands fa-discord mx-2 cursor-pointer text-xl"
                              style="color: #5864f6"
                            ></i
                          ></a>
                        </div>
                        <div class="w-1/3 cursor-not-allowed text-center">
                          <i
                            class="fa-regular fa-file-lines mx-2 cursor-not-allowed text-xl"
                          ></i>
                          <!-- <a
                            target="_blank"
                            href="https://medium.com/@mitroxtoken"
                          >
                            <i
                              class="fa-regular fa-file-lines mx-2 cursor-not-allowed text-xl"
                            ></i
                          ></a> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
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
      isLaunchpadOpen: false,
      showMenu: false,
      items: [
        {
          name: "구매",
          link: "/transaction",
        },
        {
          name: "나의 NFT",
          link: "/MyShop",
        },
        {
          name: "스테이킹",
          link: "",
        },
      ],
      searchItem: "",
    };
  },
  computed: {
    getWallet() {
      return this.$store.state.wallet.address.substr(0, 4) + "...." + this.$store.state.wallet.address.substr(-4);
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
    closeLaunchpad() {
      this.isLaunchpadOpen = false;
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

<style>
</style>