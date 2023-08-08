import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/choosenProducts",
      name: "login",
      component: () => import("../views/ChoosenProdView.vue"),
    },
    {
      path: "/shoppingCart",
      name: "shoppingCart",
      component: () => import("../views/ShoppingCartView.vue"),
    },
    {
      path: "/shop/:id",
      name: "SingleView",
      component: () => import("../views/SingleView.vue"),
    },
    {
      path: "/category/:id",
      name: "category",
      component: () => import("../views/CategoryPage.vue"),
    },

    {
      path: "/:pathMatch(.*)*",
      name: "undefinedPage",
      component: () => import("../views/404PageView.vue"),
    },
  ],
});

export default router;
