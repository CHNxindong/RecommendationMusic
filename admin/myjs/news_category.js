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
var pno = 1;
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
	pno = res["pno"];  //没有该参数为undefined
	//console.log(page);
	//console.log(pno);
	
	if(pno == undefined) {
		pno = 1;
	}
	if(page == undefined) {
		page = "nyyw";
	}
} else {
	page = "nyyw";
	pno = 1;
}

if(page == "nyyw") {
	$("#news_title").text("农业要闻");
	var data = {urlStr:"http://www.agri.cn/V20/ZX/nyyw/", page:pno };
	$.ajax({
		url: "/AIF/GetNews1",
		async: false,
		type: "POST",
		data: data,
		success: function(res){
			var txt = '';
			pages = $.parseJSON(res).pages;
			var list = $.parseJSON(res).list;
			var title, src, date;
			list.forEach(function(item, index, array){
				
					title = item.title;
					//console.log(src);
			        src = item.src;
			        date = item.date;
			        //添加到首页
			        txt += '<a href="news_content.html?page=V20/ZX/nyyw/' + src + '"><p class="lead lead1">' +  title+'</p>'+
			            '<p class="lead lead2">'+date+'</p></a>';
				      
			});
			$("#news_list").append(txt);
			
		}
	});
	
} else if(page == "hxgg"){
	$("#news_title").text("会讯公告");
	var data = {urlStr:"http://www.agri.cn/V20/ZX/hxgg/", page:pno };
	$.ajax({
		url: "/AIF/GetNews1",
		async: false,
		type: "POST",
		data: data,
		success:function(res){
			var txt = '';
			 pages = $.parseJSON(res).pages;
			var list = $.parseJSON(res).list;
			var title, src, date;
			list.forEach(function(item, index, array){
				
					title = item.title;
					//console.log(src);
			        src = item.src;
			        date = item.date;
			        //添加到首页
			        txt += '<a href="news_content.html?page=V20/ZX/hxgg/' + src + '"><p class="lead lead1">' +  title+'</p>'+
			            '<p class="lead lead2">'+date+'</p></a>';
				      
			});
			$("#news_list").append(txt);
		}});
	
	
} else if(page == "jjps") {
	$("#news_title").text("经济评述");
	var data = {urlStr:"http://www.agri.cn/V20/SC/jjps/", page:pno };
	$.ajax({
		url: "/AIF/GetNews1",
		async: false,
		type: "POST",
		data: data,
		success:function(res){
			var txt = '';
			pages = $.parseJSON(res).pages;
			var list = $.parseJSON(res).list;
			var title, src, date;
			list.forEach(function(item, index, array){
				
					title = item.title;
					//console.log(src);
			        src = item.src;
			        date = item.date;
			        //添加到首页
			        txt += '<a href="news_content.html?page=V20/SC/jjps/' + src + '"><p class="lead lead1">' +  title+'</p>'+
			            '<p class="lead lead2">'+date+'</p></a>';
				      
			});
			$("#news_list").append(txt);
		}} );
} else if(page == "qxny") {
	$("#news_title").text("气象农业");
	var data = {urlStr:"http://www.agri.cn/qxny/nqyw/", page:pno };
	$.ajax({
		url: "/AIF/GetNews1",
		async: false,
		type: "POST",
		data: data,
		success:function(res){
			var txt = '';
			pages = $.parseJSON(res).pages;
			var list = $.parseJSON(res).list;
			var title, src, date;
			list.forEach(function(item, index, array){
				
					title = item.title;
					//console.log(src);
			        src = item.src;
			        date = item.date;
			        //添加到首页
			        txt += '<a href="news_content.html?page=qxny/nqyw/' + src + '"><p class="lead lead1">' +  title+'</p>'+
			            '<p class="lead lead2">'+date+'</p></a>';
				      
			});
			$("#news_list").append(txt);
		} });
}

}




loadPage();
//分页
console.log("pages"+ pages);
console.log("pno" + pno);
console.log("page" + page);
$("#pages").text(pages);
$("#page").val(pno);
$("#gotoBtn").click(function(){
	pno = $("#page").val();
	if(pno >=1 && pno <= pages) {
		location.href="news_category.html?page=" + page + "&pno="+pno;
	} else{
		alert("该页面不存在");
		location.reload();
	}
});
$("#lastPage").click(function(res){
	pno -- ;
	if(pno >=1 && pno <= pages) {
		location.href="news_category.html?page=" + page + "&pno="+pno;
	} else{
		alert("该页面不存在");
		location.reload();
	}
});
$("#nextPage").click(function(res){
	pno ++ ;
	if(pno >=1 && pno <= pages) {
		location.href="news_category.html?page=" + page + "&pno="+pno;
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
