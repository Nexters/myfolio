(function common() {
    'use strict';

    function addEditorEvent() {
        // 템플릿 수정하기 버튼 클릭
        $('#template_editor_modify_btn').click(function() {
            $('.is-view-mode').addClass('hide');
            $('.is-edit-mode').removeClass('hide');
            addTemplateNavTitleEvent();
        });

        $('#template_editor_save_btn').click(function() {
            $('.is-view-mode').removeClass('hide');
            $('.is-edit-mode').addClass('hide');
            //TODO: is-edit-mode에 있는 내용들 is-view-mode로 복사!
        });

        $('#template_editor_cancel_btn').click(function() {
            $('.is-view-mode').removeClass('hide');
            $('.is-edit-mode').addClass('hide');
            //TODO: 배경 이미지 바꿨으면 다시 원래대로 돌려야함!
        });
    }

    function addTemplateNavTitleEvent() {
        var $item;
        // 밑에 제목 내용 변경되면 위에 에디터 툴 제목 내용도 변경되도록 이벤트 바인딩!
        $('.template-nav-menu > .is-edit-mode').children().each(function(idx, item) {
            $item = $(item);
            $('#toolbar_nav_title_container a:eq('+idx+')').text($item.val());
            $item.blur(function() {
                $('#toolbar_nav_title_container a:eq('+idx+')').text($(this).val());
            });
        });
    }

    function initCommon() {
        addEditorEvent();
    }

    initCommon();
}());