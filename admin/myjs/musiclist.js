<script src="../assets/js/jquery-1.10.2.min.js"></script>
	<script>
// $.get("/AIF/CheckLogin", function(res){
// 	var message = $.parseJSON(res);
// 	if(message.code === 0){
// 		alert("请登录！");
// 		location.href="../loginAdmin.html";
// 	}else{
// 		$.get("/AIF/CheckAdmin", function(res){
// 			var message = $.parseJSON(res);
// 			if(message.code === 0){
// 				alert("不是管理员身份！");
// 				location.href="../loginAdmin.html";
// 			}else{
// 				var usernameTxt = '';
// 				var username;
// 				$.get("/AIF/GetUserInfo", function(res){
// 					var message = $.parseJSON(res);
// 					username = message.username;
// 					usernameTxt += '<small>您好,</small>' + username;
// 					$("#usernameAdmin").append(usernameTxt);
// 				});
// 			}
// 		});
// 	}
// });

////加载页面
var url = location.href;

function loadPage() {


	$.ajax({
		url: "http://localhost:8081/datacal/getMusicList",
		async: false,
		type: "GET",
		success: function(res){
			var musicList = res;
			var musicIndex = 1;
			var txt = '';

			for(var i = 0;i < musicList.length;i++){
                txt += '<tr>'+
                    '<td class="center">'+
                    '<label>'+
                    '<input type="checkbox" class="ace" />'+
                    '<span class="lbl"></span>'+
                    '</label>'+
                    '</td>'+
                    '<td>' + (musicIndex++) + '</td>'+
                    '<td>'+
                    '<a href="#">'+musicList[i].name+'</a>'+
                    '</td>'+
                    '<td>'+musicList[i].name+'</td>'+
                    '<td class="hidden-480"></td>'+


                    '<td class="hidden-480"></td>'+

                    '<td>'+
                    '<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'+
                    '<a class="blue" href="">'+
                    '<i class="icon-zoom-in bigger-130"></i>'+
                    '</a>'+
                    '</div>'+
                    '</td>'+
                    '</tr>';
			}


			$("#musiclist").append(txt);
		}
		}});
}
loadPage();
</script>