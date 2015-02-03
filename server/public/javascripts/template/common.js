(function common() {
    'use strict';

    function addEditorEvent() {
        // 템플릿 수정하기 버튼 클릭
        $('#template_editor_modify_btn').click(function() {
            $('.is-view-mode').addClass('hide');
            $('.is-edit-mode').removeClass('hide');
        });

        $('#template_editor_save_btn').click(function() {
            $('.is-view-mode').removeClass('hide');
            $('.is-edit-mode').addClass('hide');
            //TODO: is-edit-mode에 있는 내용들 is-view-mode로 복사!
        });

        $('#template_editor_cancel_btn').click(function() {
            $('.is-view-mode').removeClass('hide');
            $('.is-edit-mode').addClass('hide');
        });
    }

    function init() {
        addEditorEvent();
    }

    init();
}());