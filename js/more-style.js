$(document).ready(function(){
  //滚动banner
  var n = 1;
  var flag = false;
  $("ul.posters>li:first-child").siblings().css("left","100%");
  $("ul.scrollbar>li:first-child").css("background-color","#000");
  setInterval(function(){
    scrollbanner();
    n++;
    if(n == 5) n = 1;
  },7500);
  var scrollbanner = function(){
    if((n-1) == 0)
    $("ul.posters>li:nth-child("+4+")").animate({left:"100%"},"normal");
    else
    $("ul.posters>li:nth-child("+(n-1)+")").animate({left:"100%"},"normal");
    $("ul.posters>li:nth-child("+n+")").animate({left:"0%"},"normal");
    $("ul.scrollbar>li:nth-child("+n+")").css("background-color","#000");
    $("ul.scrollbar>li:nth-child("+n+")").siblings("li").css("background-color","#fff");
  }
  //点击切换banner
  $("ul.scrollbar li").click(function(){
    n = $(this).data("value");
    $("ul.posters>li:nth-child("+n+")").siblings().css("left","100%");
    scrollbanner();
  });

  //评论区字数限制
  $("#video-present").keyup(function(){
    var text_num = $("#video-present").val().length;
    if(text_num <= 200){
      $(".letter-cnt").text(text_num+"/200");
    }
    else {
      var ex_comment = $("#video-present").val().substr(0,200);
      $(this).val(ex_comment);
    }
  });

  //评论回复
  $(".reply").click(function(){
    var reply = $(this).parents("li").find(".user-name").text();
    $("#video-present").val(`@${reply}: `);
  });


});
