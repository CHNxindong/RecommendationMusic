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

//加载页面
var url = location.href;
var projectlistSize = 0;

function loadPage() {
	
	var data = {}; //page:page
	$.ajax({
		url: "/AIF/GetProListAdmin",
		async: false,
		type: "POST",
		data: data,
		success: function(res){
			var txt = '';
			var code = $.parseJSON(res).code;
			
		if(code == 0){
			
			var list = $.parseJSON(res).list;
			var name, establish_name, owner_man, pro_state, id;
			var projectIndex=1;
			
			projectlistSize = list.length;
			
			list.forEach(function(item, index, array){
					id = item.id;
					name = item.name;
					establish_name = item.establish_name;
					owner_name = item.owner_name;
					pro_state = item.pro_state;
					
			        txt += '<tr>'+
			        '<td class="center">'+
			        	'<label>'+
			        		'<input type="checkbox" class="ace" />'+
			        		'<span class="lbl"></span>'+
			        	'</label>'+
			        '</td>'+
			        '<td>'+projectIndex+'</td>'+
			        '<td>'+
			        	'<a href="#">'+name+'</a>'+
			        '</td>'+
			        '<td>发起人：'+establish_name+' </td>'+
			        '<td class="hidden-480">拥有人：'+owner_name+' </td>'+

			        '<input type="hidden" value="'+id+'" id="pro_id'+projectIndex+'">'+
			        '<td class="hidden-480">状态：'+pro_state+' </td>'+

			        '<td>'+
			        	'<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'+
			        		'<a class="blue" href="projectinfo.html?project_id='+id+'">'+
			        			'<i class="icon-zoom-in bigger-130"></i>'+
			        		'</a>'+

			        		'<button class="red" id="deletepro'+projectIndex+'">'+
			        			'<i class="icon-trash bigger-130"></i>'+
			        		'</button>'+
			        	'</div>'+

			        	
			        '</td>'+
			        '</tr>';
			        
			        projectIndex++;
			});
			
			console.log(txt);
			$("#projectlistAdmin").append(txt);
		}
		}});
}
loadPage();

//JS的闭包
var clickEvent = function(i) {
	  // 这儿出现了一个新的scope
	  return function(){			
			var pro_id = $("#pro_id"+i).val();
			
			var data = {pro_id: pro_id};
			
			$.post("/AIF/DeletePro", data, function(res){
				var message = $.parseJSON(res);
				if(message.code == 0){
					alert("操作成功");
					location.href = "projectlist.html";
				} else {
					alert("请重新操作");
				}
			});   
	  };
};

for(var i=1; i <= projectlistSize; i++){
	
	$("#deletepro"+i).click(clickEvent(i));
}