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
            <a
              v-if="item.name === '공인중개사'"
              href="#"
              @click.prevent="checkQualification(item.link)"
              >{{ item.name }}</a
            >
            <router-link v-else :to="{ path: item.link }">{{
              item.name
            }}</router-link>
          </li>

          <li>
            <div
              @click="connectWallet"
              v-if="!this.$store.state.wallet.isConnected"
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
import { mapActions, mapState } from "vuex";
import { DUBU } from "@/utils/caver.js";
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
      addAgent: [],
    };
  },
  computed: {
    ...mapState("dbInfo", ["agents"]),
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
    ...mapActions("dbInfo", ["fetchManageLists"]),
    ...mapActions(["connectWallet"]),
    closeMenu() {
      this.isMenuOpen = false;
    },

    async checkQualification(link) {
      if (this.isQualified()) {
        this.$router.push(link);
      } else {
        const result = await this.$swal.fire({
          backdrop: `rgba(0,0,123,0.4)`,
          title: "공인중개사 등록을 하시겠습니까?",
          text: "두부와 함께하세요!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "등록 하기",
          cancelButtonText: "닫기",
          allowOutsideClick: false,
        });

        if (result.isConfirmed) {
          this.addAgent.push(window.klaytn.selectedAddress);

          const steps = [
            {
              title: "정보 작성 (1 / 5)",
              text: "이름을 입력 해주세요.",
              placeholder: "이름을 입력해보세요",
              type: "text",
            },
            {
              title: "정보 작성 (2 / 5)",
              text: "사무실을 입력 해주세요.",
              placeholder: "회사 주소를 입력해보세요",
              type: "text",
            },
            {
              title: "정보 작성 (3 / 5)",
              text: "자격 번호를 입력 해주세요.",
              placeholder: "자격 번호를 입력해보세요",
              type: "number",
            },
            {
              title: "정보 작성 (4 / 5)",
              text: "연락처를 입력 해주세요.",
              placeholder: "연락처를 입력해보세요",
              type: "text",
            },
            {
              title: "정보 작성 (5 / 5)",
              text: "자격 취득 날짜를 입력 해주세요.",
              placeholder: "자격 취득 날짜를 입력해보세요",
              type: "text",
            },
          ];

          for (const step of steps) {
            const { value: inputValue } = await this.$swal.fire({
              backdrop: `rgba(0,0,123,0.4)`,
              title: step.title,
              text: step.text,
              icon: "warning",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "다음",
              cancelButtonText: "닫기",
              showCancelButton: false,
              allowOutsideClick: false,
              input: step.type,
              inputPlaceholder: step.placeholder,
              preConfirm: (inputValue) => {
                if (!inputValue) {
                  this.$swal.showValidationMessage(`${step.placeholder}`);
                }
                return inputValue;
              },
            });

            if (!inputValue) {
              return; // 입력값이 없으면 등록을 중지합니다.
            }
            this.addAgent.push(inputValue);
          }
          this.$swal
            .fire({
              backdrop: `rgba(0,0,123,0.4)`,
              title: "공인중개사 등록을 하시겠습니까?",
              text: "두부와 함께하세요!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "등록 하기",
              cancelButtonText: "닫기",
              allowOutsideClick: false,
            })
            .then((result) => {
              if (result.isConfirmed) {
                DUBU.methods
                  .addAgent(
                    this.addAgent[0],
                    this.addAgent[1],
                    this.addAgent[2],
                    this.addAgent[3],
                    this.addAgent[4],
                    this.addAgent[5]
                  )
                  .send({
                    from: window.klaytn.selectedAddress,
                    gas: 3000000,
                  })
                  .then((receipt) => {
                    if (receipt) {
                      this.$router.push("/manage");
                    }
                  });
              } else this.addAgent = [];
            });
        }
      }
    },
    isQualified() {
      const exists = this.agents.some(
        (agent) =>
          agent.account.toUpperCase() ===
          window.klaytn.selectedAddress.toUpperCase()
      );
      return exists;
    },
  },
  created() {
    this.fetchManageLists();
    this.connectWallet().then(() => {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      });
      if (window.klaytn === undefined) {
        Toast.fire({
          icon: "warning",
          title: "지갑이 연결되지 않았습니다.",
          text: "Chrome에서 카이카스 지갑 설치후 사용하실수 있습니다",
        });
      } else {
        if (!this.$store.state.wallet.isConnected) {
          Toast.fire({
            icon: "warning",
            title: "지갑이 연결되지 않았습니다.",
            text: "Chrome에서 카이카스 지갑 설치후 사용하실수 있습니다!!",
          });
        }
      }
    });
  },
};
</script>

<style></style>
