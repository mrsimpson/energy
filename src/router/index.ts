import { createRouter, createWebHistory } from "vue-router";
import CalculatorView from "@/views/CalculatorView.vue";
import IntroView from "@/views/IntroView.vue";
import ImprintView from "@/views/ImprintView.vue"
import DataProtectionView from '@/views/DataProtectionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "intro",
      component: IntroView,
    },
    {
      path: "/calculator",
      name: "calculator",
      component: CalculatorView,
    },
    {
      path: "/imprint",
      name: "imprint",
      component: ImprintView,
    },
    {
      path: "/data-protection",
      name: "data-protection",
      component: DataProtectionView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
