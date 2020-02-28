//同步设置
$.ajaxSetup({  
    async : false  
});  

var proId;
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
	
	proId = res["proId"];
}
//console.log("proId:"+proId);
function getPayState(){
	//轮询是否已经付费
	var data = {proId:proId};
	$.post('AIF/GetPayState', data, function(res){
		var message = $.parseJSON(res);
		if(message.code == 0) {
			alert("支付成功！");
			//进行企业转账
			$.get('AIF/TransferAccount', function(res){
				var code = $.parseJSON(res).code;
				if(code === 0) {
					alert("转账成功！");
					//修改数据库
					$.get('AIF/AccountDB', function(res){
						if($.parseJSON(res).code=== 0){
							alert("修改数据库成功！");
							location.href = "personinfo.html";
						}
					});

					
				} else {
					alert("转账失败！");
					//处理
					//退回！！！
					location.href = "personinfo.html";
				}
			});
			
			
		} else {
			//暂未支付/支付失败
			
		}
	});
}

function pay(){

	var data = {proId:proId};
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
	
	//判断是否认证和绑定
	$.get("/AIF/CheckID", function(res){
		var message = $.parseJSON(res);
		if(message.code == 1) {
			alert("请先进行实名认证！");
			location.href="identify.html";
		} 
		if(message.code == 2) {
			alert("请先绑定微信！");
			location.href="bindwx.html";
		} 
	});
	
	//通过proid获取proName proPrice
	var proName;
	var proPrice;
	$.post("/AIF/GetProInfo", data, function(res){
		var message = $.parseJSON(res);
		if(message.code == 0) {
			proName = message.proName;
			proPrice = message.proPrice/10000;
			
			$("#proName").text(proName);
			$("#proPrice").text(proPrice);
			
			$("#payBtn").click(function(){
				//alert("!!!");
				//打开微信二维码
				layer.open({
					area: ['300px', '300px'],
			        type: 2,
			        closeBtn: false,
			        title: false,
			        shift: 2,
			        shadeClose: true,
			        content:'/AIF/QRCode?proName=' + proName + '&proPrice='+proPrice+ '&proId='+proId,
			    });
			//	alert("1");
			//	重复执行 
			    window.setInterval("getPayState()",5000); 
			//	alert("2");
			});
			
			
		} else {
			alert(message.info);
			//location.href = "project_content.html";
		}
		
	});


	
	
}


pay();
$("#searchclick").click(function(){
	var proname = $("#proname").val();
	
	var url = encodeURI("search.html?proname="+proname);
    var enurl = encodeURI(url);//使用了两次encodeRUI进行编码
	
	location.href = enurl;
});