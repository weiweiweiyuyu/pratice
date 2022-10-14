//防抖
let timer;
function settle(fn,time){
    if(timer){
        clearTimeout(timer);
    }
    timer = setTimeout(()=>{
        console.log("...")
        fn.call(this.args)
    },time)
}

function save(time){
    if(timer) return;
    timer = setTimeout(()=>{
        timer = null;
        console.log("...")
    },time)
}

function setTime(fn,time){
    let t = null;
    return function(){
        fn();
        if(t != null){
            clearTimeout(t)
        }
        timer = setTimeout(()=>{
            console.log("...")
            fn.call(this.args)
        },time)
    }
}