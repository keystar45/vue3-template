export const getColorVar = (name: string, theme?: "dark" | "light") => {
  const styles = getComputedStyle(document.querySelector("html") as any);
  return styles
    .getPropertyValue(`--${theme ? theme : "color"}--${name}`)
    .trim();
};

export const getTextWidth = (text: string, fontSize?: string) => {
  let calcSpan: HTMLSpanElement | null =
    document.querySelector("#base-calc-span");
  if (!calcSpan) {
    calcSpan = document.createElement("span");
    calcSpan.style.visibility = "hidden";
    calcSpan.style.position = "absolute";
    calcSpan.style.top = "-9999px";
    calcSpan.id = "base-calc-span";
    document.body.appendChild(calcSpan);
  }
  calcSpan.style.fontSize = fontSize || "12px";
  calcSpan.textContent = text;
  const width = Math.ceil(calcSpan.getBoundingClientRect().width);
  calcSpan.textContent = "";
  return width;
};
