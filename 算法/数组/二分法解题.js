// 二分法的详解与扩展
// 1）在一个有序数组中，找某个数是否存在
// 2）在一个有序数组中，找 >= 某个数最左侧的位置

// O(n)解法，遍历一遍
function selectNum(arr,target){
    for(let i = 0;i < arr.length;i++){
        if(arr[i] == target) return i;
    }
    return -1;
}

// O(logN) 二分法
function selectNum2(arr,target){
    let left = 0,right = nums.length - 1;
    while(left <= right){
        let mid = left + Math.floor((right -left)/2)
        if(nums[mid] == target){
            return mid;
        }else if(nums[mid] < target){
            left = mid + 1;
        }else if(nums[mid] > target){
            right = mid - 1;
        }
    }
    return -1;
}