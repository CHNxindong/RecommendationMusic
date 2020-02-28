$.get("/AIF/CheckLogin", function(res){
	var message = $.parseJSON(res);
	if(message.code === 0){
		alert("请登录！");
		location.href="../loginAdmin.html";
	}else{		
		$.get("/AIF/CheckAdmin", function(res){
			var message = $.parseJSON(res);
			if(message.code === 0){
				alert("不是管理员身份！");
				location.href="../loginAdmin.html";
			}else{
				var usernameTxt = '';
				var username;
				$.get("/AIF/GetUserInfo", function(res){
					var message = $.parseJSON(res);
					username = message.username;
					usernameTxt += '<small>您好,</small>' + username;
					$("#usernameAdmin").append(usernameTxt);
				});
			}	
		});
	}	
});

var url = location.href;

function loadPage() {
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
	
	var id = res["project_id"];

} else {
	
}

	var data = {id : id};  // , page:page 
	$.ajax({
		url: "/AIF/GetTradeListAdmin",
		async: false,
		type: "POST",
		data: data,
		success: function(res){
			var txt = '';
			var code = $.parseJSON(res).code;
			
		if(code == 0){
			var list = $.parseJSON(res).list;
			var time, price, user_from, user_to;  //, id;
			
			var tradeIndex=1;
			list.forEach(function(item, index, array){
				time = item.time;
				price = item.price;
				user_from = item.user_from;
				user_to = item.user_to;
				time = fmtDate(time);

			        txt += '<tr>'+
			        '<td class="center">'+
			        	'<label>'+
			        		'<input type="checkbox" class="ace" />'+
			        		'<span class="lbl"></span>'+
			        	'</label>'+
			        '</td>'+
			        '<td>' + (tradeIndex++) + '</td>'+
			        '<td>'+
			        	'<a href="#">'+time+'</a>'+
			        '</td>'+
			        '<td>'+price+'</td>'+
			        '<td class="hidden-480">'+user_from+'</td>'+


			        '<td class="hidden-480">'+user_to+'</td>'+

			        '<td></td>'+
			        '</tr>';   
			});
			console.log(txt);
			$("#tradeinfoAdmin").append(txt);
		}
		}});
	
	var data1 = {id : id};  // , page:page 
	$.ajax({
		url: "/AIF/GetProDetail",
		async: false,
		type: "POST",
		data: data1,
		success: function(res){
			var txt1 = '';
			var data = $.parseJSON(res);
			var name, type1, type2, province, area, introduction, output, time, price, price_reason, detail;  //, id;
			
			name = data.name;
			type1 = data.type1;
			type2 = data.type2;
			province = data.province;
			area = data.area;
			introduction = data.introduction;
			output = data.output;
			time = data.time;
			price = data.price;
			price_reason = data.price_reason;
			detail = data.detail;

			        txt1 += '<div class="profile-info-row">'+
					'<div class="profile-info-name"> 名称 </div>'+
					
					'<div class="profile-info-value">'+
						'<span class="editable">'+name+'</span>'+
					'</div>'+
				'</div>'+

				'<div class="profile-info-row">'+
					'<div class="profile-info-name"> 大类 </div>'+

					'<div class="profile-info-value">'+
						'<span class="editable">'+type1+'</span>'+
					'</div>'+
				'</div>'+
				
				'<div class="profile-info-row">'+
					'<div class="profile-info-name"> 小类 </div>'+

					'<div class="profile-info-value">'+
						'<span class="editable">'+type2+'</span>'+
					'</div>'+
				'</div>'+
				
				'<div class="profile-info-row">'+
					'<div class="profile-info-name"> 省区 </div>'+

					'<div class="profile-info-value">'+
						'<span class="editable">'+province+'</span>'+
					'</div>'+
				'</div>'+
				
				'<div class="profile-info-row">'+
					'<div class="profile-info-name"> 地区 </div>'+

					'<div class="profile-info-value">'+
						'<span class="editable">'+area+'</span>'+
					'</div>'+
				'</div>'+
				
				'<div class="profile-info-row">'+
					'<div class="profile-info-name"> 一句话介绍 </div>'+

					'<div class="profile-info-value">'+
						'<span class="editable">'+introduction+'</span>'+
					'</div>'+
				'</div>'+
				
				'<div class="profile-info-row">'+
					'<div class="profile-info-name"> 产出 </div>'+

					'<div class="profile-info-value">'+
						'<span class="editable">'+output+'</span>'+
					'</div>'+
				'</div>'+
				
				'<div class="profile-info-row">'+
					'<div class="profile-info-name"> 价格 </div>'+

					'<div class="profile-info-value">'+
						'<span class="editable">'+price+'</span>'+
					'</div>'+
				'</div>'+
				
				'<div class="profile-info-row">'+
					'<div class="profile-info-name"> 时长 </div>'+

					'<div class="profile-info-value">'+
						'<span class="editable">'+((((time/1000)/60)/60)/24)/30+'个月</span>'+
					'</div>'+
				'</div>'+
			        
			    '<div class="profile-info-row">'+
					'<div class="profile-info-name"> 资金详情</div>'+

					'<div class="profile-info-value">'+
						'<span class="editable">'+price_reason+'</span>'+
					'</div>'+
				'</div>'+
			        
			    '<div class="profile-info-row">'+
					'<div class="profile-info-name"> 详细介绍 </div>'+

					'<div class="profile-info-value">'+
						'<span class="editable">'+detail+'</span>'+
					'</div>'+
				'</div>';
			console.log(txt1);
			$("#projectinfoAdmin").append(txt1);
		}});
	
}
loadPage();

function fmtDate(time){
    var date =  new Date(time);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}
		