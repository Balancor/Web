/**
 * Created by guoguo on 2016/9/3.
 */
"use strict";

const MARGIN_LEFT = 15;
const MARGIN_RIGHT = 15;
const blogTitleHeightScalor = 0.07;
const LEFT_PANEL_SCALOR = 0.1;
const navigation_height =300;
const content_index_height = 300;

var categories = [];

function findDimensions() {
    var w = window.innerWidth,
        h = window.innerHeight;
    console.log("window.innerWidth   = "+w);
    console.log(" window.innerHeight, = "+h);
    if (typeof w !== "number") {//IE
        if (document.compatMode == "CSS1Compat") {//标准模式
            w = document.documentElement.clientWidth;
            h = document.documentElement.clientHeight;
        } else {//混杂模式 IE6中无<!doctype >声明
            w = document.body.clientWidth;
            h = document.body.clientHeight;
        }
    }

    if(isBodyScrollBarExists()){
        w = w - getScrollbarWidth();
    }

    console.log("findDimensions w  = "+w);
    console.log("findDimensions h = "+h);
    return {
        'width': w,
        'height': h
    }
}

function isBodyScrollBarExists() {
    var isExisted = false;
    if (document.body.style.overflow != "hidden" &&
            document.body.scrollHeight >= document.body.clientWidth) {
        isExisted = true;
    }
    return isExisted;
}



function initBodyStyle() {
    if(document.body){
        document.body.style.height = window.innerHeight+"px";
        document.body.style.width  = window.innerWidth+"px";
    }
}

function getBodyScrollBarWidth() {
    var scrollWidth = 0;
    if(document.body){
        var offsetWidth = document.body.offsetWidth;
        var clientWidth = document.body.clientWidth;
        console.log("scroll bar offsetWidth = " + offsetWidth);
        console.log("scroll bar clientWidth = " + clientWidth);
        scrollWidth = offsetWidth - clientWidth;
    }

    console.log("scroll bar width = " + scrollWidth);
    return scrollWidth;
}

function initBlogTitleStyle() {
    var element = document.getElementById("blog_title_panel");
    if(element){
        var ret = findDimensions();
        var visibleWidth = ret['width'];
        var visibleHeight = ret['height'];
        var tempWidth = visibleWidth;
        tempWidth = tempWidth - MARGIN_LEFT - MARGIN_RIGHT/*margin*/;
        tempWidth = tempWidth - 2/*border width*/;
        element.style.height = (visibleHeight * blogTitleHeightScalor) + "px";
        element.style.width = tempWidth +"px";
        element.style.marginRight = MARGIN_RIGHT + "px";
        element.style.marginLeft = MARGIN_LEFT +"px";
        element.style.lineHeight  = element.style.height;
    }
}

function initMainPanel() {
    var element = document.getElementById("main_panel");
    if(element){
        var ret = findDimensions();
        var visibleWidth = ret['width'];
        var visibleHeight = ret['height'];
        var tempWidth = visibleWidth;
        tempWidth = tempWidth - MARGIN_LEFT - MARGIN_RIGHT/*margin*/;
        tempWidth = tempWidth - 2/*border width*/;
        element.style.width = tempWidth +"px";
        element.style.marginRight = MARGIN_RIGHT + "px";
        element.style.marginLeft = MARGIN_LEFT +"px";
        element.style.height = (visibleHeight * (1 - blogTitleHeightScalor) - 20 - 8)+"px";


        /*Init child node*/
        initLeftPanelStyle();
        initRightPanelStyle();
    }

}

function initLeftPanelStyle() {
    var element = document.getElementById("left_panel");
    if(element) {
        var parentNode = element.parentNode;
        if(parentNode){
            var parentWidth = parseInt(parentNode.style.width);
            var parentHeight = parseInt(parentNode.style.height);
            element.style.width = (parentWidth * LEFT_PANEL_SCALOR) +"px";
            element.style.height = parentHeight +"px";
            element.style.marginRight = MARGIN_RIGHT +"px";

        }
        initNavigationAndIndexStyle();
    }
}

function initNavigationAndIndexStyle() {
    var navElement = document.getElementById("navigation_panel");
    var blogIndexElement = document.getElementById("blog_index");
    if(navElement && blogIndexElement) {
        var parentNode = navElement.parentNode;
        if(parentNode){
            var parentWidth = parseInt(parentNode.style.width);
            // var parentHeight = parseInt(parentNode.style.height);
            navElement.style.width = parentWidth +"px";
            blogIndexElement.style.width = parentWidth +"px";
            var marginVertical = 20;

            navElement.style.marginBottom = marginVertical +"px";

            // var height = (parentHeight - marginVertical ) / 2;
            navElement.style.height = navigation_height +"px";
            blogIndexElement.style.height = content_index_height +"px";
        }
    }

    if(blogIndexElement){

    }

}

