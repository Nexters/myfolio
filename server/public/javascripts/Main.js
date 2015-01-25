$(document).ready(function() {
    init();
});

function init() {
    addLogoClickEvent();
    addStartEvent();
    addLoginEvent();
    addJoinEvent();
    addLogoutEvent();
    addTemplateSelectEvent();

    //upload test code
    //addUploadButtonEvent();
}

function addLogoClickEvent() {
    $('#nav_logo_image').click(function() {
       location.href = "/";
    });
}

function addStartEvent() {
    $('.start-portfolio').click(function() {
        location.href = "/template/start";
    });
}

/*
function addUploadButtonEvent() {
    $('#file-upload').fileupload({
        dataType: 'json',
        progressall: function (e, data) {
            console.log("progress");
        },
        done: function (e, data) {
            console.log("upload image url: ",data.url+"/"+data.result);
        }
    });
}
*/

function addLoginEvent() {
    $('#login_modal_login_btn').click(function() {
        var inputId = $('#login_modal_input_id').val();
        var inputPw = $('#login_modal_input_pw').val();
        var params;

        if (!inputId) {
            alert("Input your ID!");
            return;
        }
        if (!inputPw) {
            alert("Input your Password!");
            return;
        }

        params = {
            id: loginId,
            pw: loginPwd
        };

        $.ajax({
            url: '/user/login',
            type: 'POST',
            data: params,
            error: function errorHandler(jqXHR, textStatus, errorThrown) {
                alert(textStatus);
            },
            success: function successHandler(data, status, xhr) {
                //이 로그들은 브라우져 콘솔에서 확인할수 있음
                console.log('login Main.js data : ',data);
                console.log('login Main.js status : ',status);

                if(data.code==1){
                    alert("로그인 성공");
                    $('#login_modal').modal('hide');
                    location.reload(true);
                }else{
                    alert("아이디 또는 비밀번호를 정확히 입력해주세요.");
                    return;
                }

            }
        });
    });
}

function addJoinEvent() {
    var regTest = /^[A-Za-z0-9+]*$/;
    var resEmailTest = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    $('#join_modal_input_id').blur(function() {
        var self = this;
        var inputId = $('#join_modal_input_id').val();
        if (!inputId) {
            return;
        }
        $.ajax({
            url: '/ajax/user/check/id/'+inputId,
            type: 'POST',
            error: function errorHandler(jqXHR, textStatus, errorThrown) {
                alert("CheckId fail! (Server error)");
            },
            success: function successHandler(data, status, xhr) {
                if (data.code === 0) {
                    alert(data.msg);
                    $(self).focus();
                    return;
                }
            }
        });
    });

    $('#join_modal_input_name').blur(function() {
        var self = this;
        var inputName = $('#join_modal_input_name').val();

        if (!inputName) {
            return;
        }
        $.ajax({
            url: '/ajax/user/check/name/'+inputName,
            type: 'POST',
            error: function errorHandler(jqXHR, textStatus, errorThrown) {
                alert("CheckName fail! (Server error)");
            },
            success: function successHandler(data, status, xhr) {
                if (data.code === 0) {
                    alert(data.msg);
                    $(self).focus();
                    return;
                }
            }
        });
    });

    $('#join_modal_join_btn').click(function() {
        var inputId = $('#join_modal_input_id').val();
        var inputPw = $('#join_modal_input_pw').val();
        var inputPwConfirm = $('#join_modal_input_pw_confirm').val();
        var inputName = $('#join_modal_input_name').val();
        var params;

        if (!inputId || !resEmailTest.test(inputId)) {
            alert("Check your id.");
            return;
        }
        if (!inputPw || !regTest.test(inputPw)) {
            alert("Check your password.");
            return;
        }
        if (!inputName) {
            alert("Input your name.");
            return;
        }
        if (inputPw !== inputPwConfirm) {
            alert("Input your password.");
            return;
        }

        params = {
            id: inputId,
            pw: inputPw,
            name: inputName
        };

        $.ajax({
            url: '/ajax/user/join',
            type: 'POST',
            data: params,
            error: function errorHandler(jqXHR, textStatus, errorThrown) {
                alert("Signup fail! (Server error)");
            },
            success: function successHandler(data, status, xhr) {
                alert("Signup success!");
                $('#join_modal').modal('hide');
                location.reload(true);
            }
        });
    });
}
function addLogoutEvent(){
    $('#nav_logout_btn').click(function(){
        $.ajax({
            url: '/user/logout',
            type: 'POST',
            error: function errorHandler(jqXHR, textStatus, errorThrown) {
                alert(textStatus);
            },
            success: function successHandler(data, status, xhr) {
                alert("로그아웃");
                location.reload(true);
            }
        });
    });
}

function addTemplateSelectEvent() {
    $('.select-template-container > div').click(function() {
        var templateId = $(this).data('id');
        if (!IS_LOGIN) {
            $('#login_modal').modal('show');
            return;
        }
        $.ajax({
            url: '/ajax/portfolio/template/' + templateId,
            type: 'POST',
            error: function errorHandler(jqXHR, textStatus, errorThrown) {
                alert("Portfolio make fail! (Server error)");
            },
            success: function successHandler(data, status, xhr) {
                if (data.code === 1) {
                    location.href = "/" + data.result.userName;
                } else {
                    alert(data.msg);
                }
            }
        });
    });
}