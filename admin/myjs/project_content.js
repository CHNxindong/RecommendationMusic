//同步设置
$.ajaxSetup({  
    async : false  
});  

//判断该项目状态是否可以展示
var proId = 0;
var area, type2;
var url = location.href;
if (url.split("?").length > 1) {
	url = url.split("?")[1];
	var para = url.split("&");
	var len = para.length;
	var res = {};
	var arr = [];
	for (var i = 0; i < len; i++) {
		arr = para[i].split("=");
		res[arr[0]] = arr[1];
	}

	proId = res["id"];
	// alert(proId);
}

var state = 0;
var data = {
	proId : proId
};
// 首先获取状态
$.ajax({
	url : "/AIF/GetProState",
	async : false,
	type : "POST",
	data : data,
	success : function(res) {
		state = $.parseJSON(res).state;
		console.log("state:" + state);
		if(state === 6) {
			alert("该项目已结束！");
			location.href = "personinfo.html";
		}
	}
});
var modaltxt = '';
// header
// 检查是否已登录
$.get("/AIF/CheckLogin",function(res) {
					var message = $.parseJSON(res);
					// alert(message.code);
					if (message.code == 0) {
						// alert("未登录");
						// 未登录 显示注册登录按钮
						
						var txt = '<li><a href="register.html">注册</a></li>'
								+ '<li><a href="login.html">登录</a></li>'
								+ '<li><a href="establish.html"><button class="btn btn-private btn-self2">发起项目</button></a></li>';
						$("#headerul").append(txt);

						// 只显示2 5
						if (state != 2 && state != 5) {
							alert("该页面不存在！");
							location.href = "category.html";
						} else 

							// 获取项目内容
							var data = {
								id : proId
							};
							// alert("data"+data);
							var name, price, pictureList, detail, introduction, runTime, time;
							$.ajax({
								url : "/AIF/GetProDetail",
								async : false,
								type : "POST",
								data : data,
								success : function(res) {
									var message = $.parseJSON(res);
									// alert(message);
									name = message.name;
									area = message.area;
									type2 = message.type2;
									price = message.price;
									pictureList = message.picture;
									detail = message.detail;
									introduction = message.introduction;
									runTime = message.runtime;
									time = message.time;
									owner_id = message.owner_id;
									establish_id = message.establish_id;
									// alert(name);
									// alert("owner_id"+owner_id);
									// alert("establish_id"+establish_id);
								}

							});

							// 根据owner_id 和establish_id 获取头像 用户名
							var owner_photo, owner_name, establish_photo, establish_name;
							var data = {
								userId : establish_id
							};
							$.ajax({
								url : "/AIF/GetUserInfoByID",
								async : false,
								type : "POST",
								data : data,
								success : function(res) {
									var message = $.parseJSON(res);
									establish_name = message.username;
									establish_photo = message.photo;
									if (establish_photo == undefined) {
										establish_photo = "images/blank.PNG";
									} else {
									establish_photo = establish_photo.replace(
											/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,
											"");}
									// alert(establish_photo);
								}
							});

							if (owner_id == 0) {
								// 暂无投资人
							} else {
								data = {
									userId : owner_id
								};
								$
										.ajax({
											url : "/AIF/GetUserInfoByID",
											async : false,
											type : "POST",
											data : data,
											success : function(res) {

												var message = $.parseJSON(res);
												owner_name = message.username;
												owner_photo = message.photo;
												if (owner_photo == undefined) {
													owner_photo = "images/blank.PNG";
												} else {
													owner_photo = owner_photo.replace(
														/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,
														"");}
												
											}
										});

							}
							// alert(establish_photo);
							// 显示信息
							$("#name").text(name);
							$("#area").text(area);
							$("#type2").text(type2);
							$("#price").text(price);
							$("#detail").html(detail);
							$("#price_comp").text(price);
							
							var txtp = '';
							pictureList
									.forEach(function(item, index, array) {
										var href = item
												.replace(
														/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,
														"");
										if (index == 0) {
											txtp += '<div class="item active">'
													+ '<a href="project_content.html"><img src="'
													+ href + '" alt="'
													+ (index + 1)
													+ 'slide"></a>' + '</div>';
										} else {
											txtp += '<div class="item">'
													+ '<a href="project_content.html"><img src="'
													+ href + '" alt="'
													+ (index + 1)
													+ 'slide"></a>' + '</div>';
										}

									});
							$("#picture").append(txtp);
							var timetxt = '';
							//console.log("runTime:" + runTime);
							//console.log("runTime:" + time);
							var time_left = 0;
							if (runTime == 0) {
								// 未启动
								time_left = ((time/(30*24))/3600)/1000;
								timetxt = '项目周期'+time_left+"个月";
								
							} else {
								var endtime = time + runTime;
								var date1 = new Date();
								date1.setTime(runTime);
								time_left = parseInt((((endtime-(new Date()).getTime())/(30*24))/3600)/1000);
								var date2 = new Date();
								date2.setTime(endtime);
								timetxt = date1.toLocaleDateString() + '启动项目，' + date2.toLocaleDateString() + '结束';
								$("#comp_title").append("本项目"+time_left+"个月后结束");
							}
							
							modaltxt = '';
							var projectinfotxt = '';
							// 投资 关注
							projectinfotxt += ' <div class="col-md-4 right-content">'
									+ '<br />'
									+ '<center><btn typ="button" onclick="buy()" class="btn btn-danger">我要投资</btn> <btn type="button" onclick="watch()" id="watchBtn" class="btn btn-primary">关注</btn></center>'
									+ '<hr>'
									+ '<h4>'
									+ introduction
									+ '</h4>'
									+ '<hr>'
									+ '<p>'
									+ timetxt
									+ '</p>'
									+ '<hr>' + '</div>' + '</br></br>';

							// 2 显示农户 5显示农户和当前持有人
							if (state == 2) {
								projectinfotxt += '<div class="col-md-4 right-content">'
										+ '<br />'
										+ '<h4>农户</h4>'
										+ '<hr>'
										+ '<div class="col-md-5">'
										+ '<a href="personinfo_show.html?userid='
										+ establish_id
										+ '"><img class="img-circle img_self2" src="'
										+ establish_photo
										+ '"></a>'
										+ '</div>'
										+ '<div class="col-md-7">'
										+ '<h5><span class="glyphicon glyphicon-user"></span>'
										+ establish_name
										+ ' </h5>'
										+ '<btn class="btn btn-primary" data-toggle="modal" data-target="#myModal1">聊 天</btn>'
										+ ' </div>'
										+ '<hr>'
										+ '<br />'
										+ ' </div>';
								modaltxt += '<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
							    '<div class="modal-dialog">'+
						        '<div class="modal-content">'+
						            '<div class="modal-header">'+
						                '<h4 class="modal-title" >'+
						                    establish_name+
						                '</h4>'+
						            '</div>'+
						            '<textarea id="content1" placeholder="有什么想对我说。。。。。。" style="width:100%;height:300px"></textarea>'+
						            '<div class="modal-footer">'+
						                '<button type="button" class="btn btn-default" data-dismiss="modal">关闭'+
						                '</button>'+
						                '<button type="button" onclick="sendMessage1('+establish_id+')" class="btn btn-primary">'+
						                    '发送'+
						                '</button>'+
						            '</div>'+
						        '</div><!-- /.modal-content -->'+
						    '</div><!-- /.modal -->'+
						'</div>';
							} else if (state == 5) {
								projectinfotxt += '<div class="col-md-4 right-content">'
										+ '<br />'
										+ '<h4>农户</h4>'
										+ '<hr>'
										+ '<div class="col-md-5">'
										+ '<a href="personinfo_show.html?userid='
										+ establish_id
										+ '"><img class="img-circle img_self2" src="'
										+ establish_photo
										+ '"></a>'
										+ '</div>'
										+ '<div class="col-md-7">'
										+ '<h5><span class="glyphicon glyphicon-user"></span>'
										+ establish_name
										+ ' </h5>'
										+ '<btn class="btn btn-primary" data-toggle="modal" data-target="#myModal1">聊 天</btn>'
										+ ' </div>'
										+ '<hr>'
										+ '<br />'
										+ ' </div>'
										+ '<div class="col-md-4 right-content">'
										+ '<br />'
										+ '<h4>项目持有人</h4>'
										+ '<hr>'
										+ '<div class="col-md-5">'
										+ '<a href="personinfo_show.html?userid='
										+ owner_id
										+ '"><img class="img-circle img_self2" src="'
										+ owner_photo
										+ '" ></a>'
										+ '</div>'
										+ '<div class="col-md-7">'
										+ '<h5><span class="glyphicon glyphicon-user"></span>'
										+ owner_name
										+ '</h5>'
										+ '<btn class="btn btn-primary" data-toggle="modal" data-target="#myModal2">聊 天</btn>'
										+ '</div>'
										+ '<hr>'
										+ '<br />'
										+ '</div>';
								modaltxt += '<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
							    '<div class="modal-dialog">'+
						        '<div class="modal-content">'+
						            '<div class="modal-header">'+
						                '<h4 class="modal-title" >'+
						                    establish_name+
						                '</h4>'+
						            '</div>'+
						            '<textarea id="content1" placeholder="有什么想对我说。。。。。。" style="width:100%;height:300px"></textarea>'+
						            '<div class="modal-footer">'+
						                '<button type="button" class="btn btn-default" data-dismiss="modal">关闭'+
						                '</button>'+
						                '<button type="button" onclick="sendMessage1('+establish_id+')" class="btn btn-primary">'+
						                    '发送'+
						                '</button>'+
						            '</div>'+
						        '</div><!-- /.modal-content -->'+
						    '</div><!-- /.modal -->'+
						'</div>';
								modaltxt += '<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
							    '<div class="modal-dialog">'+
						        '<div class="modal-content">'+
						            '<div class="modal-header">'+
						                '<h4 class="modal-title" >'+
						                    owner_name+
						                '</h4>'+
						            '</div>'+
						            '<textarea id="content2" placeholder="有什么想对我说。。。。。。" style="width:100%;height:300px"></textarea>'+
						            '<div class="modal-footer">'+
						                '<button type="button" class="btn btn-default" data-dismiss="modal">关闭'+
						                '</button>'+
						                '<button type="button" onclick="sendMessage2('+owner_id+')" class="btn btn-primary">'+
						                    '发送'+
						                '</button>'+
						            '</div>'+
						        '</div><!-- /.modal-content -->'+
						    '</div><!-- /.modal -->'+
						'</div>';
								

							}
							$("#projectinfo").append(projectinfotxt);
							$("body").append(modaltxt);
					
						
					} else {
						// alert("已登录");
						// 已登录 显示头像个人下拉框
						// 获取用户名和用户头像
						var username;
						var photo;
						$
								.get(
										"/AIF/GetUserInfo",
										function(res) {
											var message = $.parseJSON(res);
											username = message.username;
											photo = message.photo;
											if (photo == undefined) {
												photo = "images/blank.PNG";
											} else {
												photo = photo
														.replace(
																/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,
																"");
											}
											// console.log("username"+username);
											// console.log("photo"+photo);
											var txt = '<li class="dropdown">'
													+ '<a href="#" class="dropdown-toggle" data-toggle="dropdown">'
													+ '<img src="'
													+ photo
													+ '" class="nav-avatar" /><b>'
													+ username
													+ '</b>'
													+ '</a>'
													+ '<ul class="dropdown-menu">'
													+ '<li><a href="personinfo.html">个人空间</a></li>'
													+ '<li class="divider"></li>'
													+ '<li><a href="login.html">退出登录</a></li>'
													+ '</ul>'
													+ '</li>'
													+ '<li><a href="establish.html"><button class="btn btn-private btn-self2">发起项目</button></a></li>';
											$("#headerul").append(txt);

										});
						// 根据用户身份显示
						var data = {
							proId : proId
						};
						$
								.post(
										"/AIF/GetConnection",
										data,
										function(res) {
											var content = '';
											var code = $.parseJSON(res).code;
											//alert(code);
											if (code == 0 && state != 2
													&& state != 5) {

												alert("该页面不存在！");
												location.href = "category.html";
											} else {
												// 获取项目内容
												var data = {
													id : proId
												};
												var name, price, pictureList, detail, introduction, runTime, time, establish_id, owner_id;
												$
														.ajax({
															url : "/AIF/GetProDetail",
															async : false,
															type : "POST",
															data : data,
															success : function(
																	res) {
																var message = $
																		.parseJSON(res);
																name = message.name;
																area = message.area;
																type2 = message.type2;
																price = message.price;
																pictureList = message.picture;
																detail = message.detail;
																introduction = message.introduction;
																runTime = message.runtime;
																time = message.time;
																owner_id = message.owner_id;
																establish_id = message.establish_id;
															}
														});
												// 根据owner_id 和establish_id 获取头像
												// 用户名
												var owner_photo, owner_name, establish_photo, establish_name;
												var data = {
													userId : establish_id
												};
												$
														.ajax({
															url : "/AIF/GetUserInfoByID",
															async : false,
															type : "POST",
															data : data,
															success : function(
																	res) {
																var message = $
																		.parseJSON(res);
																establish_name = message.username;
																establish_photo = message.photo;
																if (establish_photo == undefined) {
																	establish_photo = "images/blank.PNG";
																} else {
																establish_photo = establish_photo.replace(
																		/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,
																		"");}
																
																// alert(establish_photo);
															}
														});

												if (owner_id == 0) {
													// 暂无投资人
												} else {
													data = {
														userId : owner_id
													};
													$
															.ajax({
																url : "/AIF/GetUserInfoByID",
																async : false,
																type : "POST",
																data : data,
																success : function(
																		res) {

																	var message = $
																			.parseJSON(res);
																	owner_name = message.username;
																	owner_photo = message.photo;
																	if (owner_photo == undefined) {
																		owner_photo = "images/blank.PNG";
																	} else {
																		owner_photo = owner_photo.replace(
																			/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,
																			"");}
																}
								 							});

												}
												// 显示信息
												$("#name").text(name);
												$("#area").text(area);
												$("#type2").text(type2);
												$("#price").text(price);
												$("#detail").text(detail);
												$("#price_comp").text(price);
												var txtp = '';
												pictureList
														.forEach(function(item,
																index, array) {
															var href = item
																	.replace(
																			/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,
																			"");
															if (index == 0) {
																txtp += '<div class="item active">'
																		+ '<a href="project_content.html"><img src="'
																		+ href
																		+ '" alt="'
																		+ (index + 1)
																		+ 'slide"></a>'
																		+ '</div>';
															} else {
																txtp += '<div class="item">'
																		+ '<a href="project_content.html"><img src="'
																		+ href
																		+ '" alt="'
																		+ (index + 1)
																		+ 'slide"></a>'
																		+ '</div>';
															}

														});
												$("#picture").append(txtp);
												var timetxt = '';
												var time_left = 0;
												if (runTime == 0) {
													// 未启动
													time_left = ((time/(30*24))/3600)/1000;
													timetxt = '项目周期'+time_left+"个月";
													
												} else {
													var endtime = time + runTime;
													var date1 = new Date();
													date1.setTime(runTime);
													time_left = parseInt((((endtime-(new Date()).getTime())/(30*24))/3600)/1000);
													var date2 = new Date();
													date2.setTime(endtime);
													timetxt = date1.toLocaleDateString() + '启动项目，' + date2.toLocaleDateString() + '结束';
													$("#comp_title").append("本项目"+time_left+"个月后结束");
												}
												$("#month_left").text(time_left);
												
												var modaltxt = '';
												var projectinfotxt = '';
												// alert("code"+code);
												if (code == 0) {
													
													//路人
													
													// 投资 关注
													projectinfotxt += ' <div class="col-md-4 right-content">'
															+ '<br />'
															+ '<center><btn onclick="buy()" typ="button" id="payBtn" class="btn btn-danger">我要投资</btn> <btn type="button" onclick="watch()" id="watchBtn" class="btn btn-primary">关注</btn></center>'
															+ '<hr>'
															+ '<h4>'
															+ introduction
															+ '</h4>'
															+ '<hr>'
															+ '<p>'
															+ timetxt
															+ '</p>'
															+ '<hr>'
															+ '</div>'
															+ '</br></br>';

													// 2 显示农户 5显示农户和当前持有人
													if (state == 2) {
														projectinfotxt += '<div class="col-md-4 right-content">'
																+ '<br />'
																+ '<h4>农户</h4>'
																+ '<hr>'
																+ '<div class="col-md-5">'
																+ '<a href="personinfo_show.html?userid='
																+ establish_id
																+ '"><img class="img-circle img_self2" src="'
																+ establish_photo
																+ '"></a>'
																+ '</div>'
																+ '<div class="col-md-7">'
																+ '<h5><span class="glyphicon glyphicon-user"></span>'
																+ establish_name
																+ ' </h5>'
																+ '<btn class="btn btn-primary" data-toggle="modal" data-target="#myModal1">聊 天</btn>'
																+ ' </div>'
																+ '<hr>'
																+ '<br />'
																+ ' </div>';
														modaltxt += '<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
													    '<div class="modal-dialog">'+
												        '<div class="modal-content">'+
												            '<div class="modal-header">'+
												                '<h4 class="modal-title" >'+
												                    establish_name+
												                '</h4>'+
												            '</div>'+
												            '<textarea id="content1" placeholder="有什么想对我说。。。。。。" style="width:100%;height:300px"></textarea>'+
												            '<div class="modal-footer">'+
												                '<button type="button" class="btn btn-default" data-dismiss="modal">关闭'+
												                '</button>'+
												                '<button type="button" onclick="sendMessage1('+establish_id+')" class="btn btn-primary">'+
												                    '发送'+
												                '</button>'+
												            '</div>'+
												        '</div><!-- /.modal-content -->'+
												    '</div><!-- /.modal -->'+
												'</div>';
													} else if (state == 5) {
														projectinfotxt += '<div class="col-md-4 right-content">'
																+ '<br />'
																+ '<h4>农户</h4>'
																+ '<hr>'
																+ '<div class="col-md-5">'
																+ '<a href="personinfo_show.html?userid='
																+ establish_id
																+ '"><img class="img-circle img_self2" src="'
																+ establish_photo
																+ '"></a>'
																+ '</div>'
																+ '<div class="col-md-7">'
																+ '<h5><span class="glyphicon glyphicon-user"></span>'
																+ establish_name
																+ ' </h5>'
																+ '<btn class="btn btn-primary" data-toggle="modal" data-target="#myModal1">聊 天</btn>'
																+ ' </div>'
																+ '<hr>'
																+ '<br />'
																+ ' </div>'
																+ '<div class="col-md-4 right-content">'
																+ '<br />'
																+ '<h4>项目持有人</h4>'
																+ '<hr>'
																+ '<div class="col-md-5">'
																+ '<a href="personinfo_show.html?userid='
																+ owner_id
																+ '"><img class="img-circle img_self2" src="'
																+ owner_photo
																+ '" ></a>'
																+ '</div>'
																+ '<div class="col-md-7">'
																+ '<h5><span class="glyphicon glyphicon-user"></span>'
																+ owner_name
																+ '</h5>'
																+ '<btn class="btn btn-primary" data-toggle="modal" data-target="#myModal2">聊 天</btn>'
																+ '</div>'
																+ '<hr>'
																+ '<br />'
																+ '</div>';
														modaltxt += '<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
													    '<div class="modal-dialog">'+
												        '<div class="modal-content">'+
												            '<div class="modal-header">'+
												                '<h4 class="modal-title" >'+
												                    establish_name+
												                '</h4>'+
												            '</div>'+
												            '<textarea id="content1" placeholder="有什么想对我说。。。。。。" style="width:100%;height:300px"></textarea>'+
												            '<div class="modal-footer">'+
												                '<button type="button" class="btn btn-default" data-dismiss="modal">关闭'+
												                '</button>'+
												                '<button type="button" onclick="sendMessage1('+establish_id+')" class="btn btn-primary">'+
												                    '发送'+
												                '</button>'+
												            '</div>'+
												        '</div><!-- /.modal-content -->'+
												    '</div><!-- /.modal -->'+
												'</div>';
														modaltxt += '<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
													    '<div class="modal-dialog">'+
												        '<div class="modal-content">'+
												            '<div class="modal-header">'+
												                '<h4 class="modal-title" >'+
												                    owner_name+
												                '</h4>'+
												            '</div>'+
												            '<textarea id="content2" placeholder="有什么想对我说。。。。。。" style="width:100%;height:300px"></textarea>'+
												            '<div class="modal-footer">'+
												                '<button type="button" class="btn btn-default" data-dismiss="modal">关闭'+
												                '</button>'+
												                '<button type="button" onclick="sendMessage2('+owner_id+')" class="btn btn-primary">'+
												                    '发送'+
												                '</button>'+
												            '</div>'+
												        '</div><!-- /.modal-content -->'+
												    '</div><!-- /.modal -->'+
												'</div>';

													} else{
														alert("暂无权限查看！");
														location.href = "category.html";
													}
													$("#projectinfo").append(
															projectinfotxt);
													$("body").append(modaltxt);

												} else if (code == 1) {
													// 发布者
													// 取消 通过审核
													if (state == 0) {
														// 可以取消
														projectinfotxt += '<div class="col-md-4 right-content">'
																+ '<br />'
																+ '<center><btn class="btn btn-primary" data-toggle="modal" data-target="#cancelProject">取消项目</btn></center>'
																+ '<hr>'
																+ '<h4>'
																+ introduction
																+ '</h4>'
																+ '<hr>'
																+ '<p>'
																+ timetxt
																+ '</p>'
																+ '<hr>'
																+ '</div>'
																+ '</br></br>';
													} else if (state == 1) {
														alert("已取消该项目！");
														location.href = "personinfo.html";
													} else if (state == 3) {
														// 未通过审核
														projectinfotxt += '<div class="col-md-4 right-content">'
																+ '<br />'
																+ '<center><btn class="btn btn-danger">未通过审核</btn></center>'
																+ '<hr>'
																+ '<h4>'
																+ introduction
																+ '</h4>'
																+ '<hr>'
																+ '<p>'
																+ timetxt
																+ '</p>'
																+ '<br />'
																+ '</div>';
													} else {
														// 通过审核
														if (state == 2) {
															// 可以取消
															projectinfotxt += '<div class="col-md-4 right-content">'
																	+ '<br />'
																	+ '<center><btn class="btn btn-danger">已通过审核</btn> <btn class="btn btn-primary" data-toggle="modal" data-target="#cancelProject">取消项目</btn></center>'
																	+ '<hr>'
																	+ '<h4>'
																	+ introduction
																	+ '</h4>'
																	+ '<hr>'
																	+ '<p>'
																	+ timetxt
																	+ '</p>'
																	+ '<hr>'
																	+ '</div>'
																	+ '</br></br>';
														} else {
															// 不能取消
															projectinfotxt += '<div class="col-md-4 right-content">'
																	+ '<br />'
																	+ '<center><btn class="btn btn-danger">已通过审核</btn></center>'
																	+ '<hr>'
																	+ '<h4>'
																	+ introduction
																	+ '</h4>'
																	+ '<hr>'
																	+ '<p>'
																	+ timetxt
																	+ '</p>'
																	+ '<br />'
																	+ '</div>';
															
															//显示日志 分页（5条）和上传日志
															getJournal();
															//显示该项目历史投资人、投资时间、投资金额
														}

													}

													// 项目持有人
													var modaltxt = '';
													if (owner_id != 0) {
														projectinfotxt += '<div class="col-md-4 right-content">'
																+ '<br />'
																+ '<h4>项目持有人</h4>'
																+ '<hr>'
																+ '<div class="col-md-5">'
																+ '<a href="personinfo_show.html?userid='
																+ owner_id
																+ '"><img class="img-circle img_self2" src="'
																+ owner_photo
																+ '" ></a>'
																+ '</div>'
																+ '<div class="col-md-7">'
																+ '<h5><span class="glyphicon glyphicon-user"></span>'
																+ owner_name
																+ '</h5>'
																+ '<btn class="btn btn-primary" data-toggle="modal" data-target="#myModal2">聊 天</btn>'
																+ '</div>'
																+ '<hr>'
																+ '<br />'
																+ '</div>';
														modaltxt += '<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
													    '<div class="modal-dialog">'+
												        '<div class="modal-content">'+
												            '<div class="modal-header">'+
												                '<h4 class="modal-title" >'+
												                    owner_name+
												                '</h4>'+
												            '</div>'+
												            '<textarea id="content2" placeholder="有什么想对我说。。。。。。" style="width:100%;height:300px"></textarea>'+
												            '<div class="modal-footer">'+
												                '<button type="button" class="btn btn-default" data-dismiss="modal">关闭'+
												                '</button>'+
												                '<button type="button" onclick="sendMessage2('+owner_id+')" class="btn btn-primary">'+
												                    '发送'+
												                '</button>'+
												            '</div>'+
												        '</div><!-- /.modal-content -->'+
												    '</div><!-- /.modal -->'+
												'</div>';
													}
													$("#projectinfo").append(
															projectinfotxt);
													$("body").append(modaltxt);

												} else if (code == 2) {
													// 投资人
													// 挂出 结束
													projectinfotxt += '<div class="col-md-4 right-content">'
															+ '<br />'
															+ '<center><btn class="btn btn-danger" data-toggle="modal" data-target="#putOut">我要挂出</btn> <btn class="btn btn-primary" data-toggle="modal" data-target="#stopProject">我要结束</btn></center>'
															+ '<hr>'
															+ '<h4>'
															+ introduction
															+ '</h4>'
															+ '<hr>'
															+ '<br />'
															+ '<p>'
															+ timetxt
															+ '</p>'
															+ '<hr>'
															+ '</div>'
															+ '</br></br>';

													//显示日志 分页（5条）
													getJournal();
													$("#writeBtn").remove();

													// 农户
													var modaltxt = '';
													projectinfotxt += '<div class="col-md-4 right-content">'
															+ '<br />'
															+ '<h4>农户</h4>'
															+ '<hr>'
															+ '<div class="col-md-5">'
															+ '<a href="personinfo_show.html?userid='
															+ establish_id
															+ '"><img class="img-circle img_self2" src="'
															+ establish_photo
															+ '"></a>'
															+ '</div>'
															+ '<div class="col-md-7">'
															+ '<h5><span class="glyphicon glyphicon-user"></span>'
															+ establish_name
															+ ' </h5>'
															+ '<btn class="btn btn-primary" data-toggle="modal" data-target="#myModal1">聊 天</btn>'
															+ ' </div>'
															+ '<hr>'
															+ '<br />'
															+ '</div>';
													modaltxt += '<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
												    '<div class="modal-dialog">'+
											        '<div class="modal-content">'+
											            '<div class="modal-header">'+
											                '<h4 class="modal-title" >'+
											                    establish_name+
											                '</h4>'+
											            '</div>'+
											            '<textarea id="content1" placeholder="有什么想对我说。。。。。。" style="width:100%;height:300px"></textarea>'+
											            '<div class="modal-footer">'+
											                '<button type="button" class="btn btn-default" data-dismiss="modal">关闭'+
											                '</button>'+
											                '<button type="button" onclick="sendMessage1('+establish_id+')" class="btn btn-primary">'+
											                    '发送'+
											                '</button>'+
											            '</div>'+
											        '</div><!-- /.modal-content -->'+
											    '</div><!-- /.modal -->'+
											'</div>';
													$("#projectinfo").append(
															projectinfotxt);

													$("body").append(modaltxt);
												} else if (code == 3) {
													// 关注者
													// 取消关注 投资
													projectinfotxt += '<div class="col-md-4 right-content">'
															+ '<br />'
															+ '<center><btn onclick="buy()" type="button" id="payBtn" class="btn btn-danger">我要投资</btn><btn class="btn btn-danger" onclick="cancleWatch()">取消关注</btn></center>'
															+ '<hr>'
															+ '<h4>'
															+ introduction
															+ '</h4>'
															+ '<hr>'
															+ '<br />'
															+ '<p>'
															+ timetxt
															+ '</p>'
															+ '<hr>'
															+ '</div>'
															+ '</br></br>';

													// 农户 项目持有人
													var modaltxt = '';
													projectinfotxt += '<div class="col-md-4 right-content">'
															+ '<br />'
															+ '<h4>农户</h4>'
															+ '<hr>'
															+ '<div class="col-md-5">'
															+ '<a href="personinfo_show.html?userid='
															+ establish_id
															+ '"><img class="img-circle img_self2" src="'
															+ establish_photo
															+ '"></a>'
															+ '</div>'
															+ '<div class="col-md-7">'
															+ '<h5><span class="glyphicon glyphicon-user"></span>'
															+ establish_name
															+ ' </h5>'
															+ '<btn class="btn btn-primary" data-toggle="modal" data-target="#myModal1">聊 天</btn>'
															+ ' </div>'
															+ '<hr>'
															+ '<br />'
															+ ' </div>';
													modaltxt += '<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
												    '<div class="modal-dialog">'+
											        '<div class="modal-content">'+
											            '<div class="modal-header">'+
											                '<h4 class="modal-title" >'+
											                    establish_name+
											                '</h4>'+
											            '</div>'+
											            '<textarea id="content1" placeholder="有什么想对我说。。。。。。" style="width:100%;height:300px"></textarea>'+
											            '<div class="modal-footer">'+
											                '<button type="button" class="btn btn-default" data-dismiss="modal">关闭'+
											                '</button>'+
											                '<button type="button" onclick="sendMessage1('+establish_id+')" class="btn btn-primary">'+
											                    '发送'+
											                '</button>'+
											            '</div>'+
											        '</div><!-- /.modal-content -->'+
											    '</div><!-- /.modal -->'+
											'</div>';
													if (owner_id != 0) {
														projectinfotxt += '<div class="col-md-4 right-content">'
																+ '<br />'
																+ '<h4>项目持有人</h4>'
																+ '<hr>'
																+ '<div class="col-md-5">'
																+ '<a href="personinfo_show.html?userid='
																+ owner_id
																+ '"><img class="img-circle img_self2" src="'
																+ owner_photo
																+ '" ></a>'
																+ '</div>'
																+ '<div class="col-md-7">'
																+ '<h5><span class="glyphicon glyphicon-user"></span>'
																+ owner_name
																+ '</h5>'
																+ '<btn class="btn btn-primary" data-toggle="modal" data-target="#myModal2">聊 天</btn>'
																+ '</div>'
																+ '<hr>'
																+ '<br />'
																+ '</div>';
														modaltxt += '<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
													    '<div class="modal-dialog">'+
												        '<div class="modal-content">'+
												            '<div class="modal-header">'+
												                '<h4 class="modal-title" >'+
												                    owner_name+
												                '</h4>'+
												            '</div>'+
												            '<textarea id="content2" placeholder="有什么想对我说。。。。。。" style="width:100%;height:300px"></textarea>'+
												            '<div class="modal-footer">'+
												                '<button type="button" class="btn btn-default" data-dismiss="modal">关闭'+
												                '</button>'+
												                '<button type="button" onclick="sendMessage2('+owner_id+')" class="btn btn-primary">'+
												                    '发送'+
												                '</button>'+
												            '</div>'+
												        '</div><!-- /.modal-content -->'+
												    '</div><!-- /.modal -->'+
												'</div>';
													}
															

													$("#projectinfo").append(
															projectinfotxt);
													$("body").append(modaltxt);
												} else if (code == 4) {
													// 挂出人
													// 取消挂出
													projectinfotxt += ' <div class="col-md-4 right-content">'
															+ '<br />'
															+ '<center><btn class="btn btn-danger" data-toggle="modal" data-target="#cancelOut">取消挂出</btn></center>'
															+ '<hr>'
															+ '<h4>'
															+ introduction
															+ '</h4>'
															+ '<hr>'
															+ '<br />'
															+ '<p>'
															+ timetxt
															+ '</p>'
															+ '<hr>'
															+ '</div>'
															+ '</br></br>';
													

													// 农户
													projectinfotxt += '<div class="col-md-4 right-content">'
															+ '<br />'
															+ '<h4>农户</h4>'
															+ '<hr>'
															+ '<div class="col-md-5">'
															+ '<a href="personinfo_show.html?userid='
															+ establish_id
															+ '"><img class="img-circle img_self2" src="'
															+ establish_photo
															+ '"></a>'
															+ '</div>'
															+ '<div class="col-md-7">'
															+ '<h5><span class="glyphicon glyphicon-user"></span>'
															+ establish_name
															+ ' </h5>'
															+ '<btn class="btn btn-primary" data-toggle="modal" data-target="#myModal1">聊 天</btn>'
															+ ' </div>'
															+ '<hr>'
															+ '<br />'
															+ ' </div>';
													var modaltxt ='';
													modaltxt += '<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
												    '<div class="modal-dialog">'+
											        '<div class="modal-content">'+
											            '<div class="modal-header">'+
											                '<h4 class="modal-title" >'+
											                    establish_name+
											                '</h4>'+
											            '</div>'+
											            '<textarea id="content1" placeholder="有什么想对我说。。。。。。" style="width:100%;height:300px"></textarea>'+
											            '<div class="modal-footer">'+
											                '<button type="button" class="btn btn-default" data-dismiss="modal">关闭'+
											                '</button>'+
											                '<button type="button" onclick="sendMessage1('+establish_id+')" class="btn btn-primary">'+
											                    '发送'+
											                '</button>'+
											            '</div>'+
											        '</div><!-- /.modal-content -->'+
											    '</div><!-- /.modal -->'+
											'</div>';
													$("#projectinfo").append(
															projectinfotxt);
													$("body").append(modaltxt);
												}

											}

										});
					}

				});

