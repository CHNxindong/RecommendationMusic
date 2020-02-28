//加载页面
var pages = 0;
var page = 1;
var url = location.href;
url =decodeURI(decodeURI(url)); //获取url中"?"符后的字串，使用了两次decodeRUI解码
var proname;

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
	
	proname = res["proname"];
	//alert("proname:"+proname);
	page = res["page"];  //获取url中page参数
}
if(page == undefined) {
	page = 1;
}
if(proname == undefined){
	proname = null;
}
$("#proname").val(proname);
function searchIndexLoad() {
	
	
	var data = {proname:proname, page:page};
//	alert(proname);
//	alert(page);
	$.ajax({
		url: "/AIF/SearchIndex",
		async: false,
		type: "POST",
		data: data,
		success: function(res){
			var txt = '';
			var code = $.parseJSON(res).code;
			
		if(code == 0){
//			alert(code);
			pages = $.parseJSON(res).pages; // $.parseJSON(res)代表json字符串
//			alert(pages);
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
				//	cover = cover.replace(/F:\/workspace\/AIF\/WebContent\//,"");
					cover = cover.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
			        txt += '<div class="col-md-4 text3_self">'+
			            '<a href="project_content.html?id='+id+'"><img class="img-circle img_self" src="'+cover+'" alt="firefox"></a>'+
			            '<p>'+area+'</p>'+
			            '<h3>'+name+'</h3>'+
			            '<h4>'+price+'元'+'</h4>'+
			            '<p>'+introduction+'</p>'+
			        '</div>';		      
			});
			console.log(txt);
			$("#searchlist").append(txt);
		}
		}});
	
	//分页
	$("#pages").text(pages);
	$("#page").val(page);
	$("#gotoBtn").click(function(){
		page = $("#page").val();
		if(page >=1 && page <= pages) {
			location.href="search.html?proname=" + proname + "&page="+page;
		} else{
			alert("该页面不存在");
			location.reload();
		}
	});
	$("#lastPage").click(function(res){
		page -- ;
		if(page >=1 && page <= pages) {
			location.href="search.html?proname=" + proname + "&page="+page;
		} else{
			alert("该页面不存在");
			location.reload();
		}
	});
	$("#nextPage").click(function(res){
		page ++ ;
		if(page >=1 && page <= pages) {
			location.href="search.html?proname=" + proname + "&page="+page;
		} else{
			alert("该页面不存在");
			location.reload();
		}
	});
}

