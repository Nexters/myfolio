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
            alert("ID를 입력해주세요.");
            return;
        }
        if (!inputPw) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        params = {
            id: inputId,
            pw: inputPw
        };

        $.ajax({
            url: '/user/login',
            type: 'POST',
            data: params,
            error: function errorHandler(jqXHR, textStatus, errorThrown) {
                alert("로그인 실패(서버 에러 발생)");
            },
            success: function successHandler(data, status, xhr) {
                if (data.code === 1 && data.msg === "login success") {
                    console.log("로그인 성공");
                    $('#login_modal').modal('hide');
                    location.reload(true);
                } else {
                    alert("ID와 비밀번호를 확인해주세요.");
                }
                //location.reload(true);
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
            alert("ID는 숫자, 알파벳만 사용 가능합니다.");
            return;
        }
        if (!inputPw || !regTest.test(inputPw)) {
            alert("비밀번호는 숫자, 알파벳 대소문자만 사용 가능합니다.");
            return;
        }
        if (!inputName) {
            alert("이름을 입력해주세요.");
            return;
        }
        if (inputPw !== inputPwConfirm) {
            alert("패스워드를 확인해주세요.");
            return;
        }

        params = {
            id: inputId,
            pw: inputPw,
            name: inputName
        };

        $.ajax({
            url: '/user/join',
            type: 'POST',
            data: params,
            error: function errorHandler(jqXHR, textStatus, errorThrown) {
                alert("회원가입 실패(서버 에러 발생)");
            },
            success: function successHandler(data, status, xhr) {
                alert("회원가입 완료");
                $('#join_modal').modal('hide');
                location.reload(true);
            }
        });
    });
}

function addLogoutEvent() {
    $('#nav_logout_btn').click(function() {
        $.ajax({
            url: '/user/logout',
            type: 'POST',
            error: function errorHandler(jqXHR, textStatus, errorThrown) {
                alert("로그아웃 실패(서버 에러 발생)");
            },
            success: function successHandler(data, status, xhr) {
                alert("로그아웃 되었습니다");
                location.reload(true);
            }
        });
    });
}