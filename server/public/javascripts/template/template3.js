(function template3() {
    'use strict';
    var count=0;
    var img_arr = [];
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
    function initViewImageItem() {
        $('a.view-image-item').each(function(idx, item) {
            $(item).attr('href', $(item).data('image'));
            $(item).children('img').attr('src', $(item).data('image'));
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
    function addImageDeleteEvent() {
        $('.image-delete-btn').unbind('click').click(function() {
            $(this).parent().remove();
        });
    }
    function addImageNextEvent(){
        img_arr.push($('#img_item1').attr('src'));
        img_arr.push($('#img_item2').attr('src'));
        img_arr.push($('#img_item3').attr('src'));
        $('#right_btn').bind('click',function(){
            console.log('count : ',count);
            if(count>=0 && count<2){
                count++;
                $('.imgs').css('background','url("' + img_arr[count] + '") no-repeat');
                $('.imgs').css('background-size', 'cover');
            }
        });
    }
    function addImageBeforeEvent(){
        $('#left_btn').bind('click',function(){
            console.log('count : ',count);
            if(count>=1 && count<3){
                count--;
                $('.imgs').css('background','url("' + img_arr[count] + '") no-repeat');
                $('.imgs').css('background-size', 'cover');
            }
        });
    }
    function addTemplateSaveEvent() {
        $('#template_editor_save_btn').on('TEMPLATE_SAVE_EVENT', function(e) {
            console.log("SAVE");
        });
    }

    function initTemplate3() {
        initViewImageItem();
        addImageChangeEvent();
        addImageDeleteEvent();
        addImageNextEvent();
        addImageBeforeEvent();
        addTemplateSaveEvent();
    }
    initTemplate3();
}());
