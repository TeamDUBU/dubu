<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75"
  >
    <div
      class="relative bg-white p-6 rounded-lg shadow-lg"
      style="width: 500px"
    >
      <button
        type="button"
        @click="closeModal"
        class="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
      >
        X
      </button>
      <h2 class="text-xl font-semibold mb-4">공인중개사 정보 등록</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4 w-full flex justify-center">
          <input
            v-model="name"
            type="text"
            id="name"
            placeholder="이름"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            style="width: 350px"
            required
          />
        </div>
        <div class="mb-4 w-full flex justify-center">
          <input
            v-model="number"
            type="text"
            id="number"
            placeholder="공인중개사 자격증 번호"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            style="width: 350px"
            required
          />
        </div>
        <div class="mb-4 w-full flex justify-center">
          <label
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm font-medium text-gray-700"
            style="width: 350px"
            >{{ walletAddress }}</label
          >
        </div>
        <div class="mb-4 w-full flex justify-center">
          <div class="flex items-center" style="width: 350px">
            <input
              v-model="agree"
              type="checkbox"
              id="agree"
              class="mr-2"
              required
            />
            <label for="agree" class="text-sm font-medium text-gray-700"
              >개인정보 활용에 동의합니다</label
            >
          </div>
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="bg-sky-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            style="width: 350px"
          >
            인증하기
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      number: "",
    };
  },
  computed: {
    ...mapState("signIn", ["isModalOpen"]),
    ...mapState({
      walletAddress: (state) => state.wallet.address,
    }),
  },
  methods: {
    ...mapActions("signIn", ["closeModal", "submitUserInfo"]),
    submitForm() {
      this.submitUserInfo({ name: this.name, number: this.number });
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
