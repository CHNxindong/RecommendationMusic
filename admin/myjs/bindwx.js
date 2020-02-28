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
			
			//是否已绑定
			$.get("/AIF/CheckID", function(res){
				var message = $.parseJSON(res);
				if(message.code != 2) {	
					alert("已绑定微信！");
					location.href="personinfo.html";
				} 
			});

		
	});
	}
});


function bindwx(){
	$.get("/AIF/CheckLogin", function(res){
		var message = $.parseJSON(res);
		if(message.code == 0) {
			alert("请先登录！");
			location.href="login.html";
		} 
	});
	
	var ticket;
	//获取二维码
	$.get("/AIF/GetQRCode", function(res){
		ticket = res;
		var imgurl = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+ ticket;
		var imgCont = '<img src="'+imgurl+'" height="270px" width="270px"></img>';
		layer.open({
			area: ['300px', '320px'],
	        type: 1,
	        closeBtn: false,
	        title: "请使用微信扫描意下二维码",
	        shift: 2,
	        shadeClose: true,
	        content:"https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+ ticket
		});
	});	
	
	
	function getOpenId(){
		//轮询是否已经获取openId
		$.get('/AIF/GetOpenId', function(res){
			var message = $.parseJSON(res);
			if(message.code === 0) {
				//alert("获取到openId");
				var openId = message.openId;
				//存入数据库 openId, 用户id
				$.get('/AIF/GetUserId', function(res){
					var id = $.parseJSON(res).userId;
					var data = {id: id, openid: openId};
					$.post('/AIF/BindWechat', data, function(res){
						var code = $.parseJSON(res).code;
						if(code === 0) {
							alert($.parseJSON(res).info);
							location.href = "personinfo.html";
						}
					});
				});
				
			}
		});
	}
	
	//重复执行 
    window.setInterval(getOpenId,1500); 
    
    
}
bindwx();
$("#searchclick").click(function(){
	var proname = $("#proname").val();
	
	var url = encodeURI("search.html?proname="+proname);
    var enurl = encodeURI(url);//使用了两次encodeRUI进行编码
	
	location.href = enurl;
});

