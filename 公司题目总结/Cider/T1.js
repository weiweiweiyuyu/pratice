// 输出题
//1、
const a=new Array()
a===[]  //false

//2、
var A = 2;
const B = {
 f1: function() {
  return this.A
 },
 f2: () => {
  return this.A  //箭头函数看定义地方的作用域
 },
 A: 10
}
console.log(B.f1(), B.f2());  // 10 2
const f1 = B.f1,f2 = B.f2; 
console.log(f1(), f2()); //2  2

// 算法编码考查
//1、千分位划分
function toThousands(str){
    //字符串转为字符数组 split() 
    let arr = str.split("").reverse();
    let res = [];
    for(let i = 0;i < arr.length;i++){
        if(i % 3 == 0 && i != 0){
            res.push(",")
        }
        res.push(arr[i])
    }
    return res.reverse().join("")
}
function toThousands(str,num){
    if(num == 0) return;
    let arr = [];
    //字符串转为字符数组
    arr = str.split("").reverse();
    let res = [];
    for(let i = 0;i < arr.length;i++){
        if(i % num == 0 && i != 0){
            res.push(",")
        }
        res.push(arr[i])
    }
    return res.reverse().join("")
}``

//to_string = toString
//2、下划线命名改为小驼峰！
function toSmall(str){
    let arr = str.split("");
    for(let i = 0;i < arr.length;i++){
        if(arr[i] === "_"){
            arr.splice(i,2,arr[i+1].toUpperCase())
        }
    }
    return arr.join("")
}