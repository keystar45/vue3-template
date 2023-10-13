/**
 * v-clickOutside
 * 点击其他地方触发
 * 接收参数：function类型
 */
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
  __click_outside__: any;
}
// 定义局部自定义指令，这里是在 setup 标签下编写，指令名称以 v 开头，无需额外注册逻辑
const clickOutside: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    function eventHandler(e) {
      if (el.contains(e.target)) {
        return false;
      }
      // 如果绑定的参数是函数，正常情况也应该是函数，执行
      if (binding.value && typeof binding.value === "function") {
        binding.value(e);
      }
    }
    // 用于销毁前注销事件监听
    el.__click_outside__ = eventHandler;
    // 添加事件监听
    document.addEventListener("click", eventHandler);
  },
  beforeUnmount(el) {
    // 移除事件监听
    document.removeEventListener("click", el.__click_outside__);
    // 删除无用属性
    delete el.__click_outside__;
  },
};

export default clickOutside;
