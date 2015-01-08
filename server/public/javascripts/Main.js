$(document).ready(function() {
    init();
});

function init() {
    addLoginEvent();
    addJoinEvent();
}

function addLoginEvent() {
    $('#login_modal_login_btn').click(function() {
        console.log("여기에 로그인 코드 구현!");
        var loginId=$('#join_modal_login_id').val();
        var loginPw = $('#join_modal_login_pw').val();
        var params;
    });

    params = {
        id: loginId,
        pw: loginPw
    };


    if(!loginId){
        alert("ID를 입력해주세요.");
        return;
    }
    if(!loginPw){
        alert("PW를 입력해주세요.");
        return;
    }

    /*if(loginId == user.USER_ID && user.loginId ==USER_PW){
        alert("로그인 성공!");
    }
    else
    alert("로그인 실패!");*/

    $.ajax({
        url: '/user/login',
        type: 'POST',
        data: params,
        error: function errorHandler(jqXHR, textStatus, errorThrown) {
            alert(textStatus);
        },
        success: function successHandler(data, status, xhr) {
            alert("로그인 완료");
            $('#login_modal').modal('hide');
            location.reload(true);
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
                alert(textStatus);
            },
            success: function successHandler(data, status, xhr) {
                alert("회원가입 완료");
                $('#join_modal').modal('hide');
                location.reload(true);
            }
        });
    });
}