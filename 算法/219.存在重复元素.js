/*
给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j
满足 nums[i] == nums[j] 且 abs(i - j) <= k
如果存在，返回 true ;否则，返回 false
*/

// 为什么是滑动窗口解题？
// 由题意我们可以得出，i - j <= k,
// 推断出来题意：是否存在长度不超过k+1的窗口，窗口内有相同元素。

// 方法一：直接存到map里面然后进行重复元素判断
var containsNearbyDuplicate = function(nums, k) {
    //滑动窗口的长度 小于等于k+1
    const map = new Map();
    for(let i = 0;i < nums.length;i++){
        if(map.has(nums[i]) && i - map.get(nums[i]) <= k) return true;
        map.set(nums[i],i)
    }
    return false;
};

//方法二：使用滑动窗口
var containsNearbyDuplicate = function(nums, k) {
    const map = new Map();
    for(let i = 0;i < nums.length;i++){
        //如果超过了滑动窗口的大小限制，那么滑动窗口就要缩小
        if(i > k){
            map.delete(nums[i-k-1])
        }
        if(map.has(nums[i])) return true;
        map.set(nums[i],i)
    }
    return false;
}

// 方法三：控制滑动窗口的大小
var containsNearbyDuplicate = function(nums, k) {
    const set = new Set();
    for(let i = 0;i < nums.length;i++){
        if(set.has(nums[i])){
            return true;
        }
        set.add(nums[i])
        if(set.size > k){
            set.delete(nums[i - k]);
        }
    }
    return false;
}