function getJournal(){
	$("#myTab").append('<li id="journalLi"><a href="#journal" data-toggle="tab">日志</a></li>');
	var txt1 = '<div class="tab-pane fade" id="journal">'+
 		'<div class="row feature">'+
 		'<btn class="btn btn-primary" data-toggle="modal" id="writeBtn" data-target="#writeJournal">写日志</btn>'+
 		'<br/>'+
 		'<div class="col-md-12" id="journallist">'+
   		'</div>'+ 
        '<center>'+
         '<form>共<span id="pages">10</span>页 跳转到：<input type="text"  id="page" class="page_to_style_1"><button type="button" id="gotoBtn">go</button></form>'+
     	'</center>'
     	'<nav aria-label="...">'+
         '<ul class="pager">'+
             '<li><button type="button" id="lastPage">上一页</button></li>'+
             '<li><button type="button" id="nextPage">下一页</button></li>'+
         '</ul>'+
     	'</nav>'+
		'</div>'+
	'</div>';
	var txt2 = '<div class="modal fade" id="writeJournal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
				'<div class="modal-dialog">'+
		'<div class="modal-content">'+
			'<div class="modal-header">'+
				'<h4 class="modal-title">写日志</h4>'+
			'</div>'+
			'<textarea id="content" placeholder="请填写日志" style="width:100%;height:300px">'+
				'</textarea>'+
			'<div class="modal-footer">'+
				'<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'+
				'<button type="button" onclick="writeJournal()" class="btn btn-primary">发布</button>'+
			'</div>'+
		'</div><!-- /.modal-content -->'+
	'</div><!-- /.modal -->'+
'</div>';
	$("#myTabContent").append(txt1);
	$("body").append(txt2);
	var pages = 0;
	var page = 1;
	var data = {page:1, proId: proId};
	$.post("/AIF/GetJournal", data, function(res){
		var message = $.parseJSON(res);
		if(message.code === 0){
			var journalList = message.list;
			var txt = '';
			journalList.forEach(function(item, index, array){
				var date = new Date();
				date.setTime(item.time);
				txt += '<p><font size="4" color="#428bca">'+date.toLocaleDateString()+'</font></p>'+
				'<p><font size="3">'+item.content+'</font></p><hr>';
				
			});
			$("#journallist").append(txt);
			pages = message.pages;
			 //分页
			$("#pages").text(pages);
			$("#page").val(page);
			$("#gotoBtn").click(function(){
				page = $("#page").val();
				if(page >=1 && page <= pages) {
					getJournal();
				} else{
					alert("该页面不存在");
					
				}
			});
			$("#lastPage").click(function(res){
				page -- ;
				if(page >=1 && page <= pages) {
					getJournal();
				} else{
					alert("该页面不存在");
				}
			});
			$("#nextPage").click(function(res){
				page ++ ;
				if(page >=1 && page <= pages) {
					getJournal();
				} else{
					alert("该页面不存在");
				}
			});
		} else {
			alert("您暂无权限查看！");
		}
	});
	
    
}

