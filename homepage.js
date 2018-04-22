$(document).ready(function () {
  let windowWidth = $(window).width();
  let windowHeight = $(window).height();

  $("#whatlist").css("height", windowHeight - 240 + "px");
  $("#nolist").css("height", windowHeight - 240 + "px");
  $(window).mousemove(function() {
    windowHeight = $(window).height();
    $("#whatlist").css("height", windowHeight - 240 + "px");
    $("#nolist").css("height", windowHeight - 240 + "px");
  });
  $("#trending").click(function() {
    console.log("trending");
    $("#whatlist").css("width", "300px");
    $("#nolist").css("width", "0px");
  })
  $("#suggestions").click(function() {
    console.log("suggestions");
    $("#nolist").css("width", "300px");
    $("#whatlist").css("width", "0px");
  })
});
