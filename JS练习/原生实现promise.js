var myNewAjax = function (url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && readyState == 4) {
                var json = JSON.parse(xhr.responseText);
                resolve(json)
            } else if (xhr.readyState == 4 && xhr.status != 200) {
                reject('error');
            }
        }
    })
}

// 0：未初始化 -- 尚未调用.open()方法；
// 1：启动 -- 已经调用.open()方法，但尚未调用.send()方法；
// 2：发送 -- 已经调用.send()方法，但尚未接收到响应；
// 3：接收 -- 已经接收到部分响应数据；
// 4：完成 -- 已经接收到全部响应数据，而且已经可以在客户端使用了；