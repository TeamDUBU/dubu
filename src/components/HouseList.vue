<template>
  <div>
    <h1>House List</h1>
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <li v-for="item in items" :key="item.tokenId" class="flex justify-center">
        <button @click="buttonClicked(item)" class="bg-ivory-500  rounded-md shadow-md ">
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
    ...mapState("dbInfo", ["items"]),
  },
  created() {
    this.fetchItems();
  },
  methods: {
    ...mapActions("dbInfo", ["fetchItems"]),
    buttonClicked(item) {
      this.$emit("button-click", item);
    },
  },
};
</script>

<style></style>
