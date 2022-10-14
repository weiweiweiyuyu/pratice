// function sleep(delay,callback){
//     setTimeout(callback,delay)
// }
// sleep(1000,()=>{

// })

function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        continue;
    }
}

function test() {
    console.log(111)
    sleep(2000)
    console.log(222)
}
test()

const sleep = time => {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}
async function test2() {
    await sleep(2000)
    console.log(2222)
}

//找出一个对象里所有包含url地址的属性值，如果其协议是http则替换为https。 
function change(obj) {
    let arr = Object.keys(obj);
    for (item of arr) {
        if (Array.isArray(item)) {
            change(item)
        } else {
            if (obj[item].includes("http") || obj[item].includes("https")) {
                if (obj[item].includes('http')) {
                    obj.splice(0, 3, https)
                }
            }
        }
    }
}
//实现2万个不同的4位验证码
function randomNum() {
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var res = "";
    for (let j = 0; j < 20000; j++) {

    }
    for (let i = 0; i < 4; i++) {
        var n = parseInt(Math.random() * str.length);
        res += str[n]
    }
}

function save(fn, delay) {
    let flag = true;
    return function () {
        if (flag) {
            setTimeout(() => {
                fn.call(this, ...args)
                flag = true;
            }, delay)
        }
        flag = false;
    }
}

function fun(a, c) {
    // 函数提升优先级比变量提升要高 函数a() b() c()均进行了函数提升
    // 函数声明的提升，
    console.log(a)  // function a() {}
    var a = 123 
    console.log(a)  // 123
    console.log(c)  // function c() {}

    function a() {}
    if (false) {
        var d = 678
    }
    console.log(d) //undefined  if(false) 不会进入条件判断，所以d并没有被赋值，但是函数内的var都会对变量进行提升，所以d为undefined
    console.log(b) //function b() {}

    function b() {}
    console.log(b) //function b() {}

    function c() {} 
    console.log(c) //function c() {} 
}

fun(1, 2)
//当fun函数调用时，创建函数执行上下文，然后根据实参填充arguments对象
//然后根据函数内的函数声明将函数a() b() c()进行了函数提升，由于前面定义的形参名和函数名重名了，所以后提升的函数名会将
// 形参名a，c指向的arguments直接覆盖掉

function fun(a, c) {
    var a;
    a = 1;
    // 函数提升优先级比变量提升要高 函数a() b() c()均进行了函数提升
    // 函数声明的提升，
    console.log(a)  // function a() {}
    var a = 123 
    console.log(a)  // 123
    console.log(c)  // function c() {}

    // function a() {}
    // if (false) {
    //     var d = 678
    // }
    // console.log(d) //undefined  if(false) 不会进入条件判断，所以d并没有被赋值，但是函数内的var都会对变量进行提升，所以d为undefined
    // console.log(b) //function b() {}

    // function b() {}
    // console.log(b) //function b() {}

    // function c() {} 
    // console.log(c) //function c() {} 
}

//快排  找基准，比大小
function get_mid(arr,left,right){
    let pivot = arr[left];
    while(left < right){
        //从右边开始比较
        while(arr[right] >= pivot && left < right){
            right--;
        }
        arr[left] = arr[right];
        while(arr[left] <= pivot && left < right){
            left++;
        }
        arr[right] = arr[left]
    }
    arr[left] = pivot;
    return left;
}
function quickSort(arr,left,right){
    if(left < right){
        let mid = get_mid(arr,left,right);
        quickSort(arr,left,mid-1);
        quickSort(arr,mid+1,right);
    }
}

(function () {
    console.log('10' == 10);  //true
    console.log(['10'] == 10); // true ['1', '0'].toString()为"10" 字符串"10"转换为number为10
    console.log(['1', '0'] == 10);//false
     //['1', '0'].valueOf()的值不是基础类型，所以我们使用['1', '0'].toString()的值 
     //['1', '0'].toString()为"1,0" 字符串"1,0"转换为number为NaN,所以NaN == 10为false。

    console.log(null == 0); // false
    console.log('null' == 0);   //  false  //字符串'null'转化为number为NaN, NaN == 1 为false
    console.log(['null'] == 0); // false  
    // ['null'].valueOf()的值不是基础类型，所以我们使用['null'].toString()的值 
    // 然后变成"null",字符串"null"再转化为number为NaN，所以NaN == 1 为false。

    console.log(true == 1);  //true   true布尔类型转化为1  1==1 为true
    console.log('true' == 1); // false 字符串'true'转化为number为NaN, NaN == 1 为false
    console.log(['true'] == 1); //false 
    // ['true'].valueOf()的值不是基础类型，所以我们使用['true'].toString()的值 
    // 然后变成"true",字符串"true"再转化为number为NaN，所以NaN == 1 为false。

    //== 强制类型转换
    //判断其中一方是否为object 且另一方为 string、number、或者symbol，
    //是的话就会把 object 转为原始类型再进行判断,Object类型转化为原始类型之前会先转为基础类型
    // 然后再转换为number类型，这个过程叫ToPrimitive
    // ToPrimitive过程先回检查对象是否存在valueOf方法，如果存在并且valueOf返回基本类型的值，则使用该值进行强制类型转换，
    // 如果没有，则使用toString方法返回的值进行强制类型转换。

    console.log([] == ![]) //true
    //![]先对[]进行强制boolean转换，等价于=> [] == false
    //=> [] == 0  [].toString() 后为"" 空字符串
    //=> "" == 0
    //=>  0 == 0
    //所以为true

})()
