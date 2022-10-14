//闭包实现依次打印
// var 不存在块级作用域，当进行for循环时，将i传递给setTimeout,
// 但是又因为setTimeout中的回调函数是宏任务，会放到任务队列中，等待主线程的任务都完成才执行，所以打印的都是5
// 我们使用闭包，保存每一次循环的i
for(var i=0;i<5;i++){
    (function(i){
        setTimeout(function(){
        console.log(i)
    },1000*i)
    })(i)
}

// 或者使用let使其存在块级作用域


var Solution = function (nums) {
    this.nums = nums;
};
Solution.prototype.reset = function () {
    return this.nums;
};
Solution.prototype.shuffle = function () {
    let arr = [...(this.nums)];
    let len = arr.length;
    for (let i = 0; i < len; i++) { // 洗牌算法 ，保证了每个数在每个位置的概率都是相同的
        rand_num = Math.floor(Math.random() * (len - i) + i);

        [arr[i], arr[rand_num]] = [arr[rand_num], arr[i]];
    }
    return arr;
};
var nums = [2,3,4,6,9]
var obj = new Solution(nums)
obj.shuffle();
console.log(obj.shuffle())