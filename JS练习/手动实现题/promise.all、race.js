//手动实现promise.all
//Promise.all 的返回值是一个新的 Promise 实例。
//数组中每个 Promise 实例都成功时（由pendding状态转化为fulfilled状态），Promise.all 才成功。
//这些Promise实例所有的resolve结果会按照原来的顺序集合在一个数组中作为Promise.all的resolve 的结果。
//数组中只要有一个Promise实力失败，Promise.all就失败。
MyPromise.all = function (promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            throw new TypeError(`argument must be a array`)
        }
        if (promises.length === 0) {
            resolve([])
        } else {
            let result = [];
            let count = 0;
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(data => {
                    count++;
                    result[i] = data;
                    if (count === promises.length) {
                        return resolve(result)
                    }
                }, err => {
                    return reject(err);
                })
            }
        }
    })
}

//手动实现Promise.race
// Promise.race 从字面意思理解就是赛跑，以状态变化最快的那个 Promise 实例为准，
// 最快的 Promise 成功 Promise.race 就成功，最快的 Promise 失败 Promise.race 就失败。
MyPromise.race = function(promises){
    return new Promise((resolve,reject) => {
        for (let i = 0, len = args.length; i < len; i++) {
            args[i].then(resolve, reject)
        }
    })
}