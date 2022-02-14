function explore_it_onclick() {
  // TODO: code lol
  document.getElementById("rocket-transition-element").classList = "active";
  document.getElementById("rocket-transition-ground").classList = "active";
  setTimeout(function () {
    window.location.href = "./subpages/Nasa.html";
  }, 3600); // When changing rocket animation time, please change it here as well
}
