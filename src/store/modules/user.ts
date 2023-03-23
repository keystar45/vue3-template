import { defineStore } from "pinia";

const useStore = defineStore("user", {
  // 相当于data
  state: () => {
    return {
      userName: "uuuuuuu",
      token: "",
    };
  },
  // 相当于计算属性
  getters: {},
  actions: {
    setUserName(name: string) {
      this.userName = name;
    },
    setToken(token: string) {
      this.token = token;
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