function initRightPanelStyle() {
    var element = document.getElementById("right_panel");
    if(element) {
        var parentNode = element.parentNode;
        if(parentNode){
            var parentWidth = parseInt(parentNode.style.width);
            var parentHeight = parseInt(parentNode.style.height);
            var tempWidth = parentWidth * (1 - LEFT_PANEL_SCALOR);
            tempWidth = tempWidth - MARGIN_RIGHT - MARGIN_LEFT;
            element.style.width = tempWidth +"px";
            element.style.height = parentHeight +"px";
            element.style.marginLeft = MARGIN_LEFT +"px";
        }
        initBlogBodyStyle();
    }
}


function initBlogBodyStyle() {
    var element = document.getElementById("blog_body");
    if(element) {
        var parentNode = element.parentNode;
        if(parentNode){
            var parentWidth = parseInt(parentNode.style.width);
            var parentHeight = parseInt(parentNode.style.height);
            element.style.width = parentWidth +"px";
            element.style.height = parentHeight +"px";
        }
    }

}

function getScrollbarWidth() {
    var oP = document.createElement('p'),
        styles = {
            width: '100px',
            height: '100px',
            overflowY: 'scroll'
        }, i, scrollbarWidth;
    for (i in styles) oP.style[i] = styles[i];
    document.body.appendChild(oP);
    scrollbarWidth = oP.offsetWidth - oP.clientWidth;
    oP.remove();
    return scrollbarWidth;
}

function category(obj) {
    var category = "";
    console.log("category innerText: "+obj.innerText);
    console.log("category title: "+obj.title);
    if(categories.length > 0 && obj.title != '') {
        for(var i = 0; i < categories.length; i++){
            var category = categories[i];
            console.log("categories: "+category);
            if(category == obj.title){
                break;
            }
        }
    }

    console.log("category: "+category+" is clicked");
    var titleElement = document.getElementById("blog_title_panel");
    if(titleElement){
        titleElement.innerHTML = category;
        console.log("titleElement innerText: "+titleElement.innerText);
        console.log("titleElement category: "+ category);
    }

}

function ajax(url, method, fnSucc, fnFaild){
    //1.创建对象
    var oAjax = null;
    if(window.XMLHttpRequest){
        oAjax = new XMLHttpRequest();
    }else{
        oAjax = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if(method.toLowerCase() == "POST".toLowerCase()){
        oAjax.open("POST", url, true);
    } else {
        oAjax.open('GET', url, true);   //open(方法, url, 是否异步)

    }
    //3.发送请求
    oAjax.send();

    //4.接收返回
    oAjax.onreadystatechange = function(){  //OnReadyStateChange事件
        if(oAjax.readyState == 4){  //4为完成
            if(oAjax.status == 200){    //200为成功
                fnSucc(oAjax.responseText)
            }else{
                if(fnFaild){
                    fnFaild();
                }
            }
        }
    };
}

function initCategory(){
    var navElement = document.getElementById("navigation_panel");
    var tableElement = document.createElement("table");
    tableElement.style.border = "1";
    navElement.appendChild(tableElement);
    ajax("/GetCategory", "GET",
        function(resultText){
            console.log("onResult: "+resultText);
            categories = eval(resultText);
            var childContent = "";
            for (var i = 0; i <  categories.length; i++) {
                childContent =  childContent + "<tr>";
                childContent = childContent + '<td><img src="img/navigation_16.png"></td>';
                childContent = childContent + '<td><a  href="javascript:void(0)"' +
                                ' title="'+categories[i] + '" ' +
                                ' onclick="category(this);return false;">' +
                                categories[i]+
                                '</a></td>';
                childContent =  childContent + "</tr>";
            }
            tableElement.innerHTML = childContent;
        }, 
        function(){
            console.log("onFailed: ");
            var blogBodyElement = document.getElementById("blog_body");
            if(blogBodyElement){
                blogBodyElement.innerHTML = "Failed";
            }
        });
    
}

function initViewStyle(){
    initBodyStyle();
    initBlogTitleStyle();
    initMainPanel();
}




initViewStyle();
initCategory();


window.onresize = function () {
    initViewStyle();
}