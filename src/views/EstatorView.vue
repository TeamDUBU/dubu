<template>
  <div class="">
    <h1 class="text-3xl">This is an Estator page</h1>
    <item-list />
    <customer-list />
    <item-info />
    <customer-info />
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
};
</script>

<style></style>
