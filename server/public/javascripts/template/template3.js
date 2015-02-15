(function template3() {
    'use strict';
    var height;
    var count=0;
    var img_arr = [];
    $(window).scroll(function () {
        height = $(document).scrollTop();
        if(height>=0 && height<750){
            $('#1').css('border-top-color','#CC4d4d');
            $('#1').css('border-solid','solid');
            $('#1').css('border-top-width','3px');
            $('#2').css('border-width','0px');
            $('#3').css('border-width','0px');
        }
        else if(height>=750 && height<1700){
            $('#2').css('border-top-color','#CC4d4d');
            $('#2').css('border-solid','solid');
            $('#2').css('border-top-width','3px');
            $('#1').css('border-width','0px');
            $('#3').css('border-width','0px');
        }
        else if(height>=1700){
            $('#3').css('border-top-color','#CC4d4d');
            $('#3').css('border-solid','solid');
            $('#3').css('border-top-width','3px');
            $('#1').css('border-width','0px');
            $('#2').css('border-width','0px');
        }
    });
    function addnavBtnEvent(tag){
        $('#1').bind('click', function(e) {
            window.scrollTo(0,0);
        });
        $('#2').bind('click',function(e){
            window.scrollTo(0,750);
        });
        $('#3').bind('click',function(e){
            window.scrollTo(0,1700);
        });
    }
    function initViewImageItem() {
        $('a.view-image-item').each(function(idx, item) {
            $(item).attr('href', $(item).data('image'));
            $(item).children('img').attr('src', $(item).data('image'));
        });
        img_arr.push($('#img_item1').attr('src'));
        img_arr.push($('#img_item2').attr('src'));
        img_arr.push($('#img_item3').attr('src'));
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
        addnavBtnEvent();
    }
    initTemplate3();
}());
