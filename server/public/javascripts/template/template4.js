(function template4() {
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

    function initNavImage() {
        var navImage = $('nav').data('background');
        $('nav').css('background', 'url("' + navImage + '") no-repeat');
        $('nav').css('background-size', 'cover');
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

    function addEditorTitleClickEvent() {
        $('#toolbar_nav_title_container').children().each(function(idx, item) {
            _showSelectedPage(idx, item);
        });
    }

    function addImageChangeEvent() {
        $('.image-file-upload-btn').unbind('fileupload').fileupload({
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

    function initTemplate4() {
        initNavImage();
        initViewImageItem();
        addNavTitleClickEvent();
        addEditorTitleClickEvent();
        addImageChangeEvent();
    }

    initTemplate4();
}());