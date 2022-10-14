// 1、
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    new Promise(function (resolve) {
        console.log('promise1');
        resolve();
    }).then(function () {
        console.log('promise2')
    })
}
console.log('script start');
setTimeout(function () {
    console.log('setTimeout')
}, 0)
async1();
new Promise(function (resolve) {
    console.log('promise3');
    resolve();
}).then(function () {
    console.log('promise4')
})
console.log('script end')

// 2、
async function async1() {
    console.log('async1 start')
    await async2()
    await func()
    console.log('async1 end')
    console.log('123')
}
async function func() {
    console.log('234')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('setTimeout')
}, 0)
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')

// 3、
async function async1(){
    await async2()
    console.log(1);
}
async function async2(){
    console.log(2);
    return Promise.resolve().then(()=>{
        console.log(3);
    }).then(()=>{
        console.log(8);
    })
}
async1()
setTimeout(function(){
    console.log(4);
}, 0);
new Promise(resolve=>{
    resolve();
}).then(function(){
    console.log(5);
}).then(function(){
    console.log(6);
}).then(function(){
    console.log(7)
})
// 2 3 5 8 6 7 1