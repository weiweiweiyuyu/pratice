// 数组相关的手动实现

// 1、forEach
export function forEach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}

// 2、map
function map(arr, callback) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        res.push(callback(arr[i], i));
    }
    return res;
}
//原型上直接加
Array.prototype.myMap = function (callback) {
    let arr = this;
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        res.push(callback(arr[i], i, arr))
    }
    return res;
}
//测试
const arr = [2, 3, 4, 5];
const newArr = arr.myMap((item, index, arr) => {
    console.log("数组每项:", item);
    console.log("数组索引:", index);
    console.log("数组是:", arr)
    return item * 10;
});
console.log(newArr); // [20, 30, 40, 50]

// 3、reduce
Array.prototype.myReduce = function (callback, initValue) {
    // 拿到初始值以及当前数组this
    let res = initValue;
    for (let i = 0; i < this.length; i++) {
        //实现上次回调函数的返回值放在一个暂存器中当作参数传给下次回调函数
        res = callback(res, this[i])
    }
    return res;
}
const arr2 = [1, 2, 3, 4, 5];
const result2 = arr2.myReduce((pre, cur) => {
    return pre + cur;
},0)
console.log(result2)


//4、filter
Array.prototype.myFilter = function(callback){
    const result = [];
    for(let i = 0;i < this.length;i++){
        const res = callback(this[i],i)
        if(res){
            //注意添加的是筛选完以后的数组元素
            result.push(this[i]) 
        }
    }
    return result;
}
const arr3 = [1, 2, 3, 4, 5];
const result3 = arr3.myFilter((item,index)=>{
    return item > 3;
})
console.log(result3,"result3")
console.log(arr3)

//深拷贝实现
const _completeDeepClone = (target,weakmap = new WeakMap()) => {
	if(typeof target !== 'object') return target;
	if(target === null) return target;
	if(target instanceof Date) return new Date(target);
	if(target instanceof RegExp) return new RegExp(target);
	if(typeof target === 'symbol') return new Symbol(target);
	//解决循环引用
	if(weakmap.get(target)) return weakmap.get(target);
	let cloneObj = new target.constructor();
	weakmap.set(target,cloneObj);
	for(let key in target){
		if(target.hasOwnProperty(key)){
			//实现一个递归拷贝
			cloneObj[key] = _completeDeepClone(target[key],map)
		}
	}
	return cloneObj;
}