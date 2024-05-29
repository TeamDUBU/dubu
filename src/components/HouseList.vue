<template>
  <div>
    <h1>House List</h1>
    <ul>
      <li v-for="item in items" :key="item.tokenId">
        <button @click="goNFTInfo(item)">
          Token ID: {{ item.tokenId }}, Hosu: {{ item.hosu }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "HouseList",
  computed: {
    ...mapState("dbInfo", ["items", "list"]),
  },
  created() {
    this.fetchItems();
  },
  methods: {
    ...mapActions("dbInfo", ["fetchItems"]),
    goNFTInfo(item) {
      this.$router.push({
        name: "House-Detail",
        params: {
          TokenId: item.tokenId,
          Hosu: item.hosu,
        },
      });
    },
  },
};
</script>

<style></style>
