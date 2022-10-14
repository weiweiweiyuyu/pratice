// 1、JS千分分割
//  考虑小数点 32431.123 ——>32,431.123
function formatNumber(num) {
    let str = String(num);
    // 判断如果不是小数 ！！！！！！
    if (str.indexOf(".")) {
        // (1)首先我们根据小数点进行分割
        let source = str.split("."); //string的split方法！！
        // source ——> ["32431","123"]
        // (2)取数组的第一个元素，也就是数字的“整数位”进行标记千分位分割
        source[0] = addPoint(source[0]);
        return source.join(".")
    } else {
        return addPoint(str);
    }
}

function addPoint(str) {
    // 我们需要倒过来，因为千分位是从右往左进行标注的
    let arr = str.split("").reverse();
    // (3)遍历加","号
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (i % 3 === 0 && i != 0) {
            res.push(",")
        }
        res.push(arr[i])
    }
    return res.reverse().join("");
}
formatNumber(32419)