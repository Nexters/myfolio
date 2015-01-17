$(document).ready(function() {
    init();
});

function init() {
    addLoginEvent();
    addJoinEvent();
    outEvent();
}

function addLoginEvent() {
    $('#login_modal_login_btn').click(function() {
        console.log("여기에 로그인 코드 구현!");
        var loginId = $('#login_modal_input_id').val();
        var loginPwd = $('#login_modal_input_pw').val();

        if(!loginId){
            alert("아이디를 입력해주세요.");
            return;
        }
        if(!loginPwd){
            alert("비밀번호를 입력해주세요.");
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


function outEvent(){
    $('#btn_logout').click(function(){

        $.ajax({
            url:'/user/logout',
            type:'POST',
            success: function successHandeler(data, status, xhr){
                alert("로그아웃");
                location.reload(true);
            }
        })

    })


}