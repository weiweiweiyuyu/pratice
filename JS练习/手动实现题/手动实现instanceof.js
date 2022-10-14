function myInstance(left,right){
    if(typeof left !== 'object' || left === null) return false;
    //getPrototypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(left);
    while(true){
        if(proto === null) return false;
        if(proto == right.prototype) return true;
        proto = Object.getPrototypeOf(proto)
    }
}