function writeJournal(){
	var content = $("#content").val();
	var data = {proId: proId, content: content};
	$.post("/AIF/WriteJournal", data, function(res){
		var message = $.parseJSON(res);
		if(message.code == 0){
			alert("发布成功！");
			location.reload();
		} else {
			alert("发布失败！");
			
		}
	});
}
	


// 点击事件
function buy(){
	window.location.href = 'pay.html?proId='+proId;
}
	

function watch() {
	var data = {
		"proId" : proId
	};
	$.post("/AIF/WatchPro", data, function(res) {
		var message = $.parseJSON(res);
		if (message.code == 0) {
			alert("关注成功！");
			window.location.reload();
		} else if(message.code == 1){
			alert("请先登录！");
			window.location.href="login.html";
		} else {
			alert("您不能关注该项目！");
		}
	});
}

function cancleWatch() {
	//alert("取消关注！");
	var data = {
			"proId" : proId
		};
		$.post("/AIF/CancleWatch", data, function(res) {
			if ($.parseJSON(res).code == 0) {
				alert("已取消关注！");
				window.location.reload();
			} else {
				alert("暂无权限！");
			}
		});
}

function sendMessage1(id){
	var content = $("#content1").val();
	var user_to = id;
	var data = {content:content, user_to:user_to};
	$.post("/AIF/SendMessage", data, function(res){
		var code = $.parseJSON(res).code;
		if(code === 0){
			alert("发送成功！");
			window.location.reload();
		} else if(code === 1){
			alert("发送失败！");
			window.location.reload();
		} else if(code == 2) {
			alert("请先登录！");
			location.href="login.html";
		}
		
		
	});
}

	
function sendMessage2(id){
	var content = $("#content2").val();
	var user_to = id;
	var data = {content:content, user_to:user_to};
	$.post("/AIF/SendMessage", data, function(res){
		var code = $.parseJSON(res).code;
		if(code === 0){
			alert("发送成功！");
			window.location.reload();
		} else if(code === 1){
			alert("发送失败！");
			window.location.reload();
		} else if(code == 2) {
			alert("请先登录！");
			location.href="login.html";
		}
		
		
	});
}

