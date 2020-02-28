
$.get("/AIF/CheckLogin",  function(res){
	var message = $.parseJSON(res);
	if(message.code == 0) {
		alert("请先登录！");
		location.href="login.html";
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
			//console.log("username"+username);
			//console.log("photo"+photo);
			$("#photoh").attr("src", photo);
			$("#usernameh").text(username);
		
	});
	}
});

//是否已认证
$.get("/AIF/CheckID", function(res){
	var message = $.parseJSON(res);
	if(message.code != 1) {	
		alert("已实名认证！");
		location.href="personinfo.html";
	} 
});


$("#identifyBtn").click(function(){
	var name = $("#name").val();
	var idcard = $("#idcard").val();
	
	if(name.length>0 && idcard.length>0 && idcard.length<20) {
		var data = {name:name, idcard:idcard};
		$.post("/AIF/Identify", data, function(res){
			var message = $.parseJSON(res);
			if(message.code == 2) {
				alert(message.info);
				location.href = "index.html";
			} else if(message.code == 0) {
				alert(message.info);
				location.href = "login.html";
			} else if(message.code == 1) {
				alert(message.info);
				location.reload();
			} else if(message.code == 3) {
				alert(message.info);
				location.href = "index.html";
			}
			
		});
	} else {
		alert("身份验证失败！");
		location.reload(); 
	}
});
$("#searchclick").click(function(){
	var proname = $("#proname").val();
	
	var url = encodeURI("search.html?proname="+proname);
    var enurl = encodeURI(url);//使用了两次encodeRUI进行编码
	
	location.href = enurl;
});