$(function() {
  $("body")
    .on("input propertychange", ".form-item", function(e) {
      $(this).toggleClass("form-item-filled", !!$(e.target).val());
    })
    .on("focus", ".form-item", function() {
      $(this).addClass("form-item-focused");
    })
    .on("blur", ".form-item", function() {
      $(this).removeClass("form-item-focused");
    });
});

/*
$(function(){
  $("#top").click(function(){
    $("#top").addClass("active");
    $("#portfolio").removeClass("active");
    $("#contact").removeClass("active")
  });
  $("#portfolio").click(function(){
    $("#top").removeClass("active");
    $("#portfolio").addClass("active");
    $("#contact").removeClass("active")
  });
  $("#contact").click(function(){
    $("#top").removeClass("active");
    $("#portfolio").removeClass("active");
    $("#contact").addClass("active")
  });
});
*/

$(function() {
  var selector = "#navigation li";

  $(selector).on("click", function() {
    $(selector).removeClass("active");
    $(this).addClass("active");
  });
});

$(function(){
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
});
