(function main() {
    'use strict';


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
        var regTest = /^[A-Za-z0-9+]*$/;
        var regEmailTest = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;


        $('#join_modal_input_id').blur(function() {
            var self = this;
            var inputId = $('#join_modal_input_id').val();
            if (!inputId) {
                return;
            }
            if (!regEmailTest.test(inputId)) {
                $(self).focus();
                $('#join-error-msg').text("Invalid Email.");
                $('#join-error-msg').removeClass('hide');
                return;
            }


            $('#join-error-msg').addClass('hide');


            $.ajax({
                url: '/ajax/user/check/id/'+inputId,
                type: 'POST',
                error: function errorHandler(jqXHR, textStatus, errorThrown) {
                    alert("CheckId fail! (Server error)");
                },
                success: function successHandler(data, status, xhr) {
                    if (data.code === 0) {
                        $(self).focus();
                        $('#join-error-msg').text(data.msg);
                        $('#join-error-msg').removeClass('hide');
                        return;
                    }
                    $('#join-error-msg').addClass('hide');
                }
            });
        });


        $('#join_modal_input_name').blur(function() {
            var self = this;
            var inputName = $('#join_modal_input_name').val();


            if (!inputName) {
                return;
            }


            $('#join-error-msg').addClass('hide');


            $.ajax({
                url: '/ajax/user/check/name/'+inputName,
                type: 'POST',
                error: function errorHandler(jqXHR, textStatus, errorThrown) {
                    alert("CheckName fail! (Server error)");
                },
                success: function successHandler(data, status, xhr) {
                    if (data.code === 0) {
                        $(self).focus();
                        $('#join-error-msg').text(data.msg);
                        $('#join-error-msg').removeClass('hide');
                        return;
                    }
                    $('#join-error-msg').addClass('hide');
                }
            });
        });


        $('#join_modal_join_btn').click(function() {
            var inputId = $('#join_modal_input_id').val();
            var inputPw = $('#join_modal_input_pw').val();
            var inputPwConfirm = $('#join_modal_input_pw_confirm').val();
            var inputName = $('#join_modal_input_name').val();
            var params;


            if (!inputId || !regEmailTest.test(inputId)) {
                alert("Check your id.(id must be email)");
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
                    if (data.code === 0) {
                        alert(data.msg);
                        return;
                    }
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


    function addTemplateSelectEvent() {
        $('.select-template-container > div').click(function() {
            var templateId = $(this).data('id');
            if (!IS_LOGIN) {
                $('#login_modal').modal('show');
                return;
            }
            if (!confirm("Do you want to use this template?")) {
                return;
            }
            $.ajax({
                url: '/ajax/portfolio/template/' + templateId,
                type: 'POST',
                error: function errorHandler(jqXHR, textStatus, errorThrown) {
                    alert("Portfolio make fail! (Server error)");
                },
                success: function successHandler(data, status, xhr) {
                    if (data.code === 0) {
                        alert(data.msg);
                        return;
                    }
                    location.href = "/" + data.userName;
                }
            });
        });
    }


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


    init();
}());


