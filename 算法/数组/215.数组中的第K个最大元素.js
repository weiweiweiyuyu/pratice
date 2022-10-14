var findKthLargest = function (nums, k) {
    //3、注意！！！JS中sort()排序存在“问题”  sort排序默认行为就是把数组中的所有项转化为字符串，然后进行unicode编码比较
    //所以我们在使用sort进行数字排序的时候要加上sort的回调函数我们可以这么写
    let arr = nums.sort().reverse();
    //1、首先并不需要去重，看清题目，重复的数依旧排在里面  
    //2、其次要注意去重的写法，默认返回值可以不写大括号，所以我们一定要注意，不加大括号就是默认的return
    // 加大括号的话要自己写return!!!
    var arr2 = arr.filter((item, index, self) => self.indexOf(item) === index)
    return arr2[k - 1]
};
var arr = [3, 2, 3, 1, 2, 4, 5, 5, 6, 7, 7, 8, 2, 3, 1, 1, 1, 10, 11, 5, 6, 2, 4, 7, 8, 5, 6];
arr.sort(function (a, b) {
    //升序
    return a - b;
    //降序
    //return b - a;
})
var findKthLargest = function (nums, k) {
    let arr = nums.sort(function (a, b) {
        return a - b;
    });
    arr = arr.reverse();
    return arr[k - 1]
};


//使用经典快排解决问题
function get_mid(arr, left, right) {
    let pivot = arr[left];
    while (left < right) {
        while (arr[right] >= pivot && left < right) {
            right--;
        }
        arr[left] = arr[right];
        while (arr[left] <= pivot && left < right) {
            left++;
        }
        arr[right] = arr[left];
    }
    arr[left] = pivot;
    return left;
}
//经典操作
// function quickSort1(arr,left,right){
//     if(left < right){
//         let mid = get_mid(arr,left,right);
//         quickSort(arr,left,mid-1);
//         quickSort(arr,mid+1,right);
//     }
// }
//但是我们现在要解决的问题是 寻找数组中第K个最大元素
//我们这么想，每次我们都会找到一个mid,我们可以在处理的时候对比第K个元素与mid的关系
// 如果我们找的第K个元素==mid，那我们就直接返回，如果第K个元素大于mid那我们就递归mid右边的区间即可
// 如果我们找的第K个元素小于mid那我们就递归左边的区间即可，同时我们要明确要比较的两个对象
// 因为快排是从小到大排序，所以我们mid的下标需要和arr.length - k比较

function get_mid(arr,left,right){
    //确定基准数
    let pivot = arr[left];
    while(left < right){
        while(arr[right] >= pivot && left < right){
            right--;
        }
        arr[left] = arr[right];
        while(arr[left] <= pivot && left < right){
            left++;
        }
        arr[right] = arr[left];
    }
    arr[left] = pivot;
    return left;
}
function quickSort2(arr,left,right,k){
    // 注意等号！！！！！！！
    if(left <= right){
        let mid = get_mid(arr,left,right);
        if(mid == arr.length - k){
            return arr[mid];
        }else if(mid > arr.length - k){
            return quickSort2(arr,left,mid - 1,k)
        }else{
            return quickSort2(arr,mid+1,right,k);
        }
    }
}

var findKthLargest = function(nums, k) {
    if(nums.length == 1) {
        return nums[0];
    }else{
        return quickSort2(nums,0,nums.length - 1,k)
    }
};


////////////////////////////分界线
function partition(nums, start, end) {
    const pivot = nums[start];
    while (start < end) {
        while (start < end && nums[end] >= povit) {
            end--;
        }
        nums[start] = nums[end];
        while (start < end && nums[start] < povit) {
            start++;
        }
        nums[end] = nums[start];
    }
    nums[start] = pivot;
    return start;
}
var findKthLargest = function (nums, k) {
    const len = nums.length;
    const targetIndex = len - k;
    let left = 0,
        right = len - 1;

    while (left < right) {
        const index = partition(nums, left, right);
        if (index === targetIndex) {
            return nums[index];
        } else if (index < targetIndex) {
            left = index + 1;
        } else {
            right = index - 1;
        }
    }
    return nums[left];
};

let arr = [3, 2, 1, 5, 6, 4];
findKthLargest(arr, 2)





//////////练习
function quick_mid(arr,left,right){
    let pivot = arr[left];
    while(left < right){
        //注意判断的时候的等号
        while(right >= pivot && left < right){
            right--;
        }
        arr[left] = arr[right];
        //注意判断的时候的等号
        while(left <= pivot && left < right){
            left++;
        }
        arr[right] = arr[left];
    }
    arr[left] = pivot;
    return left;
}
function quickSort3(arr,left,right){
    if(left < right){
        let mid = quickSort3(arr,left,right);
        quickSort3(arr,left,mid-1);
        quickSort3(arr,mid+1,right)
    }
}