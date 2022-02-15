function MenuIconClick() {
  var main_container = document.getElementsByClassName("main-container")[0];
  var background_image = document.getElementsByClassName("background-image")[0];
  var menu = document.getElementsByClassName("menu")[0];
  var menu_icon_elem = document.getElementById("menu-icon-identifier");

  if (!menu_icon_elem.classList.contains("active")) {
    menu_icon_elem.classList.add("active");

    main_container.classList.remove("closing-anim");
    main_container.classList.add("blur");
    background_image.classList.remove("closing-anim");
    background_image.classList.add("blur");

    menu.classList.add("active");
  } else {
    menu_icon_elem.classList.remove("active");

    main_container.classList.add("closing-anim");
    main_container.classList.remove("blur");
    background_image.classList.add("closing-anim");
    background_image.classList.remove("blur");

    menu.classList.remove("active");
  }

  var children = menu_icon_elem.children;
  for (var i = 0; i < children.length; i++) {
    children[i].classList.remove("no-animation");
  }
}

function Redirect(url) {
  document.body.classList.add("redirecting");
  setTimeout(function () {
    window.location.href = url;
  }, 1100);
}
