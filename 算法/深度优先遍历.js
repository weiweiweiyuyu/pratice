//1、暴力解法
let spu = "AB1234567";
let specList = [
    ["red","yellow"],
    ["XL","S"],
    ["a1","a2"],
    ["b1","b2"]
]
function creatSKU(str,arr){
    let newArr = [];
    for(let i = 0; i < arr[0].length;i++){
        let str2 = str + "-" + arr[0][i];
        for(let j = 0;j < arr[1].length;j++){
            let str3 = str2 + "-" + arr[1][j];
            for(let t = 0;t < arr[2].length;t++){
                let str4 = str3 + "-" + arr[2][t]
                for(let s = 0;s < arr[3].length;s++){
                    let str5 = str4 + "-" + arr[3][s]
                    newArr.push(str5)
                    console.log(str+'-'+arr[0][i]+'-'+arr[1][j]+'-'+arr[2][t]+'-'+arr[3][s])
                }
            }
        }
    }
    return newArr;
}
console.log(creatSKU(spu,specList))

// 2、回溯
let result = [];
function handle(index,arr,str){
    for(let cur of arr[index]){
        let newStr = str + "-" + cur;
        if(index == arr.length - 1){
            result.push(newStr);
        }else{
            handle(index+1,arr,newStr);
        }
    }
}
let spu1 = "AB1234567";
let specList1 = [
    ["red","yellow"],
    ["XL","S"],
    ["a1","a2"],
    ["b1","b2"]
]
handle(0,specList1,spu1)
console.log(result)
