var queryAll = (element) => document.querySelectorAll(element);
var documentEvent = (evt, fn) => document.addEventListener(evt, fn);
export {
  queryAll,
  documentEvent
};
