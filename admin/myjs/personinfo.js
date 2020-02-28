//同步设置
$.ajaxSetup({  
    async : false  
});  


function sendMessage(user_from){
			
			var content = $("#input"+user_from).val();
			var user_to = user_from;
			var data = {content:content, user_to:user_to};
			$.post("/AIF/SendMessage", data, function(res){
				var code = $.parseJSON(res).code;
				if(code === 0){
					alert("发送成功！");
					window.location.reload();
				} else if(code === 1){
					alert("发送失败！");
				}
			});
		}
		

//检查是否已登录
$.get("/AIF/CheckLogin", function(res){
	var message = $.parseJSON(res);
	//alert(message.code);
	if(message.code == 0) {
		alert("请先登录");
		location.href="login.html";
	} 
});

//判断用户身份
$.get("/AIF/CheckAdmin", function(res){
	var message = $.parseJSON(res);
	if(message.code === 0){
	
		
		//显示用户信息
		//js中null+"kkk" = "nullkkk"
		$.get("/AIF/GetUserInfo", function(res){
			var message = $.parseJSON(res);
			var username = message.username;
			var telephone = message.telephone;
			var email = message.email;
			var sex = message.sex;
			var birthday = message.birthday;
			var address = message.address;
			var introduction = message.introduction;
			var identified = message.identified;
			var bindwx = message.bindwx;
			var photo = message.photo;
			if(telephone == undefined) { telephone = ""};
			if(sex == 0) { sex = ""};
			if(birthday == undefined) { birthday = ""};
			if(address == undefined) { address = ""};
			if(introduction == undefined) { introduction = ""};
			if(photo == undefined || photo=="") { 
				photo = "images/blank.PNG";
			} else{
				//改为相对路径
				photo = photo.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
				//console.log("photo:"+photo);
			}
			
			
			if(sex == 1){
				$("#sex").text("男");
			}
			else if(sex == 2){
				$("#sex").text("女");
			}else if(sex==3){
				$("#sex").text("保密");
			}
			
			
			$("#username").text(username);
			$("#telephone").text(telephone);
			$("#email").text(email);
			//$("#sex").text(sex);
			$("#birthday").text(birthday);
			$("#address").text(address);
			$("#introduction").text(introduction);
			$("#photo").attr("src", photo);
			var txt = '';
			if(identified == 0) {
				txt += '<tr>'+
		         '<td width="20%">身份验证</td>'+
		         '<td><a href="identify.html" class="style_a_1"><span class="label label-warning">去验证</span></a>'+
		         '</td>'+
		         '</tr>';
			} else{
				txt += '<tr>'+
				'<td width="20%">身份验证</td>'+
		        '<td><span class="label label-success">已验证</span>'+
		        '</td>'+
		        '</tr>';
			}
			
			if(bindwx == 0){
				txt += '<tr>'+
		        '<td width="20%">微信绑定</td>'+
		        '<td><a href="bindwx.html" class="style_a_1"><span class="label label-warning">去绑定</span></a>'+
		        '</td>'+
		        '</tr>';
				
			}else{
		    		txt += '<tr>'+
		    		'<td width="20%">微信绑定</td>'+
		            '<td><span class="label label-success">已绑定</span>'+
		            '</td>'+
		            '</tr>';
		    }
			$("#info").append(txt);
			
			$("[name='username']").val(username);
			$("[name='telephone']").val(telephone);
			$("[name='sex']").val(sex);
			$("[name='birthday']").val(birthday);
			$("[name='address']").val(address);
			$("[name='introduction']").val(introduction);
			
			//header部分
			$("#photoh").attr("src", photo);
			$("#usernameh").text(username);
		});

		//我发起的
		var data = {type:1,page:1};
		$.post("/AIF/GetEstablish",data, function(res){
			var message = $.parseJSON(res);
			var txt = '';
			if(message.code === 0){
				var list = message.list;
				list.forEach(function(item, index, array){
								id = item.proId;
								name = item.name;
								area = item.area;
								introduction = item.introduction;
								price = item.price;
								cover = item.cover;
								//cover = cover.replace(/F:\/workspace\/AIF\/WebContent\//,"");
								cover = cover.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
								if(index < 3) {
									 txt += '<div class="col-md-4 text3_self">'+
							            '<a href="project_content.html?id='+id+'"><img class="img-circle img_self" src="'+cover+'" alt="firefox"></a>'+
							            '<p>'+area+'</p>'+
							            '<h2>'+name+'</h2>'+
							            '<h4>'+price+'元'+'</h4>'+
							            '<p>'+introduction+'</p>'+
							        '</div>';	
								}
						       
				});
				$("#myestablish1").append(txt);
				
			}
		});
		var data = {type:2,page:1};
		$.post("/AIF/GetEstablish",data, function(res){
			var message = $.parseJSON(res);
			var txt = '';
			if(message.code === 0){
				var list = message.list;
				list.forEach(function(item, index, array){
								id = item.proId;
								name = item.name;
								area = item.area;
								introduction = item.introduction;
								price = item.price;
								cover = item.cover;
								//cover = cover.replace(/F:\/workspace\/AIF\/WebContent\//,"");
								cover = cover.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
								if(index < 3) {
									 txt += '<div class="col-md-4 text3_self">'+
							            '<a href="project_content.html?id='+id+'"><img class="img-circle img_self" src="'+cover+'" alt="firefox"></a>'+
							            '<p>'+area+'</p>'+
							            '<h2>'+name+'</h2>'+
							            '<h4>'+price+'元'+'</h4>'+
							            '<p>'+introduction+'</p>'+
							        '</div>';	
								}
						       
				});
				$("#myestablish2").append(txt);
				
			}
		});
		
		//我投资的
		var data = {type:3,page:1};
		$.post("/AIF/GetInvestment",data, function(res){
			var message = $.parseJSON(res);
			var txt = '';
			if(message.code === 0){
				var list = message.list;
				list.forEach(function(item, index, array){
								id = item.proId;
								name = item.name;
								area = item.area;
								introduction = item.introduction;
								price = item.price;
								cover = item.cover;
								//cover = cover.replace(/F:\/workspace\/AIF\/WebContent\//,"");
								cover = cover.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
								if(index < 3) {
									 txt += '<div class="col-md-4 text3_self">'+
							            '<a href="project_content.html?id='+id+'"><img class="img-circle img_self" src="'+cover+'" alt="firefox"></a>'+
							            '<p>'+area+'</p>'+
							            '<h2>'+name+'</h2>'+
							            '<h4>'+price+'元'+'</h4>'+
							            '<p>'+introduction+'</p>'+
							        '</div>';	
								}
						       
				});
				$("#myinvestiment1").append(txt);
				
			}
		});
		var data = {type:4,page:1};
		$.post("/AIF/GetInvestment",data, function(res){
			var message = $.parseJSON(res);
			var txt = '';
			if(message.code === 0){
				var list = message.list;
				list.forEach(function(item, index, array){
								id = item.proId;
								name = item.name;
								area = item.area;
								introduction = item.introduction;
								price = item.price;
								cover = item.cover;
								//cover = cover.replace(/F:\/workspace\/AIF\/WebContent\//,"");
								cover = cover.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
								if(index < 3) {
									 txt += '<div class="col-md-4 text3_self">'+
							            '<a href="project_content.html?id='+id+'"><img class="img-circle img_self" src="'+cover+'" alt="firefox"></a>'+
							            '<p>'+area+'</p>'+
							            '<h2>'+name+'</h2>'+
							            '<h4>'+price+'元'+'</h4>'+
							            '<p>'+introduction+'</p>'+
							        '</div>';	
								}
						       
				});
				$("#myinvestiment2").append(txt);
				
			}
		});
		
		//我关注的
		var data = {type:5,page:1};
		$.post("/AIF/GetFocus",data, function(res){
			var message = $.parseJSON(res);
			var txt = '';
			if(message.code === 0){
				var list = message.list;
				list.forEach(function(item, index, array){
								id = item.proId;
								name = item.name;
								area = item.area;
								introduction = item.introduction;
								price = item.price;
								cover = item.cover;
								//cover = cover.replace(/F:\/workspace\/AIF\/WebContent\//,"");
								cover = cover.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
								if(index < 3) {
									 txt += '<div class="col-md-4 text3_self">'+
							            '<a href="project_content.html?id='+id+'"><img class="img-circle img_self" src="'+cover+'" alt="firefox"></a>'+
							            '<p>'+area+'</p>'+
							            '<h2>'+name+'</h2>'+
							            '<h4>'+price+'元'+'</h4>'+
							            '<p>'+introduction+'</p>'+
							        '</div>';	
								}
						       
				});
				$("#myfocus1").append(txt);
				
			}
		});
		var data = {type:6,page:1};
		$.post("/AIF/GetFocus",data, function(res){
			var message = $.parseJSON(res);
			var txt = '';
			if(message.code === 0){
				var list = message.list;
				list.forEach(function(item, index, array){
								id = item.proId;
								name = item.name;
								area = item.area;
								introduction = item.introduction;
								price = item.price;
								cover = item.cover;
								//cover = cover.replace(/F:\/workspace\/AIF\/WebContent\//,"");
								cover = cover.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
								if(index < 3) {
									 txt += '<div class="col-md-4 text3_self">'+
							            '<a href="project_content.html?id='+id+'"><img class="img-circle img_self" src="'+cover+'" alt="firefox"></a>'+
							            '<p>'+area+'</p>'+
							            '<h2>'+name+'</h2>'+
							            '<h4>'+price+'元'+'</h4>'+
							            '<p>'+introduction+'</p>'+
							        '</div>';	
								}
						       
				});
				$("#myfocus2").append(txt);
				
			}
		});		
		
		//我的消息
		$.get("/AIF/GetTalkList", function(res){
			var message = $.parseJSON(res);
			var list = message.list;
			var name,user_from;
			var txt = '';
			var modaltxt = '';
			
			
			list.forEach(function(item, index, array){
				var code = item.code;
				name = item.name;
				user_from = item.user_from;
				if(code === 1){
					//未读
					var count = item.count;
					txt += '<a href="" data-toggle="modal" data-target="#myModal'+user_from+'">'+
							'<li class="list-group-item list-style-none">'+name+'</li>'+
							'</a>'+
							'<span class="label label-warning">'+count+'条未读</span>';
				} else if(code === 2){
					//已读
					txt += '<a href="" data-toggle="modal" data-target="#myModal'+user_from+'">'+
					'<li class="list-group-item list-style-none">'+name+'</li>'+
					'</a>';
				}
				var data = {user_from: user_from};
				var user_from_name;
				var messagetxt = '';
				$.post("/AIF/GetTalkContent",data, function(res){
					var message = $.parseJSON(res);
					var name = message.myName;
					user_from_name = message.name;
					var list = message.list;
					
					list.forEach(function(item, index, array){
					//	alert(item);
						var code = item.code;
					//	alert(code);
						var content = item.content;
					//	alert(content);
						var time = item.time;
					//	alert(time);
						var date = new Date(); 
						 date.setTime(time); 
					//	 alert(date);
						  
							    var year = date.getFullYear();    
							    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;    
							    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();    
							    var hour = date.getHours()< 10 ? "0" + date.getHours() : date.getHours();    
							    var minute = date.getMinutes()< 10 ? "0" + date.getMinutes() : date.getMinutes();    
							    var second = date.getSeconds()< 10 ? "0" + date.getSeconds() : date.getSeconds();    
						var dateType = year + "-" + month + "-" + day+" "+hour+":"+minute+":"+second;    
						//	alert(dateType);
					
						if(code === 1){
							//我是发送者
							messagetxt += name + " "+dateType+"\n"+content+"\n";
						} else if(code ===2){
							//我是接收者
							messagetxt += user_from_name + " "+dateType+"\n"+content+"\n";
						}
					//	alert(messagetxt);
						
						
					});
					modaltxt += '<div class="modal fade" id="myModal'+user_from+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
				    '<div class="modal-dialog">'+
		        '<div class="modal-content">'+
		            '<div class="modal-header">'+
		                '<h4 class="modal-title" id="myModalLabel">'+
		                    name+
		                '</h4>'+
		            '</div>'+
		            '<textarea style="width:100%;height:300px" disabled="disabled">'+messagetxt+'</textarea>'+
		            '<input style="width:100%;height:300px" id="input'+user_from+'" />'+
		            '<div class="modal-footer">'+
		                '<button type="button" class="btn btn-default" data-dismiss="modal">关闭'+
		                '</button>'+
		                '<button type="button" id="btn'+user_from+'" onclick="sendMessage('+user_from+')" class="btn btn-primary">'+
		                   ' 发送'+
		                '</button>'+
		            '</div>'+
		        '</div><!-- /.modal-content -->'+
		    '</div><!-- /.modal -->'+
		'</div>';
					
			});
				
				
				
			
			});
			
			$("body").append(modaltxt);
		
			$("#noticeList").append(txt);
			
			
		});
		
		
	
	} 
	/*else {
		//管理员
		
		//header部分
		$.get("/AIF/GetUserInfo", function(res){
			var message = $.parseJSON(res);
			var username = message.username;
			var photo = message.photo;
			if(photo == undefined || photo=="") { 
				photo = "images/blank.PNG";
			} else{
				//改为相对路径
				photo = photo.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
				//console.log("photo:"+photo);
			}
		$("#photoh").attr("src", photo);
		$("#usernameh").text(username);
	//	$("#establishBtn").remove();
		});
		//待审核
		$("#infoshow").remove();
		$("#personinfoli").remove();
		$("#myfocusli").remove();
		$("#myestablishli").remove();
		$("#myinvestimentli").remove();
		$("#personinfo").remove();
		$("#myfocus").remove();
		
		$("#myestablish").remove();
		$("#myinvestiment").remove();
		$("#mynoticeli").remove();
		$("#mynotice").remove();
		$("#tocheck").removeClass("fade");
		$("#tocheck").addClass("active");
		
		var pages = 0;
		var page = 1;
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
			page = res["page"];
			
			if(page == undefined){
				page = 1;
			}
		}
		var data = { page:page};
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
			//	alert(pages);
				var list = $.parseJSON(res).list;
				var name, area, introduction, cover, price, id;
				list.forEach(function(item, index, array){
			//		alert(item.name);
						id = item.proId;
						name = item.name;
						area = item.area;
						introduction = item.introduction;
						price = item.price;
						cover = item.cover;
						cover = cover.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
				        txt = '<div class="col-md-4 text3_self">'+
				            '<a href="review.html?id='+id+'"><img class="img-circle img_self" src="'+cover+'" alt="firefox"></a>'+
				            '<p>'+area+'</p>'+
				            '<h2>'+name+'</h2>'+
				            '<h4>'+price+'元'+'</h4>'+
				            '<p>'+introduction+'</p>'+
				        '</div>';	
				        if(index<3){
				        	$("#tochecklist1").append(txt);
				        }
				        else if(index<6 ){
				        	$("#tochecklist2").append(txt);
				        }
				        else if(index<9 ){
				        	$("#tochecklist3").append(txt);
				        }
				});
				
			}
			}});
	
	//分页
	$("#pages").text(pages);
	$("#page").val(page);
	$("#gotoBtn").click(function(){
		page = $("#page").val();
		if(page >=1 && page <= pages) {
			location.href="personinfo.html?page="+page;
		} else{
			alert("该页面不存在");
			location.reload();
		}
	});
	$("#lastPage").click(function(res){
		page -- ;
		if(page >=1 && page <= pages) {
			location.href="personinfo.html?page="+page;
		} else{
			alert("该页面不存在");
			location.reload();
		}
	});
	$("#nextPage").click(function(res){
		page ++ ;
		if(page >=1 && page <= pages) {
			location.href="personinfo.html?page="+page;
		} else{
			alert("该页面不存在");
			location.reload();
		}
	});
	}*/
});



$("#searchclick").click(function(){
	var proname = $("#proname").val();
	
	var url = encodeURI("search.html?proname="+proname);
    var enurl = encodeURI(url);//使用了两次encodeRUI进行编码
	
	location.href = enurl;
});
