$(document).ready(function(){
    //个人页面 - 鼠标悬浮出现option
    $(".cut").hover(function(){
        $(this).children(".opt").show();
        console.log($(this).children(".opt").html());
    },function(){
        $(this).children(".opt").hide();
    });

    // 收藏夹 和 作品集 切换
    $(".ta-collection").click(function(){
        // $(this).css("float","right");
        $(".user-collection").show();
        $(".work-main").hide();
    });
    $(".ta-work").click(function(){
        // $(this).css("float","right");
        $(".user-collection").hide();
        $(".work-main").show();
    });
});