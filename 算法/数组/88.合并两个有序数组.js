/*
给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2,
另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
请你 合并 nums2 到 nums1 中，
使合并后的数组同样按 非递减顺序 排列。
*/
// 两倒两等
// 两倒：倒过来遍历，指针倒过来走
// 两等：判断条件不要忽略了相等的情况
var merge = function(nums1, m, nums2, n) {
    let p = m - 1;
    let q = n - 1;
    for(let i = m + n - 1;i >= 0;i--){
        if( q < 0 || (p >= 0 && nums1[p] >= nums2[q])){
            nums1[i] = nums1[p];
            p--;
        }else if(p < 0 || (q >= 0 && nums2[q] >= nums1[p])){
            nums1[i] = nums2[q];
            q--;
        }
    }
};