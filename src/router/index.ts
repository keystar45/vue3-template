import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

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
    path: "/maintenance",
    name: "maintenance",
    component: () => import("@/views/maintenance/index.vue"),
    meta: {
      title: "产品超市运维",
    },
  },
  {
    path: "/productSupermarket",
    name: "productSupermarket",
    redirect: "/productSupermarket/list",
    component: () => import("@/views/product-supermarket/index.vue"),
    meta: {
      title: "产品超市列表",
      keepAlive: true,
    },
    children: [
      {
        path: "/productSupermarket/list",
        name: "productSupermarketList",
        component: () => import("@/views/product-supermarket/List.vue"),
        meta: {
          "zh-CN": "产品超市列表",
          "en-US": "Data Directory List",
          keepAlive: true,
        },
      },
      {
        path: "/productSupermarket/detail",
        name: "productSupermarketDetail",
        component: () => import("@/views/product-supermarket/Detail.vue"),
        meta: {
          "zh-CN": "表详情",
          "en-US": "Table Details",
        },
      },
    ],
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
export default router;
