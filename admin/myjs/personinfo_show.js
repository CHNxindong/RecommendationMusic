$.get("/AIF/CheckLogin",  function(res){
	var message = $.parseJSON(res);
	if(message.code == 0) {
		//alert("请先登录！");
		//location.href="login.html";
		//显示登陆、注册
		var txt = '<li><a href="register.html">注册</a></li>'
			+ '<li><a href="login.html">登录</a></li>'
			+ '<li><a href="establish.html"><button class="btn btn-private btn-self2">发起项目</button></a></li>';
		$("#headerul").append(txt);
	}  else {
		//header
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
			var txt = '<li class="dropdown">'
				+ '<a href="#" class="dropdown-toggle" data-toggle="dropdown">'
				+ '<img src="'
				+ photo
				+ '" class="nav-avatar" /><b>'
				+ username
				+ '</b>'
				+ '</a>'
				+ '<ul class="dropdown-menu">'
				+ '<li><a href="personinfo.html">个人空间</a></li>'
				+ '<li class="divider"></li>'
				+ '<li><a href="login.html">退出登录</a></li>'
				+ '</ul>'
				+ '</li>'
				+ '<li><a href="establish.html"><button class="btn btn-private btn-self2">发起项目</button></a></li>';
		$("#headerul").append(txt);
		
	});
	}
});
//展示信息
var userId = 0;
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
	
	userId = res["userid"];
}
var data ={"userId":userId};
$.post("/AIF/GetUserInfoByID",data, function(res){
	var message = $.parseJSON(res);
	var username = message.username;
	var telephone = message.telephone;
	var email = message.email;
	var sex = message.sex;
	var birthday = message.birthday;
	var address = message.address;
	var introduction = message.introduction;
	var identified = message.identified;
	var bindwx = message.bindwx;
	var photo = message.photo;
	if(telephone == undefined) { telephone = ""};
	if(sex == 0) { sex = ""};
	if(birthday == undefined) { birthday = ""};
	if(address == undefined) { address = ""};
	if(introduction == undefined) { introduction = ""};
	if(photo == undefined || photo=="") { 
		photo = "images/blank.PNG";
	} else{
		//改为相对路径
		//photo = photo.replace(/F:\/workspace\/AIF\/WebContent\//,"");
		photo = photo.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
		//console.log("photo:"+photo);
	}
	
	
	if(sex == 1){
		$("#sex").text("男");
	}
	else if(sex == 2){
		$("#sex").text("女");
	}else if(sex==3){
		$("#sex").text("保密");
	}
	
	
	$("#username").text(username);
	$("#telephone").text(telephone);
	$("#email").text(email);
	//$("#sex").text(sex);
	$("#birthday").text(birthday);
	$("#address").text(address);
	$("#introduction").text(introduction);
	$("#photo").attr("src", photo);
	var txt = '';
	if(identified == 0) {
		txt += '<tr>'+
         '<td width="50%">身份验证</td>'+
         '<td><a href="identify.html" class="style_a_1"><span class="label label-warning">去验证</span></a>'+
         '</td>'+
         '</tr>';
	} else{
		txt += '<tr>'+
		'<td width="50%">身份验证</td>'+
        '<td><span class="label label-success">已验证</span>'+
        '</td>'+
        '</tr>';
	}
	
	if(bindwx == 0){
		txt += '<tr>'+
        '<td width="50%">微信绑定</td>'+
        '<td><a href="bindwx.html" class="style_a_1"><span class="label label-warning">去绑定</span></a>'+
        '</td>'+
        '</tr>';
		
	}else{
    		txt += '<tr>'+
    		'<td width="50%">微信绑定</td>'+
            '<td><span class="label label-success">已绑定</span>'+
            '</td>'+
            '</tr>';
    }
	$("#info").append(txt);
	

});
$("#searchclick").click(function(){
	var proname = $("#proname").val();
	
	var url = encodeURI("search.html?proname="+proname);
    var enurl = encodeURI(url);//使用了两次encodeRUI进行编码
	
	location.href = enurl;
});