/*
给定一个区间的集合 intervals ，其中 intervals[i] = [starti, endi] 。
返回 需要移除区间的最小数量，使剩余区间互不重叠 。
*/

// 动态规划 贪心！
// 转换为 最多又多少个不重叠的区间
var eraseOverlapIntervals = function(intervals) {
    let ans = 0;
    // 首先我们对区间进行排序（根据区间的第二个元素，即end来排序），
    // 然后选end最早结束的区间作为开始遍历的起始，也就是排序完的第一个
    intervals.sort((a,b)=>a[1] - b[1]);
    let end = -5 * Math.pow(10,4);
    for(item of intervals){
        if(item[0] >= end){
            end = item[1];
            ans+=1;
        }
    }
    return intervals.length - ans;
};

var eraseOverlapIntervals = function(intervals){
    intervals.sort((a,b)=>a[1]-b[1]);
    let right = intervals[0][1];
    let num = 1;
    for(item of intervals){
        if(item[0] >= right){
            num++;
            right = item[1];
        }
    }
    return intervals.length - num;
}