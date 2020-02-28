//同步设置
$.ajaxSetup({  
    async : false  
});  

//判断登陆以及管理员身份
$.get("/AIF/CheckLogin", function(res){
	var message = $.parseJSON(res);
	if(message.code == 0){
		alert("请先登录！");
		location.href="login.html";
	}
});
$.get("/AIF/CheckAdmin", function(res){
	var message = $.parseJSON(res);
	if(message.code === 0){
		alert("不是管理员身份！");
		location.href="personinfo.html";
	} else {
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
			$("#photoh").attr("src", photo);
			$("#usernameh").text(username);
			
		});
	}
});

//通过id获取项目信息
var proId = 0;
var url = location.href;
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
	
	proId = res["id"];
}
var data = {id:proId};

var name,type1,type2,area,province, detail, introduction, output, price,price_reason,time;
$.ajax({
		url: "/AIF/GetProDetail",
		async: false,
		type: "POST",
		data: data,
		success: function(res){
			var message = $.parseJSON(res);
			name = message.name;
			province = message.province;
			area = message.area;
			type1 = message.type1;
			type2 = message.type2;
			price = message.price;
			price_reason = message.price_reason;
			detail = message.detail;
			introduction = message.introduction;
			output = message.output;
			time = message.time;
			
			$("#name").text(name);
			$("#type").text(type1+"-"+type2);
			$("#address").text(province+"-"+area);
			$("#introduction").text(introduction);
			$("#detail").text(detail);
			$("#output").text(output+"kg");
			$("#price").text(price+"元");
			$("#price_reason").text(price_reason);
			$("#time").text(time/(30*24*3600*1000)+"个月");
			$("detail").text(detail);
		}
	});

//按钮
$("#passBtn").click(function(){
	$.post("/AIF/PassPro", data, function(res){
		var code = $.parseJSON(res).code;
		if( code == 0){
			alert("审核成功!");
			location.href = "personinfo.html";
		}else if(code == 1){
			alert("没有管理员权限");
			location.href = "personinfo.html";
		}
	});
});
$("#failBtn").click(function(){
	$.post("/AIF/RejectPro", data, function(res){
		var code = $.parseJSON(res).code;
		if( code == 0){
			alert("审核成功!");
			location.href = "personinfo.html";
		}else if(code == 1){
			alert("没有管理员权限");
			location.href = "personinfo.html";
		}
	});
});