(function template2() {
    'use strict';

    /**
     * 현재 클릭한 아이템에 해당하는 페이지 보여주는 내부 함수
     * @param idx
     * @param item
     * @private
     */
    function _showSelectedPage(idx, item) {
        var pageIdx = idx + 1;
        $(item).click(function() {
            var contentPage = "content-page" + pageIdx;
            // nav에서 현재 선택된 메뉴 표시
            $('.template-nav-title > .nav-title-item').removeClass('selected');
            $('.template-nav-title > .nav-title-item:eq('+idx+')').addClass('selected');
            // toolbar에서 현재 선택된 메뉴 표시
            $('#toolbar_nav_title_container > a').removeClass('selected');
            $('#toolbar_nav_title_container > a:eq('+idx+')').addClass('selected');
            // 기존 페이지 전부 숨기고 현재 선택된 페이지만 보여줌!
            $('div.common-page-container').addClass('hide');
            $('.'+contentPage).removeClass('hide');
        });
    }

    function _makeHomeImageBoxHtml(imageUrl, lightBoxData) {
        var html = "";
        html += '<div class="home-image-box">';
        html += '<i class="image-change-btn is-edit-mode hide"></i>';
        html += '<input class="image-file-upload-btn hided-input-file-btn is-edit-mode hide" type="file" name="files[]" data-url="/ajax/upload">';
        html += '<a class="view-image-item" href="' + imageUrl + '" data-image="' + imageUrl + '" data-lightbox="' + lightBoxData + '">';
        html += '<img class="edit-image-item" src="' + imageUrl + '"/>';
        html += '</a>';
        html += '</div>';

        return html;
    }

    function initBackgroundImage() {
        var backgroundImage = $('body').data('background');
        $('body').css('background', 'url("' + backgroundImage + '") no-repeat');
        $('body').css('background-size', 'cover');
    }

    function initViewImageItem() {
        $('a.view-image-item').each(function(idx, item) {
            $(item).attr('href', $(item).data('image'));
            $(item).children('img').attr('src', $(item).data('image'));
        });
    }

    function addNavTitleClickEvent() {
        $('.template-nav-menu > .is-view-mode').children().each(function(idx, item) {
            _showSelectedPage(idx, item);
        });
    }

    function addEditorTilteClickEvent() {
        $('#toolbar_nav_title_container').children().each(function(idx, item) {
            _showSelectedPage(idx, item);
        });
    }

    function addBackgroundChangeEvent() {
        $('.background-file-upload-btn').fileupload({
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

    function addImageChangeEvent() {
        $('.image-file-upload-btn').fileupload({
            dataType: 'json',
            progressall: function (e, data) {
                console.log("progress");
            },
            done: function (e, data) {
                var uploadedImageUrl = "/image/" + data.result;
                $(this).parent().children('.view-image-item').attr('href',uploadedImageUrl);
                $(this).parent().children('.view-image-item').children('img').attr('src',uploadedImageUrl);
            }
        });
    }

    function addImageAddEvent() {
        $('.new-image-file-upload-btn').fileupload({
            dataType: 'json',
            progressall: function (e, data) {
                console.log("progress");
            },
            done: function (e, data) {
                var uploadedImageUrl = "/image/" + data.result;
                var $tmpImageBox = $(this).parents('.home-image-box');
                var insertedHtml = _makeHomeImageBoxHtml(uploadedImageUrl, 'page2_lightbox');

                $tmpImageBox.before(insertedHtml);
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
        initViewImageItem();
        addNavTitleClickEvent();
        addEditorTilteClickEvent();
        addBackgroundChangeEvent();
        addImageChangeEvent();
        addImageAddEvent();
        addTemplateSaveEvent();
    }

    initTemplate2();
}());