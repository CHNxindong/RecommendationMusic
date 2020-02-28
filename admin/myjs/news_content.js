//检查是否已登录
$.get("/AIF/CheckLogin", function(res){
	var message = $.parseJSON(res);
	//alert(message.code);
	if(message.code == 0) {
		//alert("未登录");
		//未登录 显示注册登录按钮
		var txt = '<li><a href="register.html">注册</a></li>'+
        '<li><a href="login.html">登录</a></li>'+
        '<li><a href="establish.html"><button class="btn btn-private btn-self2">发起项目</button></a></li>';
		$("#headerul").append(txt);
		
	} else {
		//alert("已登录");
		//已登录 显示头像个人下拉框
		//获取用户名和用户头像
		var username;
		var photo;
		$.get("/AIF/GetUserInfo", function(res){
			var message = $.parseJSON(res);
			username = message.username;
			photo = message.photo;
			if(photo == undefined) {
				photo = "images/blank.PNG";
			} else {
				//photo = photo.replace(/F:\/workspace\/AIF\/WebContent\//,"");
				photo = photo.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
			}
			//console.log("username"+username);
			//console.log("photo"+photo);
			var txt = '<li class="dropdown">'+ 
	        '<a href="#" class="dropdown-toggle" data-toggle="dropdown">'+
	            '<img src="' + photo+'" class="nav-avatar" /><b>'+username+'</b>'+
	        '</a>'+
	        '<ul class="dropdown-menu">'+
	            '<li><a href="personinfo.html">个人空间</a></li>'+
	            '<li class="divider"></li>'+
	            '<li><a href="login.html">退出登录</a></li>'+
	        '</ul>'+
	    '</li>'+
	    '<li><a href="establish.html"><button class="btn btn-private btn-self2">发起项目</button></a></li>';
			$("#headerul").append(txt);
		
	});
	}
		});
		

var url = location.href;
var page;
if(url.split("?").length > 1){
	url = url.split("?")[1];
	var para = url.split("&");
	var len = para.length;
	var res = {};
	var arr = [];
	for(var i=0;i<len;i++){
	    arr = para[i].split("=");
	    res[arr[0]] = arr[1];
	}
	page = res["page"];
}

if(page == undefined) {
	alert("该页面不存在！");
	location.href="index.html";
} else {
	//qxny/nqyw/./201706/t20170607_5663202.htm
	var data = {url: page};
	$.post("/AIF/GetNews2", data, function(res){
		var message = $.parseJSON(res);
		var title = message.title;
		var src = message.src;
		var content = message.content;
		console.log(title);
		console.log(src);
		console.log(content);
		$("#title").text(title);
		$("#src").text(src);
		$("#content").append(content);
	});
}

$("#goback").click(function(){
	window.history.back();
});
$("#searchclick").click(function(){
	var proname = $("#proname").val();
	
	var url = encodeURI("search.html?proname="+proname);
    var enurl = encodeURI(url);//使用了两次encodeRUI进行编码
	
	location.href = enurl;
});
