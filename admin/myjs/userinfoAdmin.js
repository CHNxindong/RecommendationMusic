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
		
		var user_id = res["user_id"];
	
	}

	var data = {userId : user_id};  // , page:page
	$.ajax({
		url: "/datacal/getUserById",
		async: false,
		type: "GET",
		data: data,
		success: function(res){
			var txt = '';
			var data = $.parseJSON(res);
			var list_username, email, telephone, introduction, address, birthday, sex, identified, bindwx, photo;  //, id;

				list_username = data.username;
				
				email = data.email;
				if("" == email){
					email = "未填写";
				}
				if(undefined == email){
					email = "未填写";
				}
				
				telephone = data.telephone;
				if("" == telephone){
					telephone = "未填写";
				}
				if(undefined == telephone){
					telephone = "未填写";
				}
				
				introduction = data.introduction;
				if("" == introduction){
					introduction = "未填写";
				}
				if(undefined == introduction){
					introduction = "未填写";
				}
				
				address = data.address;
				if("" == address){
					address = "未填写";
				}
				if(undefined == address){
					address = "未填写";
				}
				
				birthday = data.birthday;
				if(null == birthday){
					birthday = "未填写";
				}
				if(undefined == birthday){
					birthday = "未填写";
				}
				
				sex = data.sex;
				if(0 == sex){
					sex = "未填写";
				}
				if(1 == sex){
					sex = "男";
				}
				if(2 == sex){
					sex = "女";
				}
				if(3 == sex){
					sex = "保密";
				}
				
				identified = data.identified;
				if(0 == identified){
					identified = "未验证";
				}
				if(1 == identified){
					identified = "已验证";
				}
				
				bindwx = data.bindwx;
				if(0 == bindwx){
					bindwx = "未绑定";
				}
				if(1 == bindwx){
					bindwx = "已绑定";
				}
				
				photo = data.photo;
				if(photo != null){
					photo = photo.split("/")[photo.split("/").length-1];
				}

			        txt += '<div class="row">'+
					'<div class="col-xs-12 col-sm-3 center">'+
					'<span class="profile-picture">'+
						'<img class="editable img-responsive" id="avatar2" src="../photos/'+photo+'" />'+
					'</span>'+

					'<div class="space space-4"></div>'+
					
					'<a href="#" class="btn btn-sm btn-block btn-success">'+
						'<i class="icon-plus-sign bigger-120"></i>'+
						'<span class="bigger-110">身份验证：'+identified+'</span>'+
					'</a>'+

					'<a href="#" class="btn btn-sm btn-block btn-primary">'+
						'<i class="icon-envelope-alt bigger-110"></i>'+
						'<span class="bigger-110">微信绑定：'+bindwx+'</span>'+
					'</a>'+

				'</div>'+

				'<div class="col-xs-12 col-sm-9">'+
					'<h4 class="blue">'+
						'<span class="middle">'+list_username+'</span>'+
					'</h4>'+

					'<div class="profile-user-info">'+
						'<div class="profile-info-row">'+
							'<div class="profile-info-name"> 用户名 </div>'+

							'<div class="profile-info-value">'+
								'<span>'+list_username+'</span>'+
							'</div>'+
						'</div>'+
						

//						'<div class="profile-info-row">'+
//							'<div class="profile-info-name"> 手机号 </div>'+
//
//							'<div class="profile-info-value">'+
//								'<span>'+telephone+'</span>'+
//							'</div>'+
//						'</div>'+
						
						'<div class="profile-info-row">'+
							'<div class="profile-info-name"> 手机号 </div>'+
	
							'<div class="profile-info-value">'+
								'<span>'+telephone+'</span>'+
							'</div>'+
						'</div>'+

						'<div class="profile-info-row">'+
							'<div class="profile-info-name"> 邮箱 </div>'+

							'<div class="profile-info-value">'+
								'<span>'+email+'</span>'+
							'</div>'+
						'</div>'+
						
						'<div class="profile-info-row">'+
							'<div class="profile-info-name"> 性别 </div>'+

							'<div class="profile-info-value">'+
								'<span>'+sex+'</span>'+
							'</div>'+
						'</div>'+

						'<div class="profile-info-row">'+
							'<div class="profile-info-name"> 生日 </div>'+

							'<div class="profile-info-value">'+
								'<span>'+birthday+'</span>'+
							'</div>'+
						'</div>'+

						'<div class="profile-info-row">'+
							'<div class="profile-info-name"> 地址 </div>'+

							'<div class="profile-info-value">'+
								'<span>'+address+'</span>'+
							'</div>'+
						'</div>'+
						
						'<div class="profile-info-row">'+
							'<div class="profile-info-name"> 自我介绍</div>'+

							'<div class="profile-info-value">'+
								'<span>'+introduction+'</span>'+
							'</div>'+
						'</div>'+
						
						
					'</div>'+

					'<div class="hr hr-8 dotted"></div>'+

				'</div>'+
			'</div>'+
			'<div class="space-20"></div>';
			console.log(txt);
			$("#userinfoAdmin").append(txt);
		}});
}
loadPage();