$("#canclePro").click(function(res) {

	var data = {
		"proId" : proId
	};
	$.post("/AIF/CanclePro", data, function(res) {
		if ($.parseJSON(res).code == 0) {
			alert("已取消该项目！");
			location.href = "personinfo.html";
		} else {
			alert("您不能取消该项目！");
		}
	});
});

$("#salePro").click(function(res) {
	
	var sale_price = $("#salePrice").val();
	//alert(sale_price);
	//alert(typeof(sale_price));
	var re = /^[1-9]\d*$/;
	// 验证
	if (!re.test(sale_price)) {
		// 不满足条件执行到此处
		alert("请输入正整数，单位为元！");
	} else {
		var data = {
			"proId" : proId,
			"salePrice" : sale_price
		};
		$.post("/AIF/SalePro", data, function(res) {
			if ($.parseJSON(res).code == 0) {
				alert("已挂出该项目！");
				location.href = "personinfo.html";
			} else {
				alert("您不能挂出该项目！");
			}
		});
	}

});

$("#finishPro").click(function(res) {
	var data = {
		"proId" : proId
	};
	$.post("/AIF/FinishPro", data, function(res) {
		if ($.parseJSON(res).code == 0) {
			alert("已结束该项目！");
			location.href = "personinfo.html";
		} else {
			alert("您不能结束该项目！");
		}
	});
});

