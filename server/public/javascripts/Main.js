$(document).ready(function() {
    init();
});

function init() {
    addLoginEvent();
    addJoinEvent();

    //test code
    addUploadButtonEvent();
}


function addUploadButtonEvent() {
    $('#file-upload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo(document.body);
            });
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