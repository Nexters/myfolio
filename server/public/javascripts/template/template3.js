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

    function initTemplate3() {
        //init datas
    }
    initTemplate3();
}());
