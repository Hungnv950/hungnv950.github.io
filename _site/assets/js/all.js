jQuery(document).ready(function($){
    // todo: jquery stuff should need to put here.
    var header = document.getElementById("header-links");
    var sticky = header.offsetTop;
    function myFunction() {
      if (window.pageYOffset > sticky) {
          header.classList.add("sticky-header");
      } else {
          header.classList.remove("sticky-header");
      }
    }
    window.onscroll = function() {myFunction()};
});

