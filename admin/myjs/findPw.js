$("#email").blur(function(){	var email = $("#email").val();	//判断邮箱格式	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 	if(reg.test(email)){		//发送验证码		var data = {email:email};		$.post("/AIF/ResetSendCode", data, function(res){			var message = $.parseJSON(res);			if(message.code == 0){				alert("验证码已发送，请及时查收！");								//$("#email").focus();			} else {				alert("该邮箱暂未注册！");			}		});	} else {		//提示信息		alert("请输入正确邮箱！");	}});$("#setBtn").click(function(res){	//判断格式	var email = $("#email").val();	var code = $("#code").val();	var password = $("#password").val();	var repassword = $("#repassword").val();		if(email.length > 0 && code.length > 0 && password.length >=8 && password.length <=12 && repassword == password ){		//数字、字母、下划线		var pp = /[^0-9a-zA-Z_]/g;		if(!pp.test(password)) {			//重置			var data = {email:email, code:code, password:password};			$.post("/AIF/SetPw", data, function(res){							var message = $.parseJSON(res);				if(message.code == 0) {					alert(message.info);					location.reload();				} else if(message.code == 1) {					alert(message.info);					location.reload();				} else if(message.code == 2){					alert(message.info);					location.href="index.html";				}					});		} else {			alert("请按照要求填入信息！");			location.reload();		}	} else {		alert("请按照要求填入信息！");		location.reload();	}});$("#searchclick").click(function(){	var proname = $("#proname").val();		var url = encodeURI("search.html?proname="+proname);    var enurl = encodeURI(url);//使用了两次encodeRUI进行编码		location.href = enurl;});