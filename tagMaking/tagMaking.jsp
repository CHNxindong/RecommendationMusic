<%@page contentType="text/html; charset=UTF-8"
  import="java.sql.*,java.io.*"%>

  <%
      String username=(String)session.getAttribute("username");
      String user_id=(String)session.getAttribute("user_id");

      try {
        Class.forName("com.mysql.jdbc.Driver");
      } catch (ClassNotFoundException classnotfoundexception) {
        classnotfoundexception.printStackTrace();
      }
        Connection conn = DriverManager
            .getConnection("jdbc:mysql://localhost:3306/baimiao?user=root&password=dx10010409&useUnicode=true&characterEncoding=UTF-8");
        Statement statement = conn.createStatement();
%>
<html>

<head>
    <meta charset="utf-8">
    <meta name="author" content="voo">
    <meta name="keywords" content="文学，小说，绘画，漫画，音乐，视频，微电影，摄影作品，文化社区">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <title>爱听</title>

    <link rel="stylesheet" href="css/style.css" type="text/css">


    <link rel="stylesheet" href="as/css/common.css">
    <link rel="stylesheet" href="as/css/category.css">
    <link rel="stylesheet" href="as/css/font-awesome.min.css">

    <!-- Bootstrap Styles-->
    <link href="assets/css/bootstrap.css" rel="stylesheet" />
    <!-- FontAwesome Styles-->
    <link href="assets/css/font-awesome.css" rel="stylesheet" />
    <!-- Morris Chart Styles-->

    <!-- Google Fonts-->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' />
    <!-- TABLE STYLES-->
    <link href="assets/js/dataTables/dataTables.bootstrap.css" rel="stylesheet" />

</head>

<body>
    <div class="header">
        <div class="web-title">
            <a href="index.html">爱听</a>
        </div>
        <div class="slogan">
            <span>—— 个性化音乐推荐</span>
        </div>
        <div class="direction">
            <ul>
        <!-- <li><img src="">首页</li>
        <li><img src="">视频</li>
        <li><img src="">音乐</li>
        <li><img src="">文学</li>
        <li><img src="">绘画</li>
        <li><img src="">摄影</li> -->
    <li>
    <a href="../index.jsp">首页</a>
    </li>
    <li>
    <a href="../recommendation.jsp?user_id=<%=user_id%>">推荐页面</a>
    </li>
    <li>
    <a href="userPortrayal.jsp">用户画像</a>
    </li>
    <li>
    <a href="tagMaking.jsp">音乐标签</a>
    </li>
    <li>
    <a href="../userinfo.jsp?user_id=<%=user_id%>">个人中心</a>
    </li>

      </ul>
      
        </div>

        <a class="upload" href="../upload.jsp" target="_blank">上传</a>

    <%
      if(user_id!=null){
    %>
    <a href="userinfo.jsp?user_id=<%=user_id%>" target="_blank" class="author-header" id="user-header"><img src="images/demo/1.jpg">
      <%=username%></a>
      
    <%
      }else{
    %>
    <div class="sign"><a href="signnew.html" class="up">登录</a> | <a href="sign.html" class="up">注册</a></div>
    <%
      }
    %>
    </div>

    <div class="container-sm box">
    <div class="main">
    <div class="main-wrap">
    <div class="content-box">
    <div class="row">
    <div class="col-md-12">
    <!-- Advanced Tables -->
    <div class="panel panel-default">
    <div class="panel-heading">
    音乐标签服务
    </div>
    <div class="panel-body">
    <div class="table-responsive">
    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
    <thead>
    <tr>
    <th>音乐名</th>
    <th>播放</th>
    <th>标签1</th>
    <th>标签2</th>
    <th>标签3</th>
    <th>提交</th>
    </tr>
    </thead>

    <tbody id="musicList">

    </tbody>

    </table>
    </div>

    </div>
    </div>
    <!--End Advanced Tables -->
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>

    <!-- 底部版权 -->
    <footer>
    <div class="container">
    <div class="copyright">
    <p>Copyright © <span class="update-year">2018</span> dongxin - All Rights Reserved&nbsp;&nbsp;|&nbsp;&nbsp;Neutrino</p>
    </div>
    </div>
    </footer>

</body>