function searchDetailLoad(proname, page,type1,type2,province,area,state,time1,time2,price1,price2) {
//	alert(type1);
//		url = url.split("?")[1];
//		var para = url.split("&");
//		var len = para.length;
//		var res = {};
//		var arr = [];
//		for(var i=0;i<len;i++){
//		    arr = para[i].split("=");
//		    res[arr[0]] = arr[1];
//		}
//		
//		var proname = $("#proname").val();
//		var type1 = $("#type1").val();
//		var type2 = $("#type2").val();
//		var province = $("#province").val();
//		var area = $("#area").val();
//		var state = $("#state").val();
//		var time1 = $("#time1").val();
//		var time2 = $("#time2").val();
//		var price1 = $("#price1").val();
//		var price2 = $("#price2").val();
		
//		proname = res["proname"];
//		page = res["page"];  //获取url中page参数
//		type1 = res["type1"];
//		type2 = res["type2"];
//		province = res["province"];
//		area = res["area"];
//		state = res["state"];
//		time1 = res["time1"];
//		time2 = res["time2"];
//		price1 = res["price1"];
//		price2 = res["price2"];

	
	var data = {proname:proname, page:page,type1:type1,type2:type2,province:province,area:area,state:state,time1:time1,time2:time2,price1:price1,price2:price2};
	console.log(data);
	$.ajax({
		url: "/AIF/SearchDetail",
		async: false,
		type: "POST",
		data: data,
		success: function(res){
			var txt = '';
			var code = $.parseJSON(res).code;
			$("#searchlist").text('');
			
		if(code == 0){
//			alert(code);
			pages = $.parseJSON(res).pages; // $.parseJSON(res)代表json字符串
//			alert(pages);
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
				//	cover = cover.replace(/F:\/workspace\/AIF\/WebContent\//,"");
					cover = cover.replace(/C:\/CHNxindong\/apache-tomcat-7.0.75\/webapps\/AIF\//,"");
			        txt += '<div class="col-md-4 text3_self">'+
			            '<a href="project_content.html?id='+id+'"><img class="img-circle img_self" src="'+cover+'" alt="firefox"></a>'+
			            '<p>'+area+'</p>'+
			            '<h3>'+name+'</h3>'+
			            '<h4>'+price+'元'+'</h4>'+
			            '<p>'+introduction+'</p>'+
			        '</div>';		      
			});
			console.log(txt);
			$("#searchlist").append(txt);
		}
		}});
	
	//分页
	$("#pages").text(pages);
	$("#page").val(page);
	$("#gotoBtn").click(function(){
		page = $("#page").val();
		if(page >=1 && page <= pages) {
//			location.href="search.html?proname="+proname+"&type1="+type1+"&type2="+type2+"&province="+province+"&area="+area+"&state="+state+"&time1="+time1+"&time2="+time2+"&price1="+price1+"&price2="+price2+"&page="+page;
			searchDetailLoad(proname, page,type1,type2,province,area,state,time1,time2,price1,price2);
		} else{
			alert("该页面不存在");
			location.reload();
		}
	});
	$("#lastPage").click(function(res){
		page -- ;
		if(page >=1 && page <= pages) {
//			location.href="search.html?proname="+proname+"&type1="+type1+"&type2="+type2+"&province="+province+"&area="+area+"&state="+state+"&time1="+time1+"&time2="+time2+"&price1="+price1+"&price2="+price2+"&page="+page;
			searchDetailLoad(proname, page,type1,type2,province,area,state,time1,time2,price1,price2);
		} else{
			alert("该页面不存在");
			location.reload();
		}
	});
	$("#nextPage").click(function(res){
		page ++ ;
		if(page >=1 && page <= pages) {
//			location.href="search.html?proname="+proname+"&type1="+type1+"&type2="+type2+"&province="+province+"&area="+area+"&state="+state+"&time1="+time1+"&time2="+time2+"&price1="+price1+"&price2="+price2+"&page="+page;
			searchDetailLoad(proname, page,type1,type2,province,area,state,time1,time2,price1,price2);
		} else{
			alert("该页面不存在");
			location.reload();
		}
	});
}

if(url.split("&").length <= 2){
	searchIndexLoad();
}

//header部分
//检查是否已登录
$.get("/AIF/CheckLogin", function(res){
	var message = $.parseJSON(res);
	//alert(message.code);
	if(message.code == 0) {
		//alert("未登录");
		//未登录 显示注册登录按钮
		var txt = '<li><a href="register.html">注册</a></li>'+
        '<li><a href="login.html">登录</a></li>'+
        '<li><a href="establish.html"><button class="btn btn-private btn-self2">发起项目</button></a></li>';
		$("#headerul").append(txt);
		
	} else {
		//alert("已登录");
		//已登录 显示头像个人下拉框
		//获取用户名和用户头像
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
			var txt = '<li class="dropdown">'+ 
	        '<a href="#" class="dropdown-toggle" data-toggle="dropdown">'+
	            '<img src="' + photo+'" class="nav-avatar" /><b>'+username+'</b>'+
	        '</a>'+
	        '<ul class="dropdown-menu">'+
	            '<li><a href="personinfo.html">个人空间</a></li>'+
	            '<li class="divider"></li>'+
	            '<li><a href="login.html">退出登录</a></li>'+
	        '</ul>'+
	    '</li>'+
	    '<li><a href="establish.html"><button class="btn btn-private btn-self2">发起项目</button></a></li>';
			$("#headerul").append(txt);
		
	});
	}
});

