$(document).ready(function() {
    init();
});

function init() {
    addLogoClickEvent();
    addStartEvent();
    addLoginEvent();
    addJoinEvent();
    addLogoutEvent();


    //test code
    addUploadButtonEvent();
}

function addLogoClickEvent() {
    $('#nav_logo_image').click(function() {
       location.href = "/";
    });
}

function addStartEvent() {
    $('.start-portfolio').click(function() {
        // TODO: 여기에 포트폴리오 시작하기 구현
        console.log("Start!");
    });
}

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
    $('#join_modal_join_btn').click(function() {
        var regTest = /^[A-Za-z0-9+]*$/;
        var inputId = $('#join_modal_input_id').val();
        var inputPw = $('#join_modal_input_pw').val();
        var inputPwConfirm = $('#join_modal_input_pw_confirm').val();
        var inputName = $('#join_modal_input_name').val();
        var params;

        if (!inputId || !regTest.test(inputId)) {
            alert("ID is allowed only number and alphaber.");
            return;
        }
        if (!inputPw || !regTest.test(inputPw)) {
            alert("Password is allowed only number and alphabet.");
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