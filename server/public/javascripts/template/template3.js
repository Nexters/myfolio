(function template2() {
    'use strict';
    function addnavBtn(tag){
        $('#template_editor_save_btn').on('TEMPLATE_SAVE_EVENT', function(e) {
            console.log("SAVE");
        });
        switch (tag){
            case 1:
                window.scrollTo(0,0);
                break;
            case 2:
                window.scrollTo(0,700);
                break;
            case 3:
                window.scrollTo(0,1800);
                break;
            default:
                break;
        }
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
    function addImageDeleteEvent() {
        $('.image-delete-btn').unbind('click').click(function() {
            $(this).parent().remove();
        });
    }

    function initTemplate3() {
        //init datas
        addImageChangeEvent();
        addImageDeleteEvent();
    }
    initTemplate3();
}());