$("#cancleSale").click(function(res) {
	var data = {
		"proId" : proId
	};
	$.post("/AIF/CancleSale", data, function(res) {
		if ($.parseJSON(res).code == 0) {
			alert("已取消挂出该项目！");
			window.location.reload();
		} else {
			alert("您不能取消挂出该项目！");
		}
	});
});

// financial
var data = {
	id : proId
};
var area, type2;
var type1;
var output;
$.ajax({
	url : "/AIF/GetProDetail",
	async : false,
	type : "POST",
	data : data,
	success : function(res) {
		var message = $.parseJSON(res);

		area = message.area;
		type1 = message.type1;
		type2 = message.type2;
		output = message.output;
	}

});
/*var pathd = "excel/" + area + "_" + type2 + "_d.xlsx";
var pathm = "excel/" + area + "_" + type2 + "_m.xlsx";
var pathmp = "excel/" + area + "_" + type2 + "_mp.xlsx";*/
var pathd = "excel/" + type1 + "_d.xlsx";
var pathm = "excel/" + type1 + "_m.xlsx";
var pathmp = "excel/" +type1 + "_mp.xlsx";
var data = {
	"path" : pathm
};
$.post(
				"/AIF/ParseExcel",
				data,
				function(res) {
					var message = $.parseJSON(res);
					var date = message.date;
					var price = message.price;
					// console.log(date);
					// console.log(price);

					var dateArray = date.split(" ");
					var priceArray = price.split(" ");
					// console.log(dateArray);
					// console.log(priceArray);
					var length = dateArray.length;
					//console.log(length);
					//console.log(priceArray.length);
					var txt1 = '';
					var txt2 = '';
					dateArray.forEach(function(item, index, array) {
						dateArray[index] = item.replace(/-/g, "/");
					});
					dateArray
							.forEach(function(item, index, array) {
								var price = parseFloat(priceArray[index]);
								// console.log(typeof(price)); string
								//console.log(item);
								if (item != "" && item != null
										&& item != undefined && index<length-1) {
									txt1 = '<tr>'
											+ '<td>'
											+ area
											+ '</td>'
											+ '<td>'
											+ item
											+ '</td>'
											+ '<td>'
											+ price.toFixed(2)
											+ '</td>'
											+ '<td><a  data-toggle="modal" data-target="#prediction_line'
											+ index
											+ '"><span class="glyphicon glyphicon-calendar"></span></a></td>'
											+ '</tr>';
									txt2 = '<div class="modal fade" id="prediction_line'
											+ index
											+ '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
											+ '<div class="modal-dialog">'
											+ '<div class="modal-content">'
											+ '<div class="modal-header">'
											+ '<h4 class="modal-title">'
											+ '价格走势'
											+ '</h4>'
											+ '</div>'
											+ '<div class="modal-body">'
											+ '<div id="price_prediction'
											+ index
											+ '" width="100%" height="100%">'
											+ '</div>'
											+ '</div>'
											+ '<div class="modal-footer">'
											+ '<button type="button" class="btn btn-default" data-dismiss="modal">关闭'
											+ '</button>'
											+ '</div>'
											+ '</div><!-- /.modal-content -->'
											+ '</div><!-- /.modal -->'
											+ '</div>';
									$("#monthData").append(txt1);
									$("#container").append(txt2);
									var data = {
										"path" : pathd,
										"month" : index
									};
									$
											.post(
													"/AIF/GetJson",
													data,
													function(res) {
														// console.log(res);
														var points = $
																.parseJSON(res).list;
														//console.log(points);
														points
																.forEach(function(
																		item,
																		index2,
																		array) {
																	points[index2][1] = parseFloat(item[1]);
																	// console.log(points.length);
																	// console.log(index);
																	if (index2 === (points.length - 1)) {
																		// alert("1");
																		//console.log(points[1]);
																		
																		var path = {
																			path : pathd
																		};

																		$(
																				"#price_prediction"
																						+ index)
																				.highcharts(
																						{
																							chart : {
																								zoomType : 'x'
																							},
																							title : {
																								text : '价格走势'
																							},
																							subtitle : {
																								text : document.ontouchstart === undefined ? '鼠标拖动可以进行缩放'
																										: '手势操作进行缩放'
																							},
																							xAxis : {
																								title : {
																									text : '日期'
																								},
																								categories:[""],
																								type : 'datetime',
																								dateTimeLabelFormats : {
																									millisecond : '%H:%M:%S.%L',
																									second : '%H:%M:%S',
																									minute : '%H:%M',
																									hour : '%H:%M',
																									day : '%m-%d',
																									week : '%m-%d',
																									month : '%Y-%m',
																									year : '%Y'
																								}
																							},
																							tooltip : {
																								dateTimeLabelFormats : {
																									millisecond : '%H:%M:%S.%L',
																									second : '%H:%M:%S',
																									minute : '%H:%M',
																									hour : '%H:%M',
																									day : '%Y-%m-%d',
																									week : '%m-%d',
																									month : '%Y-%m',
																									year : '%Y'
																								}
																							},
																							yAxis : {
																								title : {
																									text : '价格（kg/元）'
																								}
																							},
																							legend : {
																								enabled : false
																							},
																							plotOptions : {
																								area : {
																									fillColor : {
																										linearGradient : {
																											x1 : 0,
																											y1 : 0,
																											x2 : 0,
																											y2 : 1
																										},
																										stops : [
																												[
																														0,
																														Highcharts
																																.getOptions().colors[0] ],
																												[
																														1,
																														Highcharts
																																.Color(
																																		Highcharts
																																				.getOptions().colors[0])
																																.setOpacity(
																																		0)
																																.get(
																																		'rgba') ] ]
																									},
																									marker : {
																										radius : 2
																									},
																									lineWidth : 1,
																									states : {
																										hover : {
																											lineWidth : 1
																										}
																									},
																									threshold : null
																								}
																							},
																							series : [ {
																								type : 'area',
																								name : '价格',
																								data : points
																							} ]
																						});
																		
																	}
																});

													});
								}
							});
								
								/* txt2 += '<div class="modal fade"
								 * id="prediction_line" tabindex="-1"
								 * role="dialog" aria-labelledby="myModalLabel"
								 * aria-hidden="true">'+ '<div
								 * class="modal-dialog">'+ '<div
								 * class="modal-content">'+ '<div
								 * class="modal-header">'+ '<h4 class="modal-title">'+
								 * '价格走势'+ '</h4>'+ '</div>'+ '<div
								 * class="modal-body">'+ '<div
								 * id="price_prediction" width="100%"
								 * height="100%">'+ '</div>'+ '</div>'+ '<div
								 * class="modal-footer">'+ '<button
								 * type="button" class="btn btn-default"
								 * data-dismiss="modal">关闭'+ '</button>'+ '</div>'+ '</div><!--
								 * /.modal-content -->'+ '</div><!-- /.modal
								 * -->'+ '</div>';*/
								 
								
								
							/*	priceArray
										.forEach(function(item, index, array) {
											if(index < length-1){
											//	console.log(index);
												priceArray[index] = parseFloat(item).toFixed(2);
											}
											
										});*/
					priceArray
					.forEach(function(item, index, array) {
						
							priceArray[index] = parseFloat(item);
						
						
					});
								priceArray.pop();
								//console.log(priceArray);
								dateArray.pop();
								//读取预测数据
								var data = {
										"path" : pathmp
									};
									$.post(
													"/AIF/ParseExcel",
													data,
													function(res) {
														var message = $.parseJSON(res);
														var date = message.date;
														var price = message.price;
														var dateArrayP = date.split(" ");
														var priceArrayP = price.split(" ");
														dateArrayP.forEach(function(item, index, array){
															dateArray.push(item);
														});
														dateArray.pop();
													
														priceArrayP.forEach(function(item, index, array){
															priceArrayP[index] = parseFloat(priceArrayP[index]);
														});
														priceArrayP.pop();
														
														// console.log(dateArray);
														var chart;
														if (length > 0) {
															chart = new Highcharts.Chart({
																chart : {
																	renderTo : 'market_prediction',
																	type : 'line',
																	marginRight : 130,
																	marginBottom : 25
																},
																title : {
																	text : '市场价格趋势预测',
																	x : -20
																// center
																},
																subtitle : {
																	text : '金融模型：ARMA模型和序列模型  ',
																	x : -20
																},
																xAxis : {
																	categories : dateArray
																},
																yAxis : {
																	title : {
																		text : '价格（元/kg）'
																	},
																	plotLines : [ {
																		value : 0,
																		width : 1,
																		color : '#808080'
																	} ]
																},
																tooltip : {
																	formatter : function() {
																		return '<b>' + this.series.name
																				+ '</b><br/>' + this.x
																				+ ': ' + this.y + '元';
																	}
																},
																legend : {
																	layout : 'vertical',
																	align : 'right',
																	verticalAlign : 'top',
																	x : -10,
																	y : 100,
																	borderWidth : 0
																},
																series : [ {
																	name : '统计数据',
																	data : priceArray
																}, {
																	name : '预测数据',
																	data :  [ {
																		x : length,
																		y : priceArrayP[0]
																	}, {
																		x : length+1,
																		y : priceArrayP[1]
																	} ],
						 
																	dashStyle : 'dash'
																} ]
															});
														}

														if (length > 0) {
															var priceP = priceArrayP[0].toFixed(2);
															$("#priceP").text(priceP);
															$("#output").text(output);
															$("#priceW").text(priceP * output);
															$("#priceH").text(priceP * output);
														}

														var today = new Date();
														$("#date").text(today.toLocaleString());

														$("#compBtn").click(function(res){
															var price_comp = parseInt($("#price_comp").text());
															var inte_comp = parseFloat($("#inte_comp").val());
															var infla_comp = parseFloat($("#infla_comp").val());
															var month_comp =parseInt($("#month_comp").val());
															var price_pre = 0;
															if(month_comp==1){
																price_pre = priceArrayP[0].toFixed(2)*output;
																var rate_comp = 0;
																console.log(price_pre, price_comp,inte_comp,month_comp,infla_comp);
																rate_comp = ((price_pre -price_comp* Math.pow(1+inte_comp/100, month_comp)* Math.pow(1-infla_comp/100, month_comp))/(price_comp/100)).toFixed(2);
																alert("预计投资回报率为"+rate_comp+"%");
															} else if(month_comp == 2){
																price_pre = priceArrayP[1].toFixed(2)*output;
																var rate_comp = 0;
																console.log(price_pre, price_comp,inte_comp,month_comp,infla_comp);
																rate_comp = ((price_pre -price_comp* Math.pow(1+inte_comp/100, month_comp)* Math.pow(1-infla_comp/100, month_comp))/(price_comp/100)).toFixed(2);
																alert("预计投资回报率为"+rate_comp+"%");
															} else{
																alert("暂时只能计算1-2个月投资回报率");
															}
															
														});
														
														
									
													});
								
									
							

				});

