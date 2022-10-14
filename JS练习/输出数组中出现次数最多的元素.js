var nums = [3, 5, 6, 5, 9, 8, 10, 5, 7, 7, 10, 7, 7, 10, 10, 10, 10, 10];

function mostCount(nums) {
    let map = new Map();
    for (item of nums) {
        let size = map.get(item) || 0;
        map.set(item, ++size);
    }
    let res = 0;
    let tempKey = 0;
    map.forEach((value, key) => {
        if (value > res) {
            res = value;
            tempKey = key;
        }
    })
    return '次数最多的元素为:' + tempKey + ', 次数为:' + res;
}
console.log(mostCount(nums))

function mostCount2(nums) {
    let maxCount = 0;
    let tempKay = 0;
    let res = nums.reduce((pre, cur) => {
        pre[cur] ? pre[cur] += 1 : pre[cur] = 1
        if (pre[cur] > maxCount) {
            maxCount = pre[cur];
            tempKay = cur;
        }
        return pre;
    }, {})
    return '次数最多的元素为:' + tempKay + ', 次数为:' + maxCount;
}

// 输出题！！！
const foo = function (m) {
    let sum = m;
    return function (n) {
        if (n > 0) {
            sum += n;
        }
        console.log(sum);
    }
}
const f = foo(1);
f(2); // 第一处  sum = 1, n = 2,sum = sum + n = 1 + 2 = 3
foo(0)(2); // 第二处 sum = 0, n = 2, sum = 2

const obj = {
    sum: 0
}
f.call(obj, 2) // 第三处 sum = 3,n = 2 ,sum = 5 