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

////加载页面
var url = location.href;

function loadPage() {
	
	var data = {};  //page:page 
	$.ajax({
		url: "/AIF/UncheckedPro",
		async: false,
		type: "POST",
		data: data,
		success: function(res){
			var txt = '';
			var code = $.parseJSON(res).code;
			
		if(code == 0){
			pages = $.parseJSON(res).pages;
			var list = $.parseJSON(res).list;
			var name, area, price, introduction, id;
			var uncheckIndex=1;
			
			list.forEach(function(item, index, array){
					id = item.proId;
					name = item.name;
					area = item.area;
					price = item.price;
					introduction = item.introduction;

			        txt += '<tr>'+
			        '<td class="center">'+
			        	'<label>'+
			        		'<input type="checkbox" class="ace" />'+
			        		'<span class="lbl"></span>'+
			        	'</label>'+
			        '</td>'+
			        '<td>' + (uncheckIndex++) + '</td>'+
			        '<td>'+
			        	'<a href="#">'+name+'</a>'+
			        '</td>'+
			        '<td>'+area+'</td>'+
			        '<td class="hidden-480">'+price+'</td>'+


			        '<td class="hidden-480">'+introduction+'</td>'+
			        
			        '<input type="hidden" value="'+id+'" id="pro_id">'+

			        '<td>'+
			        	'<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'+
				        	'<a class="blue" href="recommendationRating.html?list_id='+id+'">'+
			        			'<i class="icon-zoom-in bigger-130"></i>'+
			        		'</a>'+
			        		
			        	'</div>'+
			        '</td>'+
			        '</tr>';   
			});
			console.log(txt);
			$("#unchecklistAdmin").append(txt);
		}
		}});
}
loadPage();