//1、分割数组
function chunkArrByNum(arr,num){
    let res = [];
    for(let i = 0;i < arr.length;i+=num){
        res.push(arr.slice(i,i+num));
    }
    return res;
}


//2、js实现定时器
function customTimer(interval,callback) {
    // 控制器，控制定时器是否继续执行
    var timer = {
      flag: true,
    };
  
    // 设置递归函数，模拟定时器执行。
    function intervalFun() {
      if (timer.flag) {
        callback();
        setTimeout(intervalFun, interval);
      }
    }
    // 启动定时器
    setTimeout(intervalFun, interval);
    // 返回控制器
    return timer;
}
customTimer(1000,() => {
    var date = new Date();
    console.log(date.getSeconds()) //打印当前时间的秒数
})




let input = document.querySelector('input');
let data = {
    msg:'dataMsg'
}
input.addEventListener("input",()=>{
    data.msg = input.value;
})
input.value = data.msg;
let temp = data.msg;
Object.defineProperty(data,'msg',{
    get(){
        return temp;
    },
    set(value){
        input.value = value;
        return (temp = value)
    }
})