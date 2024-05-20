<template>
  <div class="flex">
    <item-list
      v-if="!showCustomerInfo"
      class="w-[50%] h-screen flex justify-center border-2 border-black"
      @button-click="goToItemInfo"
    />
    <customer-info
      v-else
      class="w-[50%] h-screen flex justify-center border-2 border-black"
    />

    <customer-list
      v-if="!showItemInfo"
      class="w-[50%] h-screen border-2 border-black"
      @button-click="goToCustomerInfo"
    />
    <item-info v-else class="w-[50%] h-screen border-2 border-black" />
  </div>
</template>

<script>
import ItemList from "@/components/ItemList.vue";
import CustomerList from "@/components/CustomerList.vue";
import ItemInfo from "@/components/ItemInfo.vue";
import CustomerInfo from "@/components/CustomerInfo.vue";

export default {
  components: {
    ItemList,
    CustomerList,
    ItemInfo,
    CustomerInfo,
  },
  data() {
    return {
      showItemInfo: false,
      showCustomerInfo: false,
    };
  },
  methods: {
    goToItemInfo() {
      this.showItemInfo = !this.showItemInfo;
    },
    goToCustomerInfo() {
      this.showCustomerInfo = !this.showCustomerInfo;
    },
  },
};
</script>

<style></style>
