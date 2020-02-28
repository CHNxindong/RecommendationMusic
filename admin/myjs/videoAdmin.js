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
var videoIndex=1;  //列表序号
var videolistSize = 0;

function loadPage() {
	
	var data = {}; //page:page 
	$.ajax({
		url: "/AIF/GetVideoList",
		async: false,
		type: "POST",
		data: data,
		success: function(res){
			var txt = '';
			var code = $.parseJSON(res).code;
			
		if(code == 0){
			var list = $.parseJSON(res).list;
			var name, video, pro_id, videoName;
			
			videolistSize = list.length;
			
			list.forEach(function(item, index, array){
				videoId = item.id;
				name = item.name;
				video = item.video;
				pro_id = item.pro_id;
				videoName = item.videoName;

			        txt += '<tr>'+
			        '<td class="center">'+
			        	'<label>'+
			        		'<input type="checkbox" class="ace" />'+
			        		'<span class="lbl"></span>'+
			        	'</label>'+
			        '</td>'+
			        '<td>' + videoIndex + '</td>'+
			        '<td><input type="text" id="name'+videoIndex+'" value='+name+' disabled="disabled"></td>'+
			        '<td><input type="hidden" id="pro_id'+videoIndex+'" value='+pro_id+'></td>'+
			        '<td><input type="text" id="videoName'+videoIndex+'" value="'+videoName+'"></td>'+
			        '<input type="hidden" value="'+videoId+'" id="videoId'+videoIndex+'">'+

			        '<td class="hidden-480"><input type="text" id="video'+videoIndex+'" value="'+video+'"></td>'+

			        '<td>'+
			        	'<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'+
				        	'<button class="blue" id="videoadd'+videoIndex+'">'+
			        			'<i class="icon-plus bigger-130"></i>'+
			        		'</button>'+
	        		
			        		'<button class="green" id="videosetting'+videoIndex+'">'+
			        			'<i class="icon-pencil bigger-130"></i>'+
			        		'</button>'+
			        		
			        		'<button class="red" id="deletevideo'+videoIndex+'">'+
		        			'<i class="icon-trash bigger-130"></i>'+
		        		'</button>'+
			        		
			        	'</div>'+
			        '</td>'+
			        '</tr>';
			        
			        videoIndex++;
			        
			});
			console.log(txt);
			$("#videoAdmin").append(txt);
		}
		}});
}
loadPage();

$("#videosetting").click(function(){
	
});

//JS的闭包
var videoAddEvent = function(i) {
	return function(){
		var name = $("#name"+i).val();
		var pro_id = $("#pro_id"+i).val();
		var videoName = $("#videoName"+i).val();
	
		var txt='';
		txt += '<tr>'+
	    '<td class="center">'+
	    	'<label>'+
	    		'<input type="checkbox" class="ace" />'+
	    		'<span class="lbl"></span>'+
	    	'</label>'+
	    '</td>'+
	    '<td>' + videoIndex + '</td>'+
	    '<td><input type="text" id="nameNew" value='+name+' disabled="disabled" /></td>'+
	    '<td><input type="hidden" id="pro_idNew" value='+pro_id+' /></td>'+
	    '<td><input type="text" id="videoNameNew" value='+videoName+' /></td>'+
	
	
	    '<td class="hidden-480"><input type="text" id="videoNew" /></td>'+
	
	    '<td>'+
	    	'<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'+	
	    		'<button class="blue" id="videonew">'+
	    			'<i class="icon-ok bigger-130"></i>'+
	    		'</button>'+
	    	'</div>'+
	    '</td>'+
	    '</tr>'; 
		
		videoIndex++;
	
		$("#videoAdmin").append(txt);
		
		$("#videonew").click(function(){	
			var video = $("#videoNew").val();
			var pro_id = $("#pro_idNew").val();
			var videoName = $("#videoNameNew").val();
			var type = 1;
			
			var data = {id:pro_id, road:video, videoName:videoName, type:type};
			
			$.post("/AIF/SetVideoRoad", data, function(res){
				var message = $.parseJSON(res);
				if(message.code == 0){
				//	alert(message.code);
					alert(message.info);
					location.reload();
				} else {
				//	alert(message.code);
					alert(message.info);
					location.href = "#";
				}
			});
		});
	};
};

var videoSettingEvent = function(i) {
	return function(){
		var video = $("#video"+i).val();
		var pro_id = $("#pro_id"+i).val();
		var videoName = $("#videoName"+i).val();
		var videoId = $("#videoId"+i).val();
		var type = 0;
		
		var data = {id:pro_id, road:video, videoName:videoName, type:type, videoId:videoId};
		
		$.post("/AIF/SetVideoRoad", data, function(res){
			var message = $.parseJSON(res);
			if(message.code == 0){
			//	alert(message.code);
				alert(message.info);
				location.reload();
			} else {
			//	alert(message.code);
				alert(message.info);
				location.href = "#";
			}
		});
	};
};

var videoDeleteEvent = function(i) {
	return function(){
		var videoId = $("#videoId"+i).val();
		
		var data = {videoId: videoId};
		
		$.post("/AIF/DeleteVideoAdmin", data, function(res){
			var message = $.parseJSON(res);
			if(message.code == 0){
				alert("操作成功");
				location.href = "video.html";
			} else {
				alert("请重新操作");
			}
		});
	};
};

for(var i=1; i <= videolistSize; i++){
	
	$("#videoadd"+i).click(videoAddEvent(i));
	$("#videosetting"+i).click(videoSettingEvent(i));
	$("#deletevideo"+i).click(videoDeleteEvent(i));
}