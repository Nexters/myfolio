$(document).ready(function() {
    init();
});

function init() {
    addJoinEvent();
}

function addJoinEvent() {
    $('#join_modal_join_btn').click(function() {
        var regTest = /^[A-Za-z0-9+]*$/;
        var inputId = $('#join_modal_input_id').val();
        var inputPw = $('#join_modal_input_pw').val();
        var params;

        if(!regTest.test(inputId)){
            alert("ID는 숫자, 알파벳만 사용 가능합니다.");
            return;
        }
        if(!regTest.test(inputPw)){
            alert("비밀번호는 숫자, 알파벳 대소문자만 사용 가능합니다.");
            return;
        }

        params = {
            id: inputId,
            pw: inputPw
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
            }
        });
    });
}