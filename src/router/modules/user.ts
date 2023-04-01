import { RouteRecordRaw } from "vue-router";

const UserRouter: Array<RouteRecordRaw> = [
  {
    path: "/user/list",
    name: "taskDistributingCreate",
    component: () => import("@/views/user/index.vue"),
    meta: {
      icon: "task/task-list.png",
      activeIcon: "task/task-list.png",
      title: "用户",
    },
  },
];

export default UserRouter;
