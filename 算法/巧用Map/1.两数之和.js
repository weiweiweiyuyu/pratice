// 给定一个整数数组 nums 和一个整数目标值target,
// 请你在该数组中找出 和为目标值 target 的那两个整数，并返回它们的数组下标。
let nums = [2,4,3,6]
let map = new Map();
function twoSum(nums,target){
    //1、暴力破解  时间复杂度O(n2) 两层遍历
    // for(let i = 0;i < nums.length;i++){
    //     for(let j = i+1;j < nums.length;j++){
    //         if(nums[i]+nums[j] == target){
    //             return [i,j]
    //         }
    //     }
    // }
    
    //巧用map 时间复杂度O(n)
    for(let i = 0;i < nums.length;i++){
        // target减去目前的数值得到一个res
        let res = target - nums[i];
        // 判断set里面是否有对应的值，如果有就return如果没有就添加
        if(map.has(res)){
            return [map.get(res),i]
        }
        map.set(nums[i],i);
    }
}