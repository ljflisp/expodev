var queryAll = (element) => document.querySelectorAll(element);
var documentEvent = (evt, fn) => document.addEventListener(evt, fn);
var insertHtml = (options) => {
  const { str, label, pos = "afterbegin", parent = "body", fn, isNormal = false } = options || {};
  let data = str.split(" ");
  if (/\|/.test(str))
    data = data.map((s) => s.split("|"));
  const Z = (fn2) => data.map(fn2).join("");
  document.querySelector(parent)?.insertAdjacentHTML(pos, isNormal ? str : `<${label}>${Z(fn)}</${label}>`);
};
var splitMapWord = (options) => {
  let { word, separator = "", fn, joinStr = "" } = options;
  return word.split(separator).map(fn).join(joinStr);
};
var upper = (str) => str.toUpperCase();
var quickSetStyle = (selector, styleObj) => {
  const elements = document.querySelectorAll(selector);
  if (!elements.length)
    return;
  elements.forEach((element) => {
    const el = element;
    for (const key in styleObj) {
      if (styleObj[key] !== undefined) {
        el.style[key] = styleObj[key];
      }
    }
  });
};
export {
  upper,
  splitMapWord,
  quickSetStyle,
  queryAll,
  insertHtml,
  documentEvent
};
