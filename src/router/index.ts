import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import UserRouter from "./modules/user";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/user",
    redirect: "/user/list",
    name: "taskDistributing",
    component: () => import("@/layout/NormalLayout.vue"),
    children: UserRouter,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      el: "#app",
      top: 0,
      behavior: "smooth",
    };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

export default router;

// 左侧菜单配置
export const RouterMenus = {
  "/user": UserRouter,
};
