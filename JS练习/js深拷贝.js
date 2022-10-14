const _completeDeepClone = (target, weakmap = new WeakMap()) => {
    // 补全代码
    if (typeof target !== 'object') return target;
    if (target === null) return target;
    if (target instanceof Date) return new Date(target);
    if (target instanceof RegExp) return new RegExp(target);
    if (typeof target === 'symbol') return new Symbol(target);
    //解决循环引用
    if (weakmap.get(target)) return weakmap.get(target);
    let cloneObj = new target.constructor();
    weakmap.set(target, cloneObj);
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            //实现一个递归拷贝
            cloneObj[key] = _completeDeepClone(target[key], map)
        }
    }
    return cloneObj;
}
const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
};
console.log(_completeDeepClone(target))
target.target = target; //会导致一个循环引用,然后递归进入死循环,导致栈内存溢出。
//可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，
//要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，