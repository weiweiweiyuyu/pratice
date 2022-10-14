// const {
//     resolve
// } = require("path")

//一、使用Promise实现[每隔1秒]输出1，2，3
const arr = [1, 2, 3]
arr.reduce((prev, cur) => {
    return prev.then(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(console.log(cur))
            }, 1000)
        })
    })
}, Promise.resolve())
//上面的效果和下面的代码是一样的，也就是说上面的代码可以转化为下面的写法
Promise.resolve()
    .then(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(console.log(1))
            }, 1000)
        })
    })
    .then(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(console.log(2))
            }, 1000)
        })
    })
    .then(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(console.log(3))
            }, 1000)
        })
    })

// 二、使用Promise实现红绿灯交替重复亮
//红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；
//如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：
function red() {
    console.log('red');
}

function green() {
    console.log('green');
}

function yellow() {
    console.log('yellow');
}
//封装一个调用灯的函数
const light = function (timer, cb) {
    return new Promise(resolve => {
        setTimeout(() => {
            cb();
            resolve();
        }, timer)
    })
}
//实现红灯3秒，黄灯2秒，绿灯1秒
const step = function () {
    Promise.resolve().then(() => {
            return light(3000, red)
        })
        .then(() => {
            return light(2000, yellow)
        })
        .then(() => {
            return light(1000, green)
        })
        .then(() => {
            //循环调用自身，达到循环的效果
            return step()
        })
}
step()


//控制并发请求的数量
function limitLoad(urls, handler, limit) {
    let sequence = [].concat(urls); // 复制urls
    // 这一步是为了初始化 promises 这个"容器"
    let promises = sequence.splice(0, limit).map((url, index) => {
        return handler(url).then(() => {
            // 返回下标是为了知道数组中是哪一项最先完成
            return index;
        });
    });
    // 注意这里要将整个变量过程返回，这样得到的就是一个Promise，可以在外面链式调用
    return sequence
        .reduce((pCollect, url) => {
            return pCollect
                .then(() => {
                    return Promise.race(promises); // 返回已经完成的下标
                })
                .then(fastestIndex => { // 获取到已经完成的下标
                    // 将"容器"内已经完成的那一项替换
                    promises[fastestIndex] = handler(url).then(
                        () => {
                            return fastestIndex; // 要继续将这个下标返回，以便下一次变量
                        }
                    );
                })
                .catch(err => {
                    console.error(err);
                });
        }, Promise.resolve()) // 初始化传入
        .then(() => { // 最后三个用.all来调用
            return Promise.all(promises);
        });
}
limitLoad(urls, loadImg, 3)
    .then(res => {
        console.log("图片全部加载完毕");
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });