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
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode : 'history',
  routes,
});

export default router;
