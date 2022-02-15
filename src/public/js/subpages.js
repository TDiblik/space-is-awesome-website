function MenuIconClick() {
  var menu_icon_elem = document.getElementById("menu-icon-identifier");
  if (menu_icon_elem.classList.contains("active")) {
    menu_icon_elem.classList.remove("active");
  } else {
    menu_icon_elem.classList.add("active");
  }

  var children = menu_icon_elem.children;
  for (var i = 0; i < children.length; i++) {
    children[i].classList.remove("no-animation");
  }
}
