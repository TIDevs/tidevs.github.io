$(document).ready(function () {
  let windowWidth = $(window).width();
  let windowHeight = $(window).height();
  $("#nolist").css("height", windowHeight - 195 + "px");
  $(window).mousemove(function() {
    windowHeight = $(window).height();
    $("#nolist").css("height", windowHeight - 195 + "px");
  });
});
