//注销登陆
$.get("/AIF/Logout",function(res){
	
});


$("#loginBtn").click(function(){
	var email = $("#email").val();
	var password = $("#password").val();
	//判断格式
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	var pp = /[^0-9a-zA-Z_]/g;
	if(reg.test(email)&& password!=null && !pp.test(password) ){
		var data = {email: email, password:password};
		$.post("/AIF/Login", data, function(res){
			var message = $.parseJSON(res);
			if(message.code == 0){
			//	alert(message.code);
				alert(message.info);
				location.reload();
			} else {
				$.get("/AIF/CheckAdmin", function(res){
					var message = $.parseJSON(res);
					if(message.code === 0){
					//	alert("1");
						alert("登陆成功！");
						location.href = "index.html";
					} else {
						alert("登陆成功！");
					//	alert("2");
						location.href = "admin/index.html";
					}
				});
			
			}
		});
		
	} else {
		alert("邮箱或密码错误！");
	//	location.reload();
	}
});
$("#searchclick").click(function(){
	var proname = $("#proname").val();
	
	var url = encodeURI("search.html?proname="+proname);
    var enurl = encodeURI(url);//使用了两次encodeRUI进行编码
	
	location.href = enurl;
});