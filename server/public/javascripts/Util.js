'use strict';

var Util = {
    makeTextareaValueToHtmlTag: function(textareaValue) {
        var strArray = textareaValue.split('\n');
        var resultHtml = "";
        var str, i;

        for (i=0; i<strArray.length; i++) {
            str = "<p>" + strArray[i].trim() + "</p>";
            resultHtml += str;
        }

        return resultHtml;
    }
};