(function template2() {
    'use strict';

    function initBackgroundImage() {
        var backgroundImage = $('body').data('background');
        $('body').css('background', 'url("' + backgroundImage + '") no-repeat');
        $('body').css('background-size', 'cover');
    }

    function addNavTitleClickEvent() {
        $('.template-nav-menu > .is-view-mode').children().each(function(idx, item) {
            var pageIdx = idx + 1;
            $(item).click(function() {
                var contentPage = "content-page" + pageIdx;
                // 기존 페이지 전부 숨기고 현재 선택된 페이지만 보여줌!
                $('div.common-page-container').addClass('hide');
                $('.'+contentPage).removeClass('hide');
            });
        });
    }

    function addBackgroundChangeEvent() {
        $('#background-file-upload-btn').fileupload({
            dataType: 'json',
            progressall: function (e, data) {
                console.log("progress");
            },
            done: function (e, data) {
                var uploadedImageUrl = "/image/" + data.result;
                $('body').css('background', 'url("' + uploadedImageUrl + '") no-repeat');
                $('body').css('background-size', 'cover');
            }
        });
    }

    function addTemplateSaveEvent() {
        $('#template_editor_save_btn').on('TEMPLATE_SAVE_EVENT', function(e) {
            console.log("SAVE");
        });
    }

    function initTemplate2() {
        initBackgroundImage();
        addNavTitleClickEvent();
        addBackgroundChangeEvent();
        addTemplateSaveEvent();
    }

    initTemplate2();
}());