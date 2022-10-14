//apply 接收数组
//1、apply方法接收两个参数，一个是this绑定的对象，一个是参数数组
//2、改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次
Function.prototype.Apply = function(context = window,args){
    //1、二判断
    if(typeof this !== "function"){
        console.log("type error")
    }
    if(this === Function.prototype){
        return undefined;
    }
    //2、context赋值
    context = context || window;
    //3、将调用函数作为对象调用函数的结果          
    context.fn = this;
    //4、调用函数求出结果
    let result;
    if(Array.isArray(args)){
        result = context.fn(...args)
    }else{
        result = context.fn();
    }
    //5、删除属性
    delete context.fn;
    //6、返回结果
    return result;
}


//call 接受参数列表
//1、call方法接收两个参数，第一个是this绑定的对象，后面的参数是传入函数的参数
//2、改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次
Function.prototype.myCall = function(context = window,...args){
    //1、判断调用对象
    if(typeof this !== "function"){
        console.log("type error")
    }
    //防止Function.prototype.myCall() 直接调用
    if(this === Function.prototype){
        return undefined;
    }
    //2、判断context是否传入，如果 未传入则设置为window
    context = context || window;
    //3、将调用函数设为对象的方法
    context.fn = this;
    //4、调用函数
    const result = context.fn(...args);
    //5、将属性删除
    delete context.fn;
    //6、返回结果
    return result;
}

//bind 接受参数列表
// 1、bind方法和call很相似，第一个参数是this的指向，后面传入的也是一个参数列表
//(但是这个参数列表可以分多次传入)
// 2、改变this指向后不会立即执行，而是返回一个永久改变this指向的函数
Function.prototype.myBind = function(context = window,...args){
    //1、判断调用对象
    if(typeof this !== "function"){
        console.log("type error")
    }
    //防止Function.prototype.myCall() 直接调用
    if(this === Function.prototype){
        return undefined;
    }
    //2、获得this
    const _this = this;
    return function Fn(...args2){
        //判断是否用于构造函数
        if(this instanceof Fn){
            return new _this(...args,...args2)
        }
        return _this.apply(context,args.concat(args2))
    }
}



///////////////////练习
Function.prototype.myApply = function(context = window,args){
    if(typeof this != "function"){
        console.log("type error")
    }
    if(this == Function.prototype){
        return undefined;
    }
    context = context || window;
    context.fn = this;
    let result;
    if(Array.isArray(args)){
        result = context.fn(...args)
    }else{
        result = context.fn()
    }
    delete context.fn;
    return result;
}

Function.prototype.myCall = function(context = window,...args){
    if(typeof this != "function"){

    }
    if(this == Function.prototype){
        return undefined
    }
    context = context || window;
    context.fn = this;
    const result = context.fn(...args)
    delete context.fn;
    return result;
}
