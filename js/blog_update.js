/**
 * Created by HaiMing.Guo on 2016/9/5.
 */
"use strict";
function category(obj) {
    var category = "";
    if( obj.innerText == "Linux"){
        category = "Linux";
        console.log("Linux category clicked")
    } else if (obj.innerText == "Android" ){
        category = "Android";
        console.log("Android category clicked")
    } else if (obj.innerText == "Program Language" ){
        category = "Programe Language";
        console.log("Programe Language category clicked")
    }

    var titleElement = document.getElementById("blog_title_panel");
    if(titleElement){
        titleElement.innerText = category;
    }

}