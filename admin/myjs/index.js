
//检查是否已登录
$.get("/AIF/CheckLogin", function(res){
	var message = $.parseJSON(res);
	//alert(message.code);
	if(message.code == 0) {
		//alert("未登录");
		//未登录 显示注册登录按钮
		var txt = 
		'<li><a href="register.html"><p class="text-color-white">注册</p></a></li>'+
        '<li><a href="login.html"><p class="text-color-white">登录</p></a></li>'+
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
				//photo = photo.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
				photo = photo.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
			}
			//console.log("username"+username);
			//console.log("photo"+photo);
			var txt = 
				'<li class="dropdown">'+ 
	        '<a href="#" class="dropdown-toggle" data-toggle="dropdown">'+
	            '<img src="' + photo+'" class="nav-avatar" /><b class="text-color-white">'+username+'</b>'+
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
		
		
		



//获取项目
//获取审核通过2和挂出5
var data= {page:1, type1:"粮油"};
$.post("/AIF/GetProList", data, function(res){
	var txt = '';
	var code = $.parseJSON(res).code;
	if(code == 0){
		var list = $.parseJSON(res).list;
		
		var name, area, introduction, cover, price, id;
		
		list.forEach(function(item, index, array){
			if(index < 8){
				id = item.proId;
				name = item.name;
				area = item.area;
				introduction = item.introduction;
				price = item.price;
				cover = item.cover;
				cover = cover.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
		        //添加到首页
		        txt += '<div class="col-md-3 text3_self">'+
		            '<a href="project_content.html?id='+id+'"><img class="img-circle img_self" src="'+cover+'" alt="firefox"></a>'+
		            '<p>'+area+'</p>'+
		            '<h3>'+name+'</h3>'+
		            '<h4>'+price+'元'+'</h4>'+
		            '<p>'+introduction+'</p>'+
		        '</div>';
		        
			}        
		});
		$("#typely").append(txt);
		console.log("ly");
	}
	
});

var data= {page:1, type1:"果蔬"};
$.post("/AIF/GetProList", data, function(res){
	var txt = '';
	var code = $.parseJSON(res).code;
	
	if(code == 0){
	var list = $.parseJSON(res).list;
	var name, area, introduction, cover, price, id;
	list.forEach(function(item, index, array){
		if(index < 8){
			id = item.proId;
			name = item.name;
			area = item.area;
			introduction = item.introduction;
			price = item.price;
			cover = item.cover;
			cover = cover.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
			//alert(cover);
	        //添加到首页
	        txt += '<div class="col-md-3 text3_self">'+
	            '<a href="project_content.html?id='+id+'"><img class="img-circle img_self" src="'+cover+'" alt="firefox"></a>'+
	            '<p>'+area+'</p>'+
	            '<h3>'+name+'</h3>'+
	            '<h4>'+price+'元'+'</h4>'+
	            '<p>'+introduction+'</p>'+
	        '</div>';
	        
		}        
	});
	$("#typegs").append(txt);
	console.log("gs");
	}
});

var data= {page:1, type1:"禽畜"};
$.post("/AIF/GetProList", data, function(res){
	var txt = '';
	var code = $.parseJSON(res).code;
	if(code == 0){
	var list = $.parseJSON(res).list;
	var name, area, introduction, cover, price, id;
	list.forEach(function(item, index, array){
		if(index < 8){
			id = item.proId;
			name = item.name;
			area = item.area;
			introduction = item.introduction;
			price = item.price;
			cover = item.cover;
			cover = cover.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
	        //添加到首页
	        txt += '<div class="col-md-3 text3_self">'+
	            '<a href="project_content.html?id='+id+'"><img class="img-circle img_self" src="'+cover+'" alt="firefox"></a>'+
	            '<p>'+area+'</p>'+
	            '<h3>'+name+'</h3>'+
	            '<h4>'+price+'元'+'</h4>'+
	            '<p>'+introduction+'</p>'+
	        '</div>';
	        
		}        
	});
	$("#typeqc").append(txt);
	console.log("qc");
	}
});

var data= {page:1, type1:"水产"};
$.post("/AIF/GetProList", data, function(res){
	var txt = '';var code = $.parseJSON(res).code;
	if(code == 0){
	var list = $.parseJSON(res).list;
	var name, area, introduction, cover, price, id;
	list.forEach(function(item, index, array){
		if(index < 8){
			id=item.proId;
			name = item.name;
			area = item.area;
			introduction = item.introduction;
			price = item.price;
			cover = item.cover;
			cover = cover.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
	        //添加到首页
	        txt += '<div class="col-md-3 text3_self">'+
	            '<a href="project_content.html?id='+id+'"><img class="img-circle img_self" src="'+cover+'" alt="firefox"></a>'+
	            '<p>'+area+'</p>'+
	            '<h3>'+name+'</h3>'+
	            '<h4>'+price+'元'+'</h4>'+
	            '<p>'+introduction+'</p>'+
	        '</div>';
	        
		}        
	});
	$("#typesc").append(txt);
	console.log("sc");
}
});




//5经济评述http://www.agri.cn/V20/SC/jjps/
//1农业要闻http://www.agri.cn/V20/ZX/nyyw/
//6气象农业http://www.agri.cn/qxny/nqyw/
//3会讯公告http://www.agri.cn/V20/ZX/hxgg/
//获取news 首页展示五条
//农业要闻保证最先加载完 //太慢
var data = {urlStr:"http://www.agri.cn/V20/ZX/nyyw/", page:1 };
$.ajax({
	type:"post",
	url: "/AIF/GetNews1",
	data: data,
	async: true,
	success:function(res){
		var txt = '';
		var list = $.parseJSON(res).list;
		var title, src, date;
		list.forEach(function(item, index, array){
			if(index < 5){
				title = item.title;
			//	console.log(src);
		        src = item.src;
		        date = item.date;
		        //添加到首页
		        txt += '<a href="news_content.html?page=V20/ZX/nyyw/' + src + '"><p class="lead lead1">' +  title+'</p>'+
		            '<p class="lead lead2">'+date+'</p></a>';
			}        
		});
		//txt += '<h3 class="text_self5"><a href="news_category.html?page=nyyw"><span class="glyphicon glyphicon-share-alt"></span>more</a></h3>';
		$("#nyyw").append(txt);
		console.log("1");
	}

});

var data = {urlStr:"http://www.agri.cn/V20/ZX/hxgg/" ,page:1};
$.post("/AIF/GetNews1" ,data, function(res){
	var txt = '';
	var list = $.parseJSON(res).list;
	var title, src, date;
	list.forEach(function(item, index, array){
		if(index < 5){
			title = item.title;
	        src = item.src;
	        date = item.date;
	        //添加到首页
	        txt += '<a href="news_content.html?page=V20/ZX/hxgg/' + src + '"><p class="lead lead1">' +  title+'</p>'+
            '<p class="lead lead2">'+date+'</p></a>';
		}        
	});
	//txt += '<h3 class="text_self5"><a href="news_category.html?page=hxgg"><span class="glyphicon glyphicon-share-alt"></span>more</a></h3>';
	
	$("#hxgg").append(txt);
	console.log("2");
});

var data = {urlStr:"http://www.agri.cn/qxny/nqyw/",page:1 };
$.post("/AIF/GetNews1" ,data, function(res){
	var txt = '';
	var list = $.parseJSON(res).list;
	var title, src, date;
	list.forEach(function(item, index, array){
		if(index < 5){
			title = item.title;
	        src = item.src;
	        date = item.date;
	        //添加到首页
	        txt += '<a href="news_content.html?page=qxny/nqyw/' + src + '"><p class="lead lead1">' +  title+'</p>'+
            '<p class="lead lead2">'+date+'</p></a>';
		}        
	});
	//txt += '<h3 class="text_self5"><a href="news_category.html?page=nqyw"><span class="glyphicon glyphicon-share-alt"></span>more</a></h3>';
	
	$("#qxny").append(txt);
	console.log("4");
});

var data = {urlStr:"http://www.agri.cn/V20/SC/jjps/",page:1 };
$.post("/AIF/GetNews1" ,data, function(res){
	var txt = '';
	var list = $.parseJSON(res).list;
	var title, src, date;
	list.forEach(function(item, index, array){
		if(index < 5){
			title = item.title;
	        src = item.src;
	        date = item.date;
	        //添加到首页
	        txt += '<a href="news_content.html?page=V20/SC/jjps/' + src + '"><p class="lead lead1">' +  title+'</p>'+
            '<p class="lead lead2">'+date+'</p></a>';
		}        
	});
	//txt += '<h3 class="text_self5"><a href="news_category.html?page=jjps"><span class="glyphicon glyphicon-share-alt"></span>more</a></h3>';
	
	$("#jjps").append(txt);
	console.log("3");
});

var data = {};
$.post("/AIF/GetForumRemenxiangmuList" ,data, function(res){
	var txt = '';
	var list = $.parseJSON(res).list;
	var title, note_id;
	list.forEach(function(item, index, array){
		if(index < 5){
			title = item.title;
	        note_id = item.note_id;
	        //添加到首页
	        txt += '<a href="note.html?note_id='+note_id+'"><p class="lead lead1">' +  title+'</p>';
		}        
	});
	//txt += '<h3 class="text_self5"><a href="news_category.html?page=jjps"><span class="glyphicon glyphicon-share-alt"></span>more</a></h3>';
	
	$("#remenxiangmu").append(txt);
});

var data = { note_type:"touzifenxiang",page:1 };
$.post("/AIF/GetForumTouzifenxiangList" ,data, function(res){
	var txt = '';
	var list = $.parseJSON(res).list;
	var title, note_id;
	list.forEach(function(item, index, array){
		if(index < 5){
			title = item.title;
	        note_id = item.note_id;
	        //添加到首页
	        txt += '<a href="note.html?note_id='+note_id+'><p class="lead lead1">' +  title+'</p>';
		}        
	});
	//txt += '<h3 class="text_self5"><a href="news_category.html?page=jjps"><span class="glyphicon glyphicon-share-alt"></span>more</a></h3>';
	
	$("#touzifenxiang").append(txt);
});

var data = { note_type:"wendazhuanqu",page:1 };
$.post("/AIF/GetForumWendazhuanquList" ,data, function(res){
	var txt = '';
	var list = $.parseJSON(res).list;
	var title, note_id;
	list.forEach(function(item, index, array){
		if(index < 5){
			title = item.title;
	        note_id = item.note_id;
	        //添加到首页
	        txt += '<a href="note.html?note_id='+note_id+'><p class="lead lead1">' +  title+'</p>';
		}        
	});
	//txt += '<h3 class="text_self5"><a href="news_category.html?page=jjps"><span class="glyphicon glyphicon-share-alt"></span>more</a></h3>';
	
	$("#wendazhuanqu").append(txt);
});

$("#searchclick").click(function(){
	var proname = $("#proname").val();
	
	var url = encodeURI("search.html?proname="+proname);
    var enurl = encodeURI(url);//使用了两次encodeRUI进行编码
	
	location.href = enurl;

//	var data = {proname: proname, page:1};
//	$.post("/AIF/SearchIndex", data, function(res){
//		var message = $.parseJSON(res);
//		if(message.code == 0){
//		//	alert(message.code);
//			alert(message.info);
//			location.reload();
//		} else {
//		//	alert(message.code);
//			alert(message.info);
//			location.href = "search.html";
//		}
//	});

});