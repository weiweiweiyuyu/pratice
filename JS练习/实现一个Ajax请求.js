// 首先我们先来谈谈对AJAX的理解
// AJAX是Asynchronous JavaScript XML的缩写，指的是听过js的异步通信，
// 从服务器获取XML文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页

// 一、创建AJAX请求的步骤
const SERVER_URL = "/server";
// 1、创建一个XMLHttpRequest对象
let xhr = new XMLHttpRequest();
// 2、在这个对象上使用open方法创建一个HTTP请求 url代表请求的地址
xhr.open("GET",url,true);
// 3、添加一些信息和监听函数
xhr.responseType = "json";
xhr.setRequestHeader("Accept","application/json");
// 4、设置状态监听函数
xhr.onreadystatechange = function(){
    /*
    当对象的 readyState 变为 4 的时候，代表服务器返回的数据接收完成，
    这个时候可以通过判断请求的状态，如果状态是 2xx 或者 304 的话则代表返回正常。
    这个时候就可以通过 response 中的数据来对页面进行更新了。
    */
    if(this.readyState !== 4) return;
    // 当请求成功时
    if(this.status === 200){
        handle(this.response);
    }else{
        console.error(this.statusText);
    }
}
// 5、设置请求失败的监听函数
xhr.onerror = function(){
    console.error(this.statusText);
}
// 6、最后发送http请求
xhr.send(null);

// 二、使用Promise封装AJAX
function getJSON(url){
    // 创建一个promise对象
    let promise = new Promise(function(resolve,reject){
        let xhr = new XMLHttpRequest();
        xhr.open("GET",url,true);
        xhr.setRequestHeader("Accept","application/json");
        xhr.responseType = "json";
        xhr.onreadystatechange = function(){
            if(this.readyState !== 4) return;
            if(this.statusText === 200){
                resolve(this.response);
            }else{
                reject(new Error(this.statusText));
            }
        }
        xhr.onerror = function(){
            reject(new Error(this.statusText))
        }
        xhr.send(null);
    })
    return promise;
} 