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
    <meta name="keywords" content="音乐推荐">
    <meta name="viewport" content="width=device-width, initial-scale=1" >
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">

    <title>爱听</title>
    <link rel="stylesheet" href="css/sign.css" type="text/css">
    <link rel="stylesheet" href="css/style.css" type="text/css">

    <link rel="stylesheet" href="as/css/common.css">
    <link rel="stylesheet" href="as/css/category.css">
    <link rel="stylesheet" href="as/css/font-awesome.min.css">

    <!-- Bootstrap Styles-->
    <link href="assets/css/bootstrap.css" rel="stylesheet" />
    <!-- FontAwesome Styles-->
    <link href="assets/css/font-awesome.css" rel="stylesheet" />
    <!-- Morris Chart Styles-->

    </head>
    <body>
    <div class="header">
    <div class="web-title">
    <a href="index.jsp">爱听</a>
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
    <a class="upload" href="upload.jsp" target="_blank">上传</a>

      <%
      if(user_id!=null){
    %>
    <a href="../userinfo.jsp?user_id=<%=user_id%>" target="_blank" class="author-header" id="user-header"><img
    src="images/demo/1.jpg"><%=username%></a>

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

        <h2 class="h_center"><b>用户自我画像</b></h2>
        <h4 class="h_center">为了给您更好的推荐！</h4>
        <div class="row" id="summary-container">
            <div class="col-md-12 text3_self">
              <br />

              <div class="input-group">
                <span class="input-group-addon">喜爱标签1</span>
                <select name="tag1" id="tag1" class="selectpicker form-control" required="required">
                  <option value="0">--请选择心情标签--</option>
                  <option>激情</option>
                  <option>伤感</option>
                  <option>安静</option>
                  <option>甜蜜</option>
                  <option>励志</option>
                  <option>寂寞</option>
                  <option>想念</option>
                  <option>浪漫</option>
                  <option>喜悦</option>
                  <option>深情</option>
                  <option>怀旧</option>
                </select>
              </div>
              <br />

              <div class="input-group">
                <span class="input-group-addon">喜爱&nbsp;&nbsp;程度</span>
                <select name="tag1_rate" id="tag1_rate" class="selectpicker form-control" required="required">
                  <option value="0">--请选择对应爱好程度--</option>
                  <option value="0.3">0.3</option>
                  <option value="0.5">0.5</option>
                  <option value="0.7">0.7</option>
                  <option value="1.0">1.0</option>
                </select>
              </div>
              <br />

              <div class="input-group">
                <span class="input-group-addon">喜爱标签1</span>
                <select name="tag2" id="tag2" class="selectpicker form-control" required="required">
                  <option value="0">--请选择年代标签--</option>
                  <option>90后</option>
                  <option>80后</option>
                  <option>70后</option>
                  <option>60年代</option>
                  <option>50年代</option>
                  <option>儿歌</option>
                </select>
              </div>
              <br />

              <div class="input-group">
                <span class="input-group-addon">喜爱&nbsp;&nbsp;程度</span>
                <select name="tag2_rate" id="tag2_rate" class="selectpicker form-control" required="required">
                  <option value="0">--请选择爱好程度--</option>
                  <option value="0.3">0.3</option>
                  <option value="0.5">0.5</option>
                  <option value="0.7">0.7</option>
                  <option value="1.0">1.0</option>
                </select>
              </div>
              <br />

              <div class="input-group">
                <span class="input-group-addon">喜爱标签1</span>
                <select name="type3" id="tag3" class="selectpicker form-control" required="required">
                  <option value="0">--请选择场景标签--</option>
                                          <option>校园</option>
                                          <option>旅行</option>
                                          <option>背景音乐</option>
                                          <option>午后</option>
                                          <option>广场舞</option>
                                          <option>夜店</option>
                                          <option>酒吧</option>
                                          <option>咖啡厅</option>
                                          <option>婚礼</option>
                                          <option>汽车</option>
                                          <option>毕业</option>
                </select>
              </div>
              <br />

              <div class="input-group">
                <span class="input-group-addon">喜爱&nbsp;&nbsp;程度</span>
                <select name="tag3_rate" id="tag3_rate" class="selectpicker form-control" required="required">
                  <option value="0">--请选择爱好程度--</option>
                  <option value="0.3">0.3</option>
                  <option value="0.5">0.5</option>
                  <option value="0.7">0.7</option>
                  <option value="1.0">1.0</option>
                </select>
              </div>
              <br />

            </div>

            <button class="btn btn-primary btn_self7" id="userPort">用户画像</button>

            <br />
    <br />
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

<script src="assets/js/jquery-1.10.2.js"></script>
<!-- Bootstrap Js -->
<script src="assets/js/bootstrap.min.js"></script>

    <script src="js/lib/jquery.js"></script>
    <script src="js/style.js"></script>
    <script src="js/more-style.js"></script>

<script>
    $("#userPort").click(function(){
      var user_id = "<%=user_id%>";
      var tag1 = $("#tag1").val();
      var tag1_rate = $("#tag1_rate").val();
      var tag2 = $("#tag2").val();
      var tag2_rate = $("#tag2_rate").val();
      var tag3 = $("#tag3").val();
      var tag3_rate = $("#tag3_rate").val();
      $.ajax({
      url: "http://localhost:8081/datacal/updateUserProtrayal?user_id="+user_id+"&tag1="+tag1+"&tag1_rate="+tag1_rate+"&tag2="+tag2+"&tag2_rate="+tag2_rate+"&tag3="+tag3+"&tag3_rate="+tag3_rate,
      async: false,
      type: "GET",
      success: function (res) {
        alert(res);
      }
      });
    });

</script>
</body>
</html>