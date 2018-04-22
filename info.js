$(document).ready(function () {
  let yes = $("#img").height < $("#img").width
  let windowWidth = $(window).width();
  let windowHeight = $(window).height();
  let imgArr = ["pexels-photo-531872.jpg", "pexels-photo-707915.jpg", "pexels-photo.jpg", "beach.jpg", "village.jpg"];
  let rand = Math.floor(Math.random() * 5);
  $("#img").attr("src",imgArr[rand]);
  console.log("Ya Yeet");
  $("#img").css("height", windowHeight + "px")
  $(window).mousemove(function() {
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    if(yes){
      $("#img").css("width", windowWidth + "px");
    }else{
      $("#img").css("height", windowHeight + "px");
    }
  });
});
