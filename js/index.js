$(document).ready(function(){
  // read-article options列表
  var time = 0;
  var time_h=0;
  $(".read-info-options").hide(0);
  $(".chapter-list li").hide();
  $(".options span").click(function(){
    time++;
    if(time == 1)
    {
      $(this).text("hide").animate({padding:"14 43"},"fast");
      $(".read-info-options").show(100);
      $(".read-bgc-change,.font-choice,.font-size-choice").hide(0);
    }
    else {
      $(this).text("more").animate({padding:"14 8"},"fast");;
      $(".read-info-options").hide(100);
      time = 0;
    }
  });
  $(".ab-c").click(function(){
    if($(".font-choice").css("display") == "none"){
      $(".font-choice").animate({height:"show"},400);
      $(".font-size-choice").delay(400).animate({width:"show"},300);
      $(".read-bgc-change").animate({width:"show"},400);
      flag2 = 1;
    }
    else{
      $(".font-size-choice").animate({width:"hide"},200);
      $(".font-choice").delay(200).animate({height:"hide"},300);
      $(".read-bgc-change").delay(200).animate({width:"hide"},300);
      flag2 = 0;
    }
  });
  //更换阅读背景
  var color_changer = 0;
  var bgc_changer = function(bg_color,box_bg_color,font_color,shadow_style,shadow_color,few_color){
    $("body").css("background-color",bg_color);
    $(".next-chapter,.ab-c,.read-bgc-change,.font-choice,.chapter,.chapter-list,.font-size-choice,.options,.att").css({
      "background-color":box_bg_color,
      "box-shadow":shadow_style+" 0 1px 2px "+shadow_color
    });
    $(".article-read-contain,.user-name,.att,.chapter-list").css("color",font_color);
    $(".user-info > span,.signature,.ariticle-author-name").css("color",few_color);
  }
  $(".read-bgc-change").click(function(){
    color_changer++;
    if(color_changer == 1)  bgc_changer("#f5e7df","#f5e7df","#000","outset","#d7d7d7","#99999e");//$("body").css("background-color","#f5e7df");
    if(color_changer == 2)  bgc_changer("#2c2c32","#2c2c32","#99999e","inset","#000","#474748");
    if(color_changer == 3)  bgc_changer("#212123","#212123","#9b8e83","inset","#000","#504b47");
    if(color_changer == 4)  bgc_changer("#8a7c7c","#6c5457","#23181c"," ","#3e3e3e","#000");
    if(color_changer == 5){
      $("body").css("background-color","#f7f7f7");
      $(".next-chapter,.ab-c,.read-bgc-change,.font-choice,.chapter,.chapter-list,.font-size-choice,.options,.att").css({
        "background-color":"#fff",
        "box-shadow":"0 1px 2px #d7d7d7"
      });
      $(".article-read-contain,.user-name,.chapter-list,.user-info > span").css("color","#000");
      $(".att").css("color","#f35c80");
      $(".signature").css("color","#99999e");
      color_changer = 0;
    }
  });

  // 设置字体大小
  var font_size = 16;
  $(".article-read-contain").css("font-size","16px");
  $(".font-size-choice ul").children("li:last-child").click(function(){
    if(font_size <= 25){
      font_size++;
      $(".article-read-contain").css("font-size",font_size+"px");
    }
    if(font_size > 25 && $(".tips-large").css("display")=="none"){
      $(".tips-large").css("display","block").delay(500).fadeOut("slow");
    }
  });
  $(".font-size-choice ul").children("li:first-child").click(function(){
    if(font_size >= 8){
      font_size--;
      $(".article-read-contain").css("font-size",font_size+"px");
    }
    if(font_size < 8 && $(".tips-small").css("display")=="none"){
      $(".tips-small").css("display","block").delay(500).fadeOut("slow");
    }
  });
  $(".font-size-choice ul").children("li:nth-child(2)").click(function(){
      $(".article-read-contain").css("font-size","13px");
      font_size = 13;
  });
  $(".font-size-choice ul").children("li:nth-child(3)").click(function(){
      $(".article-read-contain").css("font-size","14px");
      font_size = 14;
  });
  $(".font-size-choice ul").children("li:nth-child(4)").click(function(){
      $(".article-read-contain").css("font-size","15px");
      font_size = 15;
  });
  // 选择章节
  $(".chapter").click(function(){
    time_h++;
    if($(".chapter-list").css("display") == "none"){
      $(".chapter-list").animate({height:"show"},300);
      if(time_h2 == 1)
      $(".chapter-list ul:first-child li").css("display","block");
      }
    else{
      $(".chapter-list").animate({height:"hide"},"fast");
    }
  });

  $(".chapter-list ul:first-child").click(function(){
    if(time_h == 1)
    $(this).children("li").css("display","block");
  });

  $(".chapter-list > ul").click(function(){
    time_h++;
    $(this).siblings().children("li").hide(0);
    $(this).children("li").css("display","block");
  });

}); //->document
