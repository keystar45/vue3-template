//兼容火狐 获取event方法
function getEvent() {
  if (window.event) {
    return window.event;
  }
  let func = getEvent.caller;
  while (func != null) {
    const arg0 = func.arguments[0];
    if (arg0) {
      if (
        arg0.constructor == Event ||
        arg0.constructor == MouseEvent ||
        arg0.constructor == KeyboardEvent ||
        (typeof arg0 == "object" && arg0.preventDefault && arg0.stopPropagation)
      ) {
        return arg0;
      }
    }
    func = func.caller;
  }
  return null;
}

//阻止冒泡到下一个事件
export function stopPropagations() {
  const ev = getEvent();
  if (window.event) {
    ev.cancelBubble = true;
  } else if (ev.preventDefault) {
    ev.stopPropagation(); //阻止冒泡
  }
}
