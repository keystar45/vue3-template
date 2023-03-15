// import directives
import { App } from "vue";
import copy from "./modules/copy";
import debounce from "./modules/debounce";
import throttle from "./modules/throttle";
import clickOutside from "./modules/clickOutSide";

const directivesList: any = {
  // Custom directives
  copy,
  debounce,
  throttle,
  clickOutside,
};

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      // 注册自定义指令
      app.directive(key, directivesList[key]);
    });
  },
};

export default directives;
