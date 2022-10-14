// 插入排序最坏情况下就是 7 6 5 4 3 2 1 时间复杂度为O(n2)
// 最好情况下就是 1 2 3 4 5 6 7 时间复杂度O(n)
// 交换法的插入排序，每次都和自己之前的元素进行比较，如果比前面的小就插入其前面
function insertSort(arr){
    if(arr == null || arr.length < 2){
        return;
    }
    // 从第二个数开始往前交换
    for(let i = 1;i < arr.length;i++){
        for(let j = i - 1;j >= 0 && arr[j] > arr[j + 1];j--){
            swap(arr,j,j+1);
        }
    }
}
function swap(arr,i,j){
    arr[i] = arr[i] ^ arr[j];
    arr[j] = arr[i] ^ arr[j];
    arr[i] = arr[i] ^ arr[j];
}