<script src="js/lib/jquery-1.11.2.min.js"></script>
<script src="js/style.js"></script>
<script src="js/more-style.js"></script>

    <!-- Bootstrap Js -->
    <script src="assets/js/bootstrap.min.js"></script>

    <!-- DATA TABLE SCRIPTS -->
    <script src="assets/js/dataTables/jquery.dataTables.js"></script>
    <script src="assets/js/dataTables/dataTables.bootstrap.js"></script>
    <script>
    $(document).ready(function () {
    $('#dataTables-example').dataTable();
    });
    </script>
    <script>
    var musicListSize;

    function loadPage() {
    $.ajax({
    url: "http://localhost:8081/datacal/getMusicList",
    async: false,
    type: "GET",
    success: function (res) {
    var txt = '';
    var musicList = [];
    musicList = res;
    musicListSize = res.length;
    for (var i = 0; i < musicList.length; i++) {
    txt += '<tr class="odd gradeX">' +
    '                        <td>' + musicList[i].name + '</td>' +
    '<input type="hidden" value="'+musicList[i].musicId+'" id="musicId_'+(i+1)+'">'+
    '                        <td>' +
    '                          <audio src="..//' + musicList[i].path + '" controls="controls"></audio>' +
    '                        </td>' +
    '                        <td class="center">' +
    '                          <select id="tag1_' + (i+1) + '">' +
    '                                 <option>激情</option>' +
    '<option>伤感</option>' +
    '<option>安静</option>' +
    '<option>甜蜜</option>' +
    '<option>励志</option>' +
    '<option>寂寞</option>' +
    '<option>想念</option>' +
    '<option>浪漫</option>' +
    '<option>喜悦</option>' +
    '<option>深情</option>' +
    '<option>怀旧</option>' +
    '                          </select>' +
    '                        </td>' +
    '                        <td class="center">' +
    '                          <select id="tag2_' + (i+1) + '">' +
    '                                  <option>90后</option>' +
    '<option>80后</option>' +
    '<option>70后</option>' +
    '<option>60年代</option>' +
    '<option>50年代</option>' +
    '<option>儿歌</option>' +
    '                          </select>' +
    '                        </td>' +
    '                        <td class="center">' +
    '                          <select id="tag3_' + (i+1) + '">' +
    '                                      <option>校园</option>' +
    '<option>旅行</option>' +
    '<option>背景音乐</option>' +
    '<option>午后</option>' +
    '<option>广场舞</option>' +
    '<option>夜店</option>' +
    '<option>酒吧</option>' +
    '<option>咖啡厅</option>' +
    '<option>婚礼</option>' +
    '<option>汽车</option>' +
    '<option>毕业</option>' +
    '                          </select>' +
    '                        </td>' +
    '                        <td class="center">' +
    '                          <button id="updateMusicTag_' + (i+1) + '">提交</button>' +
    '                        </td>' +
    '                      </tr>'
    }
    $("#musicList").append(txt);
    }
    });
    }

    loadPage();

    //JS的闭包
    var clickEvent = function(i) {
    // 这儿出现了一个新的scope
    return function(){
    var musicId = $("#musicId_"+i).val();
    var tag1 = $("#tag1_"+i).val();
    var tag2 = $("#tag2_"+i).val();
    var tag3 = $("#tag3_"+i).val();

    // $.post("http://localhost:8081/datacal/updateMusicTag", data1, function(res){
    //     var message = $.parseJSON(res);
    //     if(message.equals("ok")){
    //         alert("操作成功");
    //     } else {
    //         alert("请重新操作");
    //     }
    // });

    $.ajax({
    url: "http://localhost:8081/datacal/updateMusicTag?musicId="+musicId+"&tag="+tag1,
    async: false,
    type: "GET",
    success: function (res) {
    },
    fail:function(){
    alert('请重新操作！');
    }
    });

    $.ajax({
    url: "http://localhost:8081/datacal/updateMusicTag?musicId="+musicId+"&tag="+tag2,
    async: false,
    type: "GET",
    success: function (res) {
    },
    fail:function(){
    alert('请重新操作！');
    }
    });

    $.ajax({
    url: "http://localhost:8081/datacal/updateMusicTag?musicId="+musicId+"&tag="+tag3,
    async: false,
    type: "GET",
    success: function (res) {
    alert(res);
    },
    fail:function(){
    alert('请重新操作！');
    }
    });

    };
    };

    for(var i=1; i <= musicListSize; i++){
    $("#updateMusicTag_"+i).click(clickEvent(i));
    }

    </script>

</body>

</html>