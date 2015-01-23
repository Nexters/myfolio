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
        location.href = "/template/start";
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
            id: inputId,
            pw: inputPw
        };

        $.ajax({
            url: '/ajax/user/login',
            type: 'POST',
            data: params,
            error: function errorHandler(jqXHR, textStatus, errorThrown) {
                alert("Login fail! (Server error)");
            },
            success: function successHandler(data, status, xhr) {
                if (data.code === 1 && data.msg === "login success") {
                    $('#login_modal').modal('hide');
                    location.reload(true);
                } else {
                    alert("Check your ID and Password!");
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

function addLogoutEvent() {
    $('#nav_logout_btn').click(function() {
        $.ajax({
            url: '/ajax/user/logout',
            type: 'POST',
            error: function errorHandler(jqXHR, textStatus, errorThrown) {
                alert("Logout fail! (Server error)");
            },
            success: function successHandler(data, status, xhr) {
                alert("Logout success!");
                location.reload(true);
            }
        });
    });
}