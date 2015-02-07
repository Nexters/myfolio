function navFunction(tag){
    switch (tag){
        case 1:
            document.getElementsByName("first");
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
