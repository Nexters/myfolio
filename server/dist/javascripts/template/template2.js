!function(){"use strict";function e(e,i){var t=e+1;$(i).click(function(){var i="content-page"+t;$(".template-nav-title > .nav-title-item").removeClass("selected"),$(".template-nav-title > .nav-title-item:eq("+e+")").addClass("selected"),$("#toolbar_nav_title_container > a").removeClass("selected"),$("#toolbar_nav_title_container > a:eq("+e+")").addClass("selected"),$("div.common-page-container").addClass("hide"),$("."+i).removeClass("hide")})}function i(e,i){var t="";return t+='<div class="photo-image-box">',t+='<i class="image-change-btn is-edit-mode"></i>',t+='<i class="image-delete-btn is-edit-mode"></i>',t+='<input class="image-file-upload-btn hided-input-file-btn is-edit-mode" type="file" name="files[]" data-url="/ajax/upload">',t+='<a class="view-image-item" href="'+e+'" data-image="'+e+'" data-lightbox="'+i+'">',t+='<img class="edit-image-item" src="'+e+'"/>',t+="</a>",t+="</div>",t+='<div class="photo-image-box-text">',t+='<p class="photo-image-box-title is-view-mode view-item hide"></p>',t+='<input type="text" class="photo-image-box-title is-edit-mode edit-item" placeHolder="Title">',t+='<div class="photo-image-box-content-container">',t+='<div class="photo-image-box-content is-view-mode view-item hide">',t+="</div>",t+='<textarea class="photo-image-box-content is-edit-mode edit-item" placeholder="Contents">',t+="</textarea>",t+="</div>",t+="</div>"}function t(){var e=$("body").data("background");$("body").css("background",'url("'+e+'") no-repeat'),$("body").css("background-size","cover")}function a(){$("a.view-image-item").each(function(e,i){$(i).attr("href",$(i).data("image")),$(i).children("img").attr("src",$(i).data("image"))})}function o(){$(".template-nav-menu > .is-view-mode").children().each(function(i,t){e(i,t)})}function n(){$("#toolbar_nav_title_container").children().each(function(i,t){e(i,t)})}function l(){$(".background-file-upload-btn").unbind("fileupload").fileupload({dataType:"json",progressall:function(){console.log("progress")},done:function(e,i){var t="/image/"+i.result;$("body").css("background",'url("'+t+'") no-repeat'),$("body").css("background-size","cover")}})}function s(){$(".image-file-upload-btn").unbind("fileupload").fileupload({dataType:"json",progressall:function(){console.log("progress")},done:function(e,i){var t="/image/"+i.result;$(this).parent().children(".view-image-item").attr("href",t),$(this).parent().children(".view-image-item").children("img").attr("src",t)}})}function d(){$(".image-delete-btn").unbind("click").click(function(){$(this).parent().remove()})}function c(){$(".new-image-file-upload-btn").unbind("fileupload").fileupload({dataType:"json",progressall:function(){console.log("progress")},done:function(e,t){var a="/image/"+t.result,o=$(this).parents(".add-photo-image-box"),n=i(a,"page2_lightbox");o.before(n),s(),d()}})}function r(){$("#template_editor_save_btn").on("TEMPLATE_SAVE_EVENT",function(){console.log("SAVE")})}function m(){t(),a(),o(),n(),l(),s(),c(),r()}m()}();