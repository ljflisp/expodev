document.addEventListener("click", function (e) {
  let target = e.target.closest("a");
  if (target) {
    e.preventDefault();
  }
});