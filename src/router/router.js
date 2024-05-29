import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ETView from "../views/EstatorView.vue";
import MainView from "../views/MainView.vue";
import SellView from "../views/SellView.vue";
import TAView from "../views/TransactionView.vue";
import MainLayout from "../views/Layouts/MainLayout.vue";

const HouseInfo = () => import("@/components/HouseInfo");
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
        name: "main",
        component: MainView,
        children: [
          {
            name: "House-Detail",
            path: ":TokenId/:Hosu",
            component: HouseInfo,
          },
          // {
          //   path: "",
          //   component: MainView,
          // },
        ],
      },
      {
        path: "/sell",
        name: "sell",
        component: SellView,
      },
      {
        path: "/manage",
        name: "manage",
        component: ETView,
      },
    ],
  },
  {
    path: "/transaction",
    name: "trans",
    component: TAView,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
