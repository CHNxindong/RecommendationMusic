$.ajax({
    type: "get",
    async: true,
    url: "http://127.0.0.1:8081/datacal/getSortWork",
    dataType: "json",
    success: function (data) {
        for(var i=0;i<5;i++){
            $("#ranking_content").append(
            "<li>"+
            "<span class=\"ranking-num\">"+(i+1)+"</span>"+
                "<a class=\"ranking-poster\" href=\"#\" target=\"_blank\"><img src=\"images/demo/cover.jpg\"></a>"+
                "<h3 class=\"r-item\">"+data[i].workName+"</h3>"+
            "<span class=\"r-aname\">by"+
                "<img src=\"images/demo/1.jpg\">"+
                "<a href=\"#\" target=\"_blank\">"+data[i].authorName+"</a>"+
            "</span>"+
            "<span class=\"score\"><span class=\"g\">"+data[i].pageView+"</span><br><span class=\"g-tip\">综合得分</span></span>"+
                "</li>"
            );
        }

    },
    error: function () {
        alert('fail');
    }
});