$(document).ready(function() {
    //字数限制
    var letter_limit = function(input, num) {
        $(input).keyup(function() {
            var text_num = $(input).val().length;
            if (text_num <= num) {
                $(".letter-cnt").text(text_num + "/" + num + "");
            } else {
                var ex_comment = $(input).val().substr(0, num);
                $(this).val(ex_comment);
            }
        });
    };

    $(".direction > ul >li").hover(function() {
        $(".title-list").hide();
        $(this).children(".title-list").css("display", "block");
    }, function() {
        $(".title-list").css("display", "none");
    });

    $('.choice-op').hover(function() {
        $('.choice-op span').css("color", "#ea4c89");
        $('.uni-icon img').attr("src", "images/main/unipull-hover.png");
    }, function() {
        $('.choice-op span').css("color", "#afafaf");
        $('.uni-icon img').attr("src", "images/main/unipull.png");
    });

    var time = 0;
    $(".search img").click(function() {
        time++;
        if (time == 1) {
            $(".sign,.slogan").hide();
            $(".search input,.search-list").css("display", "block");
            $(".search img").attr("src", "images/main/close-search.png");
        }
        if (time == 2) {
            $(".sign,.slogan").show();
            $(".search input,.search-list").css("display", "none");
            $(".search img").attr("src", "images/main/search.png");
            time = 0;
        }
    });
    //搜索框js
    $(".search-list span:first-child").mouseenter(function() {
        $(".search-list ul").css("display", "block");
    });
    $(".search-list").mouseleave(function() {
        $(".search-list ul").css("display", "none");
    });
    $(".search-list li").click(function() {
        var temp = $(".search-list span:first-child").text();
        $(".search-list ul").css("display", "none");
        $(".search-list span:first-child").text($(this).text());
        $(this).text(temp);
    });

    $("#short-video,#title-more").mouseover(function() {
        $(this).children(".title-multi").css("display", "block");
        $(this).mouseout(function() {
            $(".title-multi").hide();
        });
    });

    //隐藏时间 option
    $(".time-option li").hide();
    $(".time-option span").click(function() {
        if ($(".time-option li").css("display") == "none")
            $(".time-option li").show(200);
        else {
            $(".time-option li").hide(200);
        }
    });

    //收藏夹
    $("#collection,.pic-collection").click(function() {
        $(".mask,#collection-list").css("display", "block");
        $(".close-file,.mask").click(function() {
            $("#collection-list,.mask").fadeOut(1);
        });
    });
    //添加文件夹
    $("#collection-list > li:last-child").click(function() {
        $("#collection-list h4").after(
            "<div class='file-add-func'><li><input type='text'/><span class='letter-cnt' style='position:absolute;right:36px;margin-top:2px'></span></li>" +
            "<span><button id='yes' type='text'><span></span></button></span>" +
            "<span><button id='no' type='text'><span></span></button></li></span></div>"
        );
        $("#no").click(function() {
            $(".file-add-func").remove();
        });
        $("#yes").click(function() {
            var file_name = $(".file-add-func input").val();
            $("#collection-list li:last-child").before(
                "<li>" + file_name + "</li>"
            );
            $(".file-add-func").remove();
        });
        //文件名字数限制
        letter_limit(".file-add-func input", 12);

    });

    //thx thx-tips
    $("#music-favor,.pic-favor").click(function() {
        $(".thx-tips").css("display", "block").delay("1000").fadeOut();
    });
    $("#music-miaoliang,.pic-miaoliang").click(function() {
        $(".miaoliang-tips").css("display", "block").delay("1000").fadeOut();
    });
    //send-message
    $(".message").click(function() {
        $(".mask,.send-message").css("display", "block");
        $(".mask").click(function() {
            $(".send-message,.mask").hide();
        });
        letter_limit(".message-content", 150);
    });

    //pic-inter
    $(".cut img").click(function() {
        var pic_source = $(this).attr("src");
        $(".overview,.mask").css("display", "block");
        $(".pic img").attr("src", pic_source);
        $(".mask").click(function() {
            $(".overview").hide();
        });
    });
    $(".pic-favor,.pic-miaoliang,.pic-collection").click(function() {
        $(this).css("opacity", "1.0");
    });
    // 大小图切换
    var pic_width = $(".view-content").css("width");
    $(".pic").click(function() {
        if ($(this).css("width") != pic_width) {
            $(this).animate({ width: "100%" });
            $(".pic-info").css({
                "float": "initial",
                "padding": "initial",
                "margin": "0 auto"
            });
        } else {
            $(this).animate({ width: "500px" });
            $(".pic-info").css({
                "float": "left",
                "padding": "10px 0 0 40px",
                "margin": "initial"
            });
        }
    });

    // sign
    $(".in").click(function() {
        $(".sign-in,.mask").css("display", "block");
        $(".mask").click(function() {
            $(".sign-in,.mask").hide();
        });
    });

    //upload - title
    $(".upload-category>ul>li").hover(function() {
        $(this).children(".detail-ca").css("display", "block");
    }, function() {
        $(this).children(".detail-ca").css("display", "none");
    });
    $(".detail-ca>li").click(function() {
        var selected = $(this).text();
        $('#selected').text(selected);
        var upload_name = $(this).parent("ul").data("upload");
        var this_name = $(this).data("value");

        $("." + upload_name).siblings().css("display", "none");
        if (this_name == undefined)
            $("." + upload_name).css("display", "block");
        else if (this_name == "novel") {
            $("." + upload_name).css("display", "block");
            $("." + upload_name).children(".for-novel").css("display", "block");
            $("." + upload_name).children(".for-novel").siblings().css("display", "none");
        } else if (this_name == "ani") {
            $("." + upload_name).css("display", "block");
            $("." + upload_name).children(".animation").css("display", "block");
            $("." + upload_name).children(".animation").siblings().css("display", "none");
        }
    });
});