//以往交易价格
var data ={proId:proId};
$.post("/AIF/GetTradeList", data, function(res){
	
	var message = $.parseJSON(res);
	var list = message.list;
	var timeArray = new Array();
	var priceArray = new Array();
	list.forEach(function(item, index, array){
		var date = new Date();
		date.setTime(item.time);
		timeArray.push(date.toLocaleDateString());
		priceArray.push(item.price);
	});
	console.log(timeArray.length);
	//alert(priceArray);
	if(timeArray.length ==0){
		$("#trade_show").append("<center><h4>该项目暂无历史交易记录</h4><center>");
	} else{
	var chart = new Highcharts.Chart({
		chart : {
			renderTo : 'trade_show',
			type : 'line',
			marginRight : 130,
			marginBottom : 25
		},
		title : {
			text : '以往交易金额',
			x : -20
		// center
		},
		
		xAxis : {
			categories : timeArray
		},
		yAxis : {
			title : {
				text : '价格（元）'
			},
			subtitle : {
				text : ' 历史交易数据 ',
				x : -20
			},
			plotLines : [ {
				value : 0,
				width : 1,
				color : '#808080'
			} ]
		},
		tooltip : {
			formatter : function() {
				return '<b>' + this.series.name
						+ '</b><br/>' + this.x
						+ ': ' + this.y + '元';
			}
		},
		legend : {
			layout : 'vertical',
			align : 'right',
			verticalAlign : 'top',
			x : -10,
			y : 100,
			borderWidth : 0
		},
		series : [ {
			name : '统计数据',
			data : priceArray
		}]
	});}
});

