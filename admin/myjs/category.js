//加载页面
var pages = 0;
var page = 1;
var type = "粮油";
var url = location.href;
//console.log(url);
function loadPage() {
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
	//console.log(res);
	
	page = res["page"];
	type = res["type"];  //没有该参数为undefined
	//console.log(page);
	//console.log(pno);
	
	if(page == undefined) {
		page = 1;
	}
	if(type == undefined) {
		type="粮油";
	}
} else {
	page = 1;
	type="粮油";
}
if(type == "gs"){
	type = "果蔬";
	
}
if(type == "ly"){
	type = "粮油";
	
}
if(type == "sc"){
	type = "水产";
	
}
if(type == "qc"){
	type = "禽畜";
	
}

	var data = {type1:type, page:page };
	$.ajax({
		url: "/AIF/GetProList",
		async: false,
		type: "POST",
		data: data,
		success: function(res){
			var txt = '';
			var code = $.parseJSON(res).code;
			
		if(code == 0){
		//	alert(code);
			pages = $.parseJSON(res).pages;
		//	alert(pages);
			var list = $.parseJSON(res).list;
			var name, area, introduction, cover, price, id;
			list.forEach(function(item, index, array){
		//		alert(item.name);
					id = item.proId;
					name = item.name;
					area = item.area;
					introduction = item.introduction;
					price = item.price;
					cover = item.cover;
				//	cover = cover.replace(/F:\/workspace\/AIF\/WebContent\//,"");
					cover = cover.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
			        txt += '<div class="col-md-4 text3_self">'+
			            '<a href="project_content.html?id='+id+'"><img class="img-circle img_self" src="'+cover+'" alt="firefox"></a>'+
			            '<p>'+area+'</p>'+
			            '<h2>'+name+'</h2>'+
			            '<h4>'+price+'元'+'</h4>'+
			            '<p>'+introduction+'</p>'+
			        '</div>';		      
			});
			console.log(txt);
			$("#list").append(txt);
		}
		}});
}
loadPage();
//分页
$("#pages").text(pages);
$("#page").val(page);
$("#gotoBtn").click(function(){
	page = $("#page").val();
	if(page >=1 && page <= pages) {
		location.href="news_category.html?type=" + type + "&page="+page;
	} else{
		alert("该页面不存在");
		location.reload();
	}
});
$("#lastPage").click(function(res){
	page -- ;
	if(page >=1 && page <= pages) {
		location.href="news_category.html?type=" + type + "&page="+page;
	} else{
		alert("该页面不存在");
		location.reload();
	}
});
$("#nextPage").click(function(res){
	page ++ ;
	if(page >=1 && page <= pages) {
		location.href="news_category.html?type=" + type + "&page="+page;
	} else{
		alert("该页面不存在");
		location.reload();
	}
});

//header部分
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
$("#searchclick").click(function(){
	var proname = $("#proname").val();
	
	var url = encodeURI("search.html?proname="+proname);
    var enurl = encodeURI(url);//使用了两次encodeRUI进行编码
	
	location.href = enurl;
});		