function changeType2(){
    var type1 = new Array();
    type1[""] = ["--请选大类--"];
    type1["粮油"] = ["大豆","芝麻","玉米","水稻","小麦","高粱","蚕豆","燕麦","豌豆","小米 ","绿豆 ","扁豆","小黑麦","花生","油菜籽"];
    type1["果蔬"] = ["苹果","水蜜桃","香蕉","芒果","哈密瓜","猕猴桃","芹菜","胡萝卜","西兰花","娃娃菜","西红柿","土豆","辣椒","黄瓜"];  
    type1["禽畜"] = ["鸡","鸭","牛","猪","羊","鹅","鸽子","鹌鹑"];
    type1["水产"] = ["大闸蟹","鳜鱼","鲫鱼","草鱼","鲤鱼","河虾","黑鱼","扇贝","生蚝","茭白","薏仁","藕","莲子"];
    $("#type2").empty();
    var value = $("#type1").val();
    $("#type2").append("<option value=''>--请选择产品小类--</option>");
    for(i = 0;i < type1[value].length;i++){
     $("#type2").append("<option value='"+type1[value][i]+"'>"+type1[value][i]+"</option>");
    }
    
    if(value == "0"){
    	$("#type2").attr("disabled", true);}
    else{
    	$("#type2").attr("disabled", false);}
   
 }

