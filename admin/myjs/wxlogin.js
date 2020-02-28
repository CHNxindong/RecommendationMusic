function getLoginState(){
		 
	    	//轮询是否已经获取openId
			$.get('/AIF/GetOpenId', function(res){
				//alert(res);
				var message = $.parseJSON(res);
				if(message.code === 0) {
				//	alert("获取到openId");
					var openId = message.openId;
					var data = { openid: openId};
					$.post('/AIF/GetLoginState', data, function(res){
						var code = $.parseJSON(res).code;
						if(code === 0) {
							alert("登陆成功！");
							location.href = "index.html";
						} else {
							alert("您暂未绑定此微信！");
							location.href = "login.html";
						}
					});
				}
			});
	//console.log("1");
		}

function wxlogin(){
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
	        title: "请使用微信扫描以下二维码",
	        shift: 2,
	        shadeClose: true,
	        content:imgCont
		});
		
	});	
	 
	
	//重复执行
    window.setInterval(getLoginState,1500); 
    
   
}
wxlogin();

$("#searchclick").click(function(){
	var proname = $("#proname").val();
	
	var url = encodeURI("search.html?proname="+proname);
    var enurl = encodeURI(url);//使用了两次encodeRUI进行编码
	
	location.href = enurl;
});
