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
export {
  queryAll,
  insertHtml,
  documentEvent
};
