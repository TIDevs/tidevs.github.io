$(document).ready(function () {
  $("#sign_button").click(function() {
    // $("InputPassword1").val().equiv("") ||
    if($("#InputPassword1").val()!=$("#InputPassword2").val()){
      $("#m_alert").css("visibility", "visible");
    }
  })
  $("#close").click(function() {
    $("#m_alert").css("visibility", "hidden");
  })
});