function changeArea(){
    var province = new Array();
    province[""] = ["--请选择省级--"];
    province["北京市"] = ['东城区', '西城区','崇文区','宣武区','朝阳区','丰台区','石景山区', '海淀区','门头沟区', '房山区','通州区','顺义区','昌平区','大兴 区','怀柔区','平谷区','密云县','延庆县'];
    province['天津市'] = ['和平区','河东区', '河西区', '南开区', '河北区', '红桥区', '塘沽区', '汉沽区', '大港区', '东丽区', '西青区', '津南区', '北辰区', '武清区', '宝坻区', '宁河县', '静海县', '蓟县'];
    province['上海市'] = ['黄浦区','卢湾区', '徐汇区','长宁区','静安区','普陀区','闸北区','虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区', '南汇区', '奉贤区', '崇明县'];
    province['重庆市'] = ['万州区','涪陵区','渝中区','大渡口区','江北区','沙坪坝区','九龙坡区','南岸区','北碚区','万盛区','双桥区','渝北区','巴南区','黔江区','长寿区','江津区','合川区','永川区','南川区','綦江县','潼南县','铜梁县','大足县','荣昌县','璧山县','梁平县','城口县','丰都县','垫江县','武隆县','忠县','开县','云阳县','奉节县','巫山县','巫溪县','石柱土家族自治县','秀山土家族苗族自治县','酉阳土家族苗族自治县','彭水苗族土家族自治县'];
    province['河北省'] = ['石家庄市', '唐山市', '秦皇岛市', '邯郸市', '邢台市', '保定市', '张家口市', '承德市', '沧州市', '廊坊市', '衡水市'];
    province['河南省'] = ['郑州市','开封市','洛阳市', '平顶山市', '安阳市', '鹤壁市', '新乡市', '焦作市', '济源市', '濮阳市', '许昌市', '漯河市', '三门峡市', '南阳市', '商丘市', '信阳市', '周口市', '驻马店市'];
    province['云南省'] = ['昆明市',' 曲靖市','玉溪市','保山市','昭通市','丽江市','思茅市','临沧市','楚雄彝族自治州','红河哈尼族彝族自治州','文山壮族苗族自治州','西双版纳傣族自治州','大理白族自治州','德宏傣族景颇族自治州','怒江傈僳族自治州','迪庆藏族自治州'] ;
    province['辽宁省'] = ['沈阳市' ,'大连市' ,'鞍山市' ,'抚顺市' ,'本溪市' ,'丹东市' ,'锦州市' ,'营口市' ,'阜新市' ,'辽阳市' ,'盘锦市' ,'铁岭市' ,'朝阳市' ,'葫芦岛市'];
    province['黑龙江省'] = ['哈尔滨市','齐齐哈尔市','鸡西市','鹤岗市','双鸭山市', '大庆市', '伊春市', '佳木斯市', '七台河市', '牡丹江市', '黑河市', '绥化市', '大兴安岭地区']; 
    province['湖南省'] = ['长沙市', '株洲市','湘潭市', '衡阳市', '邵阳市', '岳阳市', '常德市', '张家界市', '益阳市', '郴州市', '永州市', '怀化市', '娄底市', '湘西土家族苗族自治州']; 
    province['安徽省'] = ['合肥市', '芜湖市', '蚌埠市', '淮南市', '马鞍山市', '淮北市', '铜陵市', '安庆市', '黄山市', '滁州市','阜阳市','宿州市', '巢湖市', '六安市', '亳州市', '池州', '宣城市'];
    province['山东省'] = ['济南市','青岛市','淄博市','枣庄市','东营市','烟台市','潍坊市','济宁市','泰安市','威海市','日照市','莱芜市','临沂市','德州市','聊城市','滨州市','菏泽市'];
    province['新疆维吾尔自治区'] = ['乌鲁木齐市', '克拉玛依市', '吐鲁番地区', '哈密地区', '昌吉回族自治州 ', '博尔塔拉蒙古自治州 ', '巴音郭楞蒙古自治州 ', '阿克苏地区', '克孜勒苏柯尔克孜自治州 ', '喀什地区', '和田地区', '伊犁哈萨克自治州', '塔城地区', '阿勒泰地区', '石河子市', '阿拉尔市', '图木舒克市', '五家渠市' ]; 
    province['江苏省'] = ['南京市', '无锡市', '徐州市', '常州市', '苏州市', '南通市', '连云港市', '淮安市', '盐城市', '扬州市', '镇江市', '泰州市', '宿迁市' ];
    province['浙江省'] = ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'];
    province['江西省'] = ['南昌市','景德镇市','萍乡市','九江市','新余市','鹰潭市','赣州市','吉安市','宜春市','抚州市','上饶市'];
    province['湖北省'] = ['武汉市','黄石市','十堰市', '宜昌市', '襄樊市', '鄂州市', '荆门市', '孝感市', '荆州市', '黄冈市', '咸宁市', '随州市', '恩施土家族苗族自治州','仙桃市', '潜江市', '天门市', '神农架林区'];
    province['广西壮族自治区'] =  ['南宁市','柳州市','桂林市','梧州市','北海市','防城港市','钦州市','贵港市','玉林市','百色市','贺州市','河池市','来宾市','崇左市'];
    province['甘肃省'] = ['兰州市','嘉峪关市', '金昌市', '白银市', '天水市', '武威市', '张掖市', '平凉市', '酒泉市', '庆阳市', '定西市', '陇南市', '临夏回族自治州', '甘南藏族自治州'];
    province['山西省'] = ['太原市','大同市', '阳泉市', '长治市', '晋城市', '朔州市', '晋中市', '运城市', '忻州市', '临汾市', '吕梁市' ];
    province['内蒙古自治区'] =  ['呼和浩特市', '包头市', '乌海市', '赤峰市', '通辽市', '鄂尔多斯市', '呼伦贝尔市', '巴彦淖尔市', '乌兰察布市', '兴安盟', '锡林郭勒盟', '阿拉善盟' ];
    province['陕西省']= ['西安市','铜川市','宝鸡市', '咸阳市', '渭南市', '延安市', '汉中市', '榆林市', '安康市', '商洛市' ];
    province['吉林省'] = ['长春市', '吉林市', '四平市', '辽源市', '通化市', '白山市', '松原市', '白城市', '延边朝鲜族自治州'];
    province['福建省'] = ['福州市', '厦门市', '莆田市', '三明市', '泉州市', '漳州市', '南平市', '龙岩市', '宁德市' ];
    province['贵州省'] =  ['贵州省','贵阳市','六盘水市', '遵义市', '安顺市', '铜仁地区', '黔西南布依族苗族自治州', '毕节地区', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'] ['贵州省','贵阳市','六盘水市', '遵义市', '安顺市', '铜仁地区', '黔西南布依族苗族自治州', '毕节地区', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'];
    province['广东省'] = ['广州市','韶关市','深圳市','珠海市','汕头市','佛山市','江门市','湛江市','茂名市','肇庆市','惠州市','梅州市','汕尾市','河源市','阳江市','清远市','东莞市','中山市','潮州市','揭阳市','云浮市'];
    province['青海省'] = ['西宁市' ,'海东地区', '海北藏族自治州', '黄南藏族自治州', '海南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'];
    province['西藏'] = ['拉萨市','昌都地区', '山南地区', '日喀则地市', '那曲地区', '阿里地区', '林芝地区' ];
    province['四川省'] = ['成都市','自贡市', '攀枝花市', '泸州市', '德阳市', '绵阳市', '广元市', '遂宁市', '内江市', '乐山市', '南充市', '眉山市', '宜宾市', '广安市', '达州市', '雅安市', '巴中市', '资阳市', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'];
    province['宁夏回族自治区'] = ['银川市','石嘴山市','吴忠市','固原市','中卫市'];;
    province['海南省'] = ['海口市','三亚市','五指山市', '琼海市', '儋州市', '文昌市', '万宁市', '东方市', '定安县', '屯昌县', '澄迈县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县' ];
    province['台湾省'] = ['台北市', '高雄市', '基隆市', '台中市', '台南市', '新竹市', '嘉义市'];;
    province['香港特别行政区'] = ['中西区', '湾仔区', '东区', '南区', '油尖旺区', '深水埗区', '九龙城区', '黄大仙区', '观塘区', '荃湾区', '葵青区', '沙田区', '西贡区', '大埔区', '北区', '元朗区', '屯门区', '离岛区' ];
    province['澳门特别行政区'] =  ['澳门'];
    $("#area").empty();
    var value = $("#province").val();
    $("#area").append("<option value=''>--请选择所属市级行政区--</option>");
    for(i = 0;i < province[value].length;i++){
     $("#area").append("<option value='"+province[value][i]+"'>"+province[value][i]+"</option>");
    }
    
    if(value == "0"){
    	$("#area").attr("disabled", true);}
    else{
    	$("#area").attr("disabled", false);}
   
 }

$("#searchdetail").click(function(){
	var proname = $("#proname").val();
	var type1 = $("#type1").val();
//	alert(type1);
	var type2 = $("#type2").val();
	var province = $("#province").val();
//	alert("province:"+province);
	var area = $("#area").val();
//	alert("area:"+area);
	var state = $("#state").val();
	var time1 = $("#time1").val();
	var time2 = $("#time2").val();
	var price1 = $("#price1").val();
	var price2 = $("#price2").val();
	
	if(time1 == ''){
		time1 = 0;
	}
	if(time2 == ''){
		time2 = 0;
	}
	if(price1 == ''){
		price1 = 0;
	}
	if(price2 == ''){
		price2 = 0;
	}
	if(state == "未实施"){
		state = 2;
	}
	if(state == "已实施"){
		state = 5;
	}
	
//	location.href = "search.html?proname="+proname+"&type1="+type1+"&type2="+type2+"&province="+province+"&area="+area+"&state="+state+"&time1="+time1+"&time2="+time2+"&price1="+price1+"&price2="+price2+"&page=1";
	searchDetailLoad(proname, 1,type1,type2,province,area,state,time1,time2,price1,price2);
});
$("#searchclick").click(function(){
	var proname = $("#proname").val();
	
	var url = encodeURI("search.html?proname="+proname);
    var enurl = encodeURI(url);//使用了两次encodeRUI进行编码
	
	location.href = enurl;
});		