import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ETView from "../views/EstatorView.vue";
import MainView from "../views/MainView.vue";
import SellView from "../views/SellView.vue";
import TAView from "../views/TransactionView.vue";
import MainLayout from "../views/Layouts/MainLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: MainLayout,
    children:[
      {
        name: 'Home',
        path: '/',
        component: HomeView
      },
      {
        path: "/main",
        name: "MainView",
        // component: () =>
        //   import(/* webpackChunkName: "about" */ "../views/MainView.vue"),
        component : MainView,
      },
      {
        path: "/manager",
        name: "ETView",
        component: ETView,
      },
      {
        path: "/sell",
        name: "SellView",
        component: SellView,
      },
      {
        path: "/transaction",
        name: "TAView",
        component: TAView,
      },
    ]
  }
];

const router = new VueRouter({
  mode : 'history',
  routes,
});

export default router;
