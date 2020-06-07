var ret = false;
var url = "https://saopj.linxun.link";
$(document).ready(function () {
    $("#username").blur(function () {
        var username = $("#username").val();
        if (isChina(username)) {
            $("#p_uname").text("用户名不能包含中文字符！");
            ret = false;
        } else if (!usserName(username)) {
            $("#p_uname").text("用户名长度为2到16位数，不能包含特殊字符！");
        } else {
            $("#p_uname").text("");
            ret = true;
            $.get(url + "/api/registered/user/name/" + username, result);

            function result(e) {
                if (e.code != 200) {
                    $("#p_uname").text("用户名已被使用！");
                    ret = false;
                }
            }
        }
    });
    $("#email").blur(function () {
        var email = $("#email").val();
        if (!pemail(email)) {
            $("#p_email").text("邮箱格式错误！");
            ret = false;
        } else {
            $("#p_email").text("");
            ret = true;
            $.get(url + "/api/registered/email/" + email, result);
        }

        function result(e) {
            if (e.code != 200) {
                $("#p_email").text("邮箱已被注册！");
                ret = false;
            }
        }
    });
    $("#password").blur(function () {
        var password = $("#password").val();
        if (!pwd(password)) {
            $("#p_pwd").text("密码必须是6到20位数，且是数字或英文字母或特殊字符中任意两种组合！");
            ret = false;
        } else {
            $("#p_pwd").text("");
            ret = true;
        }
    });
    $("#upassword").blur(function () {
        var password = $("#password").val();
        var upassword = $("#upassword").val();
        if (password === upassword) {
            $("#p_upwd").text("");
            ret = true;
        } else {
            $("#p_upwd").text("两次密码不一致！");
            ret = false;
        }
    });

    $("#upassword").blur(function () {
        var password = $("#password").val();
        var upassword = $("#upassword").val();
        if (password === upassword) {
            $("#p_upwd").text("");
            ret = true;
        } else {
            $("#p_upwd").text("两次密码不一致！");
            ret = false;
        }
    });

    
    $(".button").click(function () {
        var params  = $('#form_id').serializeArray();
        var values = {};
		 for( x in params  ){
		 	values[params[x].name] = params[x].value;
		 }
         var data = JSON.stringify(values)
         console.log(data)
        $.post(url+"/api/registered/reg",params,result);
        function result(e){
            if(e.code == 200){
                location.href = "./200.html"
            }else{
                location.href = "./500.html"
            }
        }
    });
});//end
function verification() {
    return ret;
}

/**
 * 检测是否包含中文
 * @param str
 * @returns {boolean} 包含返回 true
 */
function isChina(str) {
    var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
    return patrn.test(str);
}

/**
 * 用户名验证
 * @param str
 * @returns {boolean}
 */
function usserName(str) {
    var uPattern = /^[a-zA-Z0-9_]{2,16}$/;
    return uPattern.test(str);
}

/**
 * 邮箱验证
 * @param str
 * @returns {boolean}
 */
function pemail(str) {
    var ePattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return ePattern.test(str)
}

/**
 * 密码验证，不能是数字，纯字母，纯特殊字符。
 * 必须是以上两种任意混合密码
 * @param str
 * @returns {boolean}
 */
function pwd(str) {
    var pattern = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
    return pattern.test(str);
}