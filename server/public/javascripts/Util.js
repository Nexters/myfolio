'use strict';

var Util = {
    makeTextareaValueToHtmlTag: function(textareaValue) {
        var strArray = textareaValue.split('\n');
        var resultStr = "";
        var str, i;

        for (i=0; i<strArray.length; i++) {
            str = strArray[i];
            str = str.trim();
            str = "<p>"+str+"</p>";
            resultStr += str;
        }

        return resultStr;
    }
};