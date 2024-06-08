import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ETView from "../views/EstatorView.vue";
import MainView from "../views/MainView.vue";
import SellView from "../views/SellView.vue";
import TAView from "../views/TransactionView.vue";
import MainLayout from "../views/Layouts/MainLayout.vue";
import Success from "../views/TransSuccess.vue";
import Fail from "../views/TransFail.vue";

const HouseInfo = () => import("@/components/HouseInfo");
const HouseList = () => import("@/components/HouseList");
const SellList = () => import("@/components/SellList");
const SellInfo = () => import("@/components/SellInfo");
const ItemList = () => import("@/components/ItemList");
const ItemInfo = () => import("@/components/ItemInfo");
const CheckOut = () => import("@/components/CheckOut");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "Home",
        component: HomeView,
      },
      {
        path: "/main",
        // name: "main",
        component: MainView,
        children: [
          {
            name: "House-Detail",
            path: ":TokenId/:Hosu",
            component: HouseInfo,
          },
          {
            path: "",
            component: HouseList,
          },
        ],
      },
      {
        path: "/sell",
        // name: "sell",
        component: SellView,
        children: [
          {
            name: "Sell-Detail",
            path: ":TokenId",
            component: SellInfo,
          },
          {
            path: "",
            component: SellList,
          },
        ],
      },
      {
        path: "/manage",
        // name: "manage",
        component: ETView,
        children: [
          {
            name: "Item-Detail",
            path: ":TokenId",
            component: ItemInfo,
          },
          {
            path: "",
            component: ItemList,
          },
        ],
      },
      {
        // name: "CheckOut",
        path: "/transaction",
        component: TAView,
        children: [
          {
            name: "CheckOut-View",
            path: ":TokenId/:Hosu",
            component: CheckOut,
          },
        ],
      },
      {
        // name: "Success",
        path: "/success",
        component: Success,
        children: [
          {
            name: "Success-View",
            path: ":TokenId/:Hosu",
            component: Success,
          },
        ],
      },
      {
        name: "Fail",
        path: "/fail",
        component: Fail,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
