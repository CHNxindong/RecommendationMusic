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
		


//加载页面
var note_type;
var pages;
var page;
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
	note_type = res["note_type"];  //没有该参数为undefined
	
if(note_type == "remenxiangmu") {
	var data = { page:page };
	var remenxiangmuIndex = 1;
	$.ajax({
		url: "/AIF/GetRemenxiangmuPage",
		async: false,
		type: "POST",
		data: data,
		success: function(res){
			var txt = '';
			pages = $.parseJSON(res).pages;
			var list = $.parseJSON(res).list;
			var title, note_id;
			list.forEach(function(item, index, array){
				
					title = item.title;
					//console.log(src);
			        note_id = item.note_id;
			        //添加到首页
			        txt += '<a href="note.html?note_id='+note_id+'"><p class="lead lead1">' +(remenxiangmuIndex++)+'. '+title+'</p>';
				      
			});
			$("#forum_list").append(txt);
			
		}
	});
	
} else if(note_type == "touzifenxiang") {
	var data = { page:page };
	var touzifenxiangIndex = 1;
	$.ajax({
		url: "/AIF/GetTouzifenxiangPage",
		async: false,
		type: "POST",
		data: data,
		success: function(res){
			var txt = '';
			pages = $.parseJSON(res).pages;
			var list = $.parseJSON(res).list;
			var title, note_id;
			list.forEach(function(item, index, array){
				
					title = item.title;
					//console.log(src);
			        note_id = item.note_id;
			        //添加到首页
			        txt += '<a href="note.html?note_id='+note_id+'"><p class="lead lead1">' +(touzifenxiangIndex++)+'. '+title+'</p>';
				      
			});
			$("#forum_list").append(txt);
			
		}
	});
} else if(note_type == "wendazhuanqu") {
	var data = { page:page };
	var wendazhuanquIndex = 1;
	$.ajax({
		url: "/AIF/GetWendazhuanquPage",
		async: false,
		type: "POST",
		data: data,
		success: function(res){
			var txt = '';
			pages = $.parseJSON(res).pages;
			var list = $.parseJSON(res).list;
			var title, note_id;
			list.forEach(function(item, index, array){
				
					title = item.title;
					//console.log(src);
			        note_id = item.note_id;
			        //添加到首页
			        txt += '<a href="note.html?note_id='+note_id+'"><p class="lead lead1">' +(wendazhuanquIndex++)+'. '+title+'</p>';
				      
			});
			$("#forum_list").append(txt);
			
		}
	});
	
}
}
}
loadPage();
//分页
var pno = 1;
console.log("pages"+ pages);
console.log("page" + page);
$("#pages").text(pages);
$("#gotoBtn").click(function(){
	pno = $("#page").val();
	if(pno >=1 && pno <= pages) {
		location.href="forum.html?note_type="+note_type+"&page=" + pno;
	} else{
		alert("该页面不存在");
		location.reload();
	}
});
$("#lastPage").click(function(res){
	pno -- ;
	if(pno >=1 && pno <= pages) {
		location.href="forum.html?note_type="+note_type+"&page=" + pno;
	} else{
		alert("该页面不存在");
		location.reload();
	}
});
$("#nextPage").click(function(res){
	pno ++ ;
	if(pno >=1 && pno <= pages) {
		location.href="forum.html?note_type="+note_type+"&page=" + pno;
	} else{
		alert("该页面不存在");
		location.reload();
	}
});
$("#searchclick").click(function(){
	var proname = $("#proname").val();
	
	var url = encodeURI("search.html?proname="+proname);
    var enurl = encodeURI(url);//使用了两次encodeRUI进行编码
	
	location.href = enurl;
});
