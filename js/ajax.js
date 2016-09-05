/**
 * Created by HaiMing.Guo on 2016/9/5.
 */
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