//视频
var data ={proId:proId};
$.post("/AIF/GetVideo", data, function(res){
	var message = $.parseJSON(res);
	var list = message.list;
	if(list.length ==0){
		$("#videoSelect").append('<option value="0">暂无视频信息</option>');	
	} else{
		$("#videoSelect").append('<option value="0">请选择图像名</option>');	
	}
	list.forEach(function(item, index, array){
		var video = item.video;
		var videoName = item.videoName;
		//添加到下拉框里
		
		$("#videoSelect").append('<option value="'+video+'">'+videoName+'</option>');	
	});
});

function changeVideo(){
	var value = $("#videoSelect").val();
	if(value != "0"){
		$("#videoShow").empty();
		$("#videoShow").append('<embed src="http://'+value+'/web/swfs/StrobeMediaPlayback.swf" width="640" height="352" quality="high" bgcolor="#000000" name="StrobeMediaPlayback" allowfullscreen="true" pluginspage="http://www.adobe.com/go/getflashplayer" flashvars="&amp;src=rtmp://'+value+'/flash/12:admin:admin&amp;autoHideControlBar=true&amp;streamType=live&amp;autoPlay=true" type="application/x-shockwave-flash">');

	}
}
function videoUp(){
	var value = $("#videoSelect").val();
	if(value != 0){
	$("#retframe").location.href='http://'+value+'/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=up';
	$("#retframe").location.href='http://'+value+'/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=stop';
	}
}
function videoDown(){
	var value = $("#videoSelect").val();
	if(value != 0){
	$("#retframe").location.href='http://'+value+'/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=down';
	$("#retframe").location.href='http://'+value+'/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=stop';
	}
}
function videoLeft(){
	var value = $("#videoSelect").val();
	if(value != 0){
	$("#retframe").location.href='http://'+value+'/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=left';
	$("#retframe").location.href='http://'+value+'/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=stop';
	}
}
function videoRight(){
	var value = $("#videoSelect").val();
	if(value != 0){
	$("#retframe").location.href='http://'+value+'/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=right';
	$("#retframe").location.href='http://'+value+'/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=stop';
	}
}

$("#searchclick").click(function(){
	var proname = $("#proname").val();
	
	var url = encodeURI("search.html?proname="+proname);
    var enurl = encodeURI(url);//使用了两次encodeRUI进行编码
	
	location.href = enurl;
});			
