<template>
  <div>
    <h1>House List</h1>
    <ul>
      <li v-for="item in items" :key="item.tokenId">
        <button @click="buttonClicked(item)">
          Token ID: {{ item.tokenId }}, Hosu: {{ item.hosu }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'HouseList',
  computed: {
    ...mapState('dbInfo', ['items'])
  },
  created() {
    this.fetchItems();
  },
  methods: {
    ...mapActions('dbInfo', ['fetchItems']),
    buttonClicked(item) {
      this.$emit("button-click", item);
    },
  }
};
</script>

<style></style>
