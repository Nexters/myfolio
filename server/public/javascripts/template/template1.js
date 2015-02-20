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


    function initTemplate1() {
        initPageBackgroundImage();
        initViewImageItem();
    }

    initTemplate1();
}());