(function template1() {

    function initPageBackgroundImage() {
        var backgroundImage = $('.page-background-image').data('background');
        $('.page-background-image').attr('src', backgroundImage);
    }

    function initViewImageItem() {
        $('a.view-image-item').each(function(idx, item) {
            $(item).attr('href', $(item).data('image'));
            $(item).children('img').attr('src', $(item).data('image'));
        });
    }

    function initSnsItem() {
        $('a.view-sns-item').each(function(idx, item) {
            if ($(item).data('url')) {
                $(item).attr('href', $(item).data('url'));
            }
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

    function addTemplateSaveEvent() {
        $('#template_editor_save_btn').on('TEMPLATE_SAVE_EVENT', function(e) {
            $('.view-sns-item > input').each(function(idx, item) {
                var $editItem = $(item);
                var $viewItem = $editItem.parent();
                var url = $editItem.val();
                if (url.indexOf("http://") < 0) {
                    url = "http://" + url;
                }
                $viewItem.attr('data-url', url);
            });
        });
    }

    function initTemplate1() {
        initPageBackgroundImage();
        initViewImageItem();
        initSnsItem();
        addImageChangeEvent();
        addTemplateSaveEvent();
    }

    initTemplate1();
}());