import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: (_) => {
      return { path: "/login" };
    },
  },
  {
    path: "/login",
    name: "HelloWorld",
    component: () => import("@/views/Login.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(""),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      el: "#app",
      top: 0,
      behavior: "smooth",
    };
  },
});
export default router;
