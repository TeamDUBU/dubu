<template>
  <div class="home-bg">
    <div class="content">
      <img
        src="@/assets/dubu.png"
        alt="두부에 오신것을 환영합니다."
        class="centered-image"
      />
      <button @click="explore" class="explore-button bg-gray-500">
        둘러 보기
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    explore() {
      // 여기에 버튼 클릭 시 수행할 작업을 추가하세요.
      // 예: 특정 페이지로 이동
      this.$router.push("/main");
    },
  },
};
</script>

<style scoped>
.home-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background: url("@/assets/bgImg.png") no-repeat center center;
  background-size: cover;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: -300px; /* 이미지를 조금 위로 이동 */
}

.centered-image {
  margin-bottom: 20px;
  padding-bottom: 20px;
  max-width: 100%;
  height: auto;
}

.explore-button {
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.explore-button:hover {
  background-color: #2874c5;
}
</style>
