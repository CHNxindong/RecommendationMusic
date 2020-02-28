////注销登陆
//$.get("/AIF/Logout",function(res){
//	
//});


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
				alert("登陆失败！");
				location.reload();
			} else {				
				$.get("/AIF/CheckAdmin", function(res){
					var message = $.parseJSON(res);
					if(message.code === 0){
						alert("不是管理员身份！");
						location.href="loginAdmin.html";
					}else{
						location.href = "admin/projectlist.html";
					}	
				});
		}
		});
		
	} else {
		alert("邮箱或密码错误！");
	//	location.reload();
	}
});