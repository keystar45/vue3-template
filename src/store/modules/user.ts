import { defineStore } from "pinia";

const useStore = defineStore("user", {
  // 相当于data
  state: () => {
    return {
      userName: "uuuuuuu",
    };
  },
  // 相当于计算属性
  getters: {},
  actions: {
    updateUserName(name) {
      this.userName = name;
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        key: "userInfo", //设置存储的key
        storage: localStorage, //表示存储在localStorage
      },
    ],
  },
});

export default useStore;
