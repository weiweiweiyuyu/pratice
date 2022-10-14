/*
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
注意：答案中不可以包含重复的三元组。
*/
//这道题难攻破的点是 答案中不可以包含重复的三元组！
function add(nums){
    // let positive = [];
    // let negative = [];
    // let zero = [];
    // for(let i = 0;i < nums.length;i++){
    //     if(nums[i] > 0){
    //         positive.push(nums[i])
    //     }else if(nums[i] < 0){
    //         negative.push(nums[i])
    //     }else{
    //         zero.push(nums[i])
    //     }
    // }
}
//时间复杂度为 O(n2)
//方法一：
var threeSum = function(nums) {
    let len = nums.length;
    let res = [];
    //考虑边界情况
    if(nums == null || len < 3) return res;
    nums = nums.sort(function(a,b){
        return a - b;
    })
    //枚举a 
    for(let first = 0;first < len;first++){
        //需要和上一次枚举的数不同
        if(first > 0 && nums[first] == nums[first - 1]){
            continue;
        }
        //c对应的指针初始指向数组的最右端
        let third = n - 1; 
        //a+b+c=0 b+c = -a
        let target = -nums[first];
        for(let second = first+1;second < len;second++){
            //需要和上一次枚举的数不相同
            if(second > first + 1 && nums[second] == nums[second-1]){
                continue;
            }
            //需要保证b的指针在c的左侧
            while(second < third && nums[second] + nums[third] > target){
                third--;
            }
            //如果指针重合，随着b后续的增加就不会有满足 a+b+c=0 并且b<c的了，可以退出循环
            if(second == third){
                break;
            }
            if(nums[second]+nums[third] == target){
                res.push([nums[first],nums[second],nums[third]]);
            }
        }
    }
    return res;
};

//方法二：时间复杂度O(n2) 排序+双指针
var threeSum = function(nums) {
    let ans = [];
    const len = nums.length;
    if(nums == null || len < 3) return ans;
    // 排序
    nums.sort((a, b) => a - b);
    //1、首先固定一个数nums[i],再使用左右指针指向nums[i]后面的两端，数字分别为L = i + 1,R = len - 1
    for (let i = 0; i < len ; i++) {
        //2、如果当前数字大于0，因为a<=b<=c,a大于0，则三数之和一定大于0，所以结束循环
        //好，这里我们复习一个知识点，在for循环中，break用于跳出所有循环，继续执行循环后面的语句，而continue则是终止本次循环，跳过当前循环中剩下的语句。
        if(nums[i] > 0) break; 
        if(i > 0 && nums[i] == nums[i-1]) continue; // 去重
        let L = i+1;
        let R = len-1;
        while(L < R){
            //3、计算三数之和
            const sum = nums[i] + nums[L] + nums[R];
            if(sum == 0){
                //4、等于0，结束循环
                ans.push([nums[i],nums[L],nums[R]]);
                //5、接着当sum=0时，nums[L]==nums[L+1]或者nums[R]==nums[R-1],则会导致结果重复，所以跳过
                while (L<R && nums[L] == nums[L+1]) L++; // 去重
                while (L<R && nums[R] == nums[R-1]) R--; // 去重
                //6、继续移动指针，继续计算a固定为nums[i]的时候b,c变化产生的和
                L++;
                R--;
            }
            //7、处理sum不等于的情况
            else if (sum < 0) L++;
            else if (sum > 0) R--;
        }
    }        
    